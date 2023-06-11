# Imports

import cv2
from PIL import Image
import torch
import math
import cv2
import yt_dlp as youtube_dl
from sklearn.feature_extraction.text import TfidfVectorizer
N = 60
# loading Model and constants
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

# Capturing the video frames without downloading


def video_preprocess(link, type):
    print("Extracting Frames")
    video_frames = []  # Frames List
    # If-Else to get the vid_capture object from the link and type
    if type == 'yt':
        ydl_opts = {}
        ydl = youtube_dl.YoutubeDL(ydl_opts)
        info_dict = ydl.extract_info(link, download=False)
        formats = info_dict.get('formats', None)
        for f in formats:
            if f.get('format_note', None) == '144p':
                url = f.get('url', None)
                vid_capture = cv2.VideoCapture(url)
    elif type == 'static':
        vid_capture = cv2.VideoCapture(link)

    # Start Capturing
    current_frame = 0
    fps = vid_capture.get(cv2.CAP_PROP_FPS)
    while True:
        ret, frame = vid_capture.read()
        if not ret:
            break
        video_frames.append(Image.fromarray(frame[:, :, ::-1]))
        current_frame += N  # Skip frames
        vid_capture.set(cv2.CAP_PROP_POS_FRAMES, current_frame)
    vid_capture.release()

    print(f"Frames extracted: {len(video_frames)}")
    return fps, video_frames

# Adding context to each frame


import concurrent.futures

def process_batch(batch_frames, device, model, preprocess):
    batch_preprocessed = torch.stack([preprocess(frame) for frame in batch_frames]).to(device)
    with torch.no_grad():
        batch_features = model.encode_image(batch_preprocessed)
        batch_features /= batch_features.norm(dim=-1, keepdim=True)
    return batch_features

def frame_classifier(video_frames, device, model, preprocess):
    batch_size = 256
    batches = math.ceil(len(video_frames) / batch_size)
    video_features = torch.empty([0, 512], dtype=torch.float16).to(device)  # Encoded Frames
    
    with concurrent.futures.ProcessPoolExecutor() as executor:
        futures = []
        
        for i in range(batches):
            batch_frames = video_frames[i * batch_size: (i + 1) * batch_size]
            future = executor.submit(process_batch, batch_frames, device, model, preprocess)
            futures.append(future)
        
        for future in concurrent.futures.as_completed(futures):
            batch_features = future.result()
            video_features = torch.cat((video_features, batch_features))
    
    print(f"Features Shape: {video_features.shape}")
    return video_features

