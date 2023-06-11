# Imports
from pytube import YouTube
import clip
import torch
from pytube import YouTube
import pvleopard
import os
import shutil
from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.corpus import stopwords
import numpy as np
import urllib
import moviepy.editor as mp

from pydub import AudioSegment
from pydub.utils import make_chunks
from sentence_transformers import SentenceTransformer
from numpy.linalg import norm
import video_processing as vp
import clip
##Preload Model and Preprocess
device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

#51 seconds
# Prediction
def search_video(search_query, link, type="yt", display_results_count=3):
    #Old Code which required downloading the video
    # video_link=video_download(link,type)
    # fps,video_frames=video_frames_f(video_link)

    #Extract Frames without downloading
    fps, video_frames = vp.video_preprocess(link, type)
    #Adds NLP encoding features to the frames
    video_features = vp.frame_classifier(video_frames, device, model, preprocess)
    #Adds NLP encoding to the search query
    with torch.no_grad():
        text_features = model.encode_text(clip.tokenize(search_query).to(device))
        text_features /= text_features.norm(dim=-1, keepdim=True)
    #Finds similarity between the search query and the frames
    similarities = 100.0 * video_features @ text_features.T
    values, best_photo_idx = similarities.topk(display_results_count, dim=0)
    # Display the top 3 frames
    time_stamps = []
    for frame_id in best_photo_idx:
        seconds = round(frame_id.cpu().numpy()[0] * vp.N / fps)
        time_stamps.append(seconds)
    return time_stamps


# Audio Download Function
def videoForAudio_download(link, type):
    print("Video Downloading")
    if type == "yt":
        yt = YouTube(link)
        video = yt.streams.filter(only_audio=True).first()
        out_file = video.download(output_path=".")
        # save the file
        base, ext = os.path.splitext(out_file)
        new_file = base + ".mp3"
        os.rename(out_file, new_file)
        return new_file
    elif type == "static":
        urllib.request.urlretrieve(link, str(link.split("token=")[-1]) + ".mp4")
        clip = mp.VideoFileClip((link.split("token=")[-1]) + ".mp4")
        clip.audio.write_audiofile(r"converted.wav")
        return "converted.wav"


# Audio Hot Words


def transcript(file):
    leopard = pvleopard.create(
        access_key="clzWvIxwJZXvEIc4rhS9oBA3yoJ8GzcTqZfvn6KuqL/M7FPcB2HJWQ=="
    )
    file = os.path.abspath(file)
    tsc, words = leopard.process_file(file)
    return tsc


def hot_words(link, type):
    file = videoForAudio_download(link, type)
    # file=os.path.abspath("converted.wav")
    print("Transcribing")
    vectorizer = TfidfVectorizer(max_features=10, stop_words=stopwords.words("english"))
    corpus = [transcript(file)]
    X = vectorizer.fit_transform(corpus).todense()
    X1 = np.array(X).flatten()
    X2 = vectorizer.get_feature_names_out().flatten()
    arr = np.array([X1, X2]).T.tolist()
    arr = sorted(arr, key=lambda x: x[0], reverse=True)
    return file, [x for x in arr[:10]]


def chunks(file):
    try:
        os.mkdir("chunks")
    except:
        shutil.rmtree("chunks")
        os.mkdir("chunks")
    myaudio = AudioSegment.from_file(file)
    chunk_length_ms = 100000  # pydub calculates in millisec
    chunks = make_chunks(myaudio, chunk_length_ms)  # Make chunks of 100 sec
    # Export all of the individual chunks as wav files
    chunks_list = []
    for i, chunk in enumerate(chunks):
        chunk_name = "./chunks/{0}chunk.wav".format(i)
        print("exporting", chunk_name)
        chunk.export(chunk_name, format="wav")
        chunks_list.append(chunk_name)
    return chunks_list


def query(file, query):
    sentences = []
    chunk_list = chunks(file)
    for chunk in chunk_list:
        sentences.append(transcript(chunk))

    model = SentenceTransformer("all-MiniLM-L6-v2")
    sentence_embeddings = model.encode(sentences)
    sentence_embeddings.shape
    query = [query]

    query_embedding = model.encode(query).reshape(1, -1)
    similarities = []
    for i in range(len(sentences)):
        cosine = np.dot(sentence_embeddings[i], query_embedding[0]) / (
            norm(sentence_embeddings[i]) * norm(query_embedding[0])
        )
        similarities.append(cosine)
    return [int((x) * 100) for x in np.argsort(similarities)[-1:-4:-1]]
