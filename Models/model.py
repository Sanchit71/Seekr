#Imports
from pytube import YouTube
import cv2
from PIL import Image
import clip
import torch
import math
from pytube import YouTube
import cv2
import yt_dlp as youtube_dl
import pvleopard
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.corpus import stopwords 
import numpy as np
import urllib
import moviepy.editor as mp
#loading Model and constants
device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)
N=60


#Audio Download Function
def video_download(link,type):
    print("Video Downloading")
    if type=='yt':
        yt=YouTube(link)
        video = yt.streams.filter(only_audio=True).first()
        out_file = video.download(output_path=".")
        # save the file
        base, ext = os.path.splitext(out_file)
        new_file = base + '.mp3'
        os.rename(out_file, new_file)
        return new_file
    elif type=="static":
        urllib.request.urlretrieve(link, str(link.split("token=")[-1])+'.mp4')
        clip = mp.VideoFileClip((link.split("token=")[-1])+'.mp4')
        clip.audio.write_audiofile(r"converted.wav")
        return "converted.wav"
    
# #Video Preprocess
# def video_frames_f(link):
#     print("Video Preprocesing")
#     video_frames = []  #Frames List
#     capture = cv2.VideoCapture(link)
#     fps = capture.get(cv2.CAP_PROP_FPS)
#     current_frame = 0
#     while capture.isOpened():
#         ret, frame = capture.read()
#         if ret == True:
#             video_frames.append(Image.fromarray(frame[:, :, ::-1]))
#         else:
#             break
#         current_frame += N #Skip frames
#         capture.set(cv2.CAP_PROP_POS_FRAMES, current_frame)
#     # Print some statistics
#     print(f"Frames extracted: {len(video_frames)}")
#     return fps,video_frames

#Capturing the video frames without downloading
def video_preprocess(link,type):
    print("Extracting Frames")
    video_frames = []  #Frames List
    #If-Else to get the vid_capture object from the link and type
    if type=='yt':
        ydl_opts = {}
        ydl = youtube_dl.YoutubeDL(ydl_opts)
        info_dict = ydl.extract_info(link, download=False)
        formats = info_dict.get('formats',None)
        for f in formats:
            if f.get('format_note',None) == '144p':
                url = f.get('url',None)
                vid_capture = cv2.VideoCapture(url)
    elif type=='static':
        vid_capture = cv2.VideoCapture(link)

    #Start Capturing 
    current_frame=0
    fps = vid_capture.get(cv2.CAP_PROP_FPS)
    while True:
        ret, frame = vid_capture.read()
        if not ret:
            break
        video_frames.append(Image.fromarray(frame[:, :, ::-1]))
        current_frame += N #Skip frames
        vid_capture.set(cv2.CAP_PROP_POS_FRAMES, current_frame)
    vid_capture.release()
    
    print(f"Frames extracted: {len(video_frames)}")
    return fps,video_frames

#Adding context to each frame
def frame_classifier(video_frames):
    batch_size = 256
    batches = math.ceil(len(video_frames) / batch_size)
    video_features = torch.empty([0, 512], dtype=torch.float16).to(device) #Encoded Frames
    #Frames Processing
    for i in range(batches):
        print(f"Processing batch {i+1}/{batches}")
        batch_frames = video_frames[i*batch_size : (i+1)*batch_size]
        batch_preprocessed = torch.stack([preprocess(frame) for frame in batch_frames]).to(device)
        with torch.no_grad():
            batch_features = model.encode_image(batch_preprocessed)
            batch_features /= batch_features.norm(dim=-1, keepdim=True)
        video_features = torch.cat((video_features, batch_features))
    # Print some stats
    print(f"Features Shape: {video_features.shape}")
    return video_features

#Prediction
def search_video(search_query,link,type='yt', display_results_count=3):
    time_stamps=[]
    # video_link=video_download(link,type)
    # fps,video_frames=video_frames_f(video_link)
    fps,video_frames=video_preprocess(link,type)
    video_features=frame_classifier(video_frames)
    with torch.no_grad():
        text_features = model.encode_text(clip.tokenize(search_query).to(device))
        text_features /= text_features.norm(dim=-1, keepdim=True)
    similarities = (100.0 * video_features @ text_features.T)
    values, best_photo_idx = similarities.topk(display_results_count, dim=0)
    # Display the top 3 frames
    for frame_id in best_photo_idx:
        seconds = round(frame_id.cpu().numpy()[0] * N / fps)
        time_stamps.append(seconds)
    return time_stamps

#Audio Hot Words
def transcript(file):
    leopard = pvleopard.create(access_key='clzWvIxwJZXvEIc4rhS9oBA3yoJ8GzcTqZfvn6KuqL/M7FPcB2HJWQ==')
    file=os.path.abspath(file)
    tsc, words = leopard.process_file(file)
    return tsc

def hot_words(link,type):
    file=video_download(link,type)
    # file=os.path.abspath("converted.wav")
    print("Transcribing")
    vectorizer = TfidfVectorizer(max_features=10,stop_words=stopwords.words('english'))    
    corpus = [transcript(file)]
    X = vectorizer.fit_transform(corpus).todense()
    X1 = np.array(X).flatten()
    X2  = vectorizer.get_feature_names_out().flatten()
    arr = np.array([X1,X2]).T.tolist()
    arr=sorted(arr,key=lambda x:x[0],reverse=True)
    return [x for x in arr[:10]]