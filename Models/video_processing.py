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
from threading import Thread, Lock
import math
import torch

def video_preprocess(link, type, device, model, preprocess):
    print("Extracting Frames")
    video_frames = []  # Frames List
    frame_buffer = []  # Buffer for storing frames until batch processing
    batch_size = 256
    lock = Lock()  # Synchronization lock for batch processing
    classified_frames = None  # Variable to store the classified frames

    def process_batch(frames):
        nonlocal video_frames, classified_frames
        video_frames.extend(frames)
        # Send frames to frame_classifier function
        classified_frames = frame_classifier(frames, device, model, preprocess)

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

    def capture_frames():
        nonlocal current_frame, frame_buffer
        while True:
            ret, frame = vid_capture.read()
            if not ret:
                break
            frame_buffer.append(frame)
            current_frame += N  # Skip frames
            vid_capture.set(cv2.CAP_PROP_POS_FRAMES, current_frame)
            if len(frame_buffer) == batch_size:
                with lock:
                    process_batch(frame_buffer)
                    frame_buffer = []

    # Create a thread for frame capturing
    capture_thread = Thread(target=capture_frames)
    capture_thread.start()

    # Wait for the capturing thread to finish
    capture_thread.join()

    # Process remaining frames in the last batch
    if frame_buffer:
        process_batch(frame_buffer)

    vid_capture.release()

    print(f"Frames extracted: {len(video_frames)}")
    return fps, classified_frames

from PIL import Image
import torch
import math

def frame_classifier(frames, device, model, preprocess):
    batch_size = len(frames)
    video_features = torch.empty([0, 512], dtype=torch.float16).to(device)  # Encoded Frames

    for i in range(math.ceil(batch_size / 256)):
        start = i * 256
        end = (i + 1) * 256
        batch_frames = frames[start:end]
        batch_preprocessed = torch.stack([preprocess(Image.fromarray(frame)) for frame in batch_frames]).to(device)
        with torch.no_grad():
            batch_features = model.encode_image(batch_preprocessed)
            batch_features /= batch_features.norm(dim=-1, keepdim=True)
        video_features = torch.cat((video_features, batch_features))

    # Print some stats
    print(f"Features Shape: {video_features.shape}")
    return video_features
