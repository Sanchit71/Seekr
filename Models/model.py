#Imports
from pytube import YouTube 
import cv2
import torch
import clip
from PIL import Image
import math
import numpy 
import datetime

#Model Import
device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)
N=60 #Skip Frames

def video_download(link):
    print("Video Downloading")
    #Downloading a Youtube Video
    yt = YouTube(link)
    filename=link.split("/")[-1]+".mp4"  #Giving a filename
    #Choosing a 360p MP4 video
    mp4_files = yt.streams.filter(file_extension="mp4")
    mp4_files = mp4_files.get_by_resolution("360p")
    mp4_files.download(filename=filename)
    return filename
def video_frames_capture(filename):
    print("Frames Capturing...")
    #Capturing Frames into an Array
    cap = cv2.VideoCapture(filename)
    video_frames=[]
    frame_num=0
    fps=cap.get(cv2.CAP_PROP_FPS)
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        video_frames.append(Image.fromarray(frame[:, :, ::-1]))
        frame_num += N
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_num) #Skipping Frames
    cap.release()
    return fps,video_frames
def frame_classifier(video_frames):
    #Setting Batch Size and splitting in batches
    batch_size = 256
    batches = math.ceil(len(video_frames) / batch_size)
    #To Store Encoded Frames
    video_features = torch.empty([0, 512], dtype=torch.float16).to(device) 

    #Frames Processing
    for i in range(batches):
        print(f"Processing batch {i+1}/{batches}")
        batch_frames = video_frames[i*batch_size : (i+1)*batch_size] #Getting the i'th Batch
        #Preprocessing batch
        batch_preprocessed = torch.stack([preprocess(frame) for frame in batch_frames]).to(device)
        with torch.no_grad():
            batch_features = model.encode_image(batch_preprocessed)  #Encoding 
            batch_features /= batch_features.norm(dim=-1, keepdim=True)
        video_features = torch.cat((video_features, batch_features)) #Adding to video_features
        # Print some stats
        print(f"Features Shape: {video_features.shape}")
    return video_features
import datetime
#Function to search and give timestamp
def search_video(search_query,link):
    video=video_download(link)
    fps,video_frames_captured=video_frames_capture(video)
    video_features=frame_classifier(video_frames_captured)
    with torch.no_grad():
        text_features = model.encode_text(clip.tokenize(search_query).to(device))
        text_features /= text_features.norm(dim=-1, keepdim=True)
    similarities = (100.0 * video_features @ text_features.T)
    values, best_photo_idx = similarities.topk(3, dim=0)
    # Display the top 3 frames
    timestamps=[]
    for frame_id in best_photo_idx:
        # display(video_frames_captured[frame_id])
        # Find the timestamp in the video and display it
        seconds = round(frame_id.cpu().numpy()[0] * N / fps)
        timestamps.append(seconds)
    return timestamps