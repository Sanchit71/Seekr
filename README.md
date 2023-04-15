# Seekr

## 1. Aim
A platform that allows users to ask natural language questions about the content of a video and receive accurate, relevant results.

## 2. Problem Statement
With the increasing popularity of video-based learning, students are using videos more frequently as a primary source of information. 
However, searching for specific information within a video can be time-consuming and frustrating, as traditional video search methods 
are often not very efficient.Also, traditional content search methods often rely on manual tagging or transcription, which can be prone 
to errors.

Thus, there is a need for a more efficient and user-friendly method of searching inside videos using natural language, which can provide 
accurate and relevant results to the users.

## 3. Abstract 

The solution takes the link of a youtube video /  a video file as input which is fed into the webpage which applies Machine Learning Algorithms 
to get timestamps of the search query provided by the user. 

![Untitled Diagram](https://user-images.githubusercontent.com/98400026/230716126-945efb32-5f4e-4525-b339-480a1cd6892f.png)

## 4. Architecture

### I - SeekR (Video Frame Based)
![Screenshot from 2023-04-09 19 27 53](https://user-images.githubusercontent.com/98400026/230777022-f35ed5ee-dc06-4ae2-bb82-3af514193112.png)

### A - SeekR (Audio Based)
![Untitled Diagram drawio](https://user-images.githubusercontent.com/98400026/230776869-28864934-4591-4c77-b9fa-dbc7a83048f4.png)

## 5. Deployment Code:

### &emsp; In Frontend and Server Folder <br/>
> &emsp; npm install <br/>
> &emsp; npm start<br/>

### &emsp; In Model folder<br/>
> &emsp; flask --app server run

## 6. Screenshots


#### Main Page
![WhatsApp Image 2023-04-09 at 7 15 52 PM (4)](https://user-images.githubusercontent.com/98400026/230777192-dcc1d0f5-5c6c-499e-894a-be9adf9c8b3b.jpeg)

### Problem Statement
![WhatsApp Image 2023-04-09 at 7 15 52 PM (3)](https://user-images.githubusercontent.com/98400026/230777185-f89e860c-6613-4710-8d98-5a11e78ae00a.jpeg)

### Option between I-SeekR and V-SeekR
![WhatsApp Image 2023-04-09 at 7 15 52 PM (1)](https://user-images.githubusercontent.com/98400026/230777175-1df48db1-5eb4-4ef3-93d6-108d65857b2d.jpeg)

### Video Upload Page
![WhatsApp Image 2023-04-09 at 7 18 06 PM](https://user-images.githubusercontent.com/98400026/230777200-f31e4afb-b740-4fc9-a4e5-ce64644551c2.jpeg)

### Timestamped Output
![WhatsApp Image 2023-04-09 at 7 17 02 PM](https://user-images.githubusercontent.com/98400026/230777198-fa891451-e77b-4243-a8d2-c386ef0eabdd.jpeg)

### History
![WhatsApp Image 2023-04-09 at 7 15 52 PM (2)](https://user-images.githubusercontent.com/98400026/230777183-eea8eb7b-2e1d-4030-95c9-291bd8b1341d.jpeg)

### Highlighted History
![WhatsApp Image 2023-04-09 at 7 15 49 PM](https://user-images.githubusercontent.com/98400026/230777167-3af5663a-5827-4897-9588-cc62e7f3d7cd.jpeg)

### Contact Info
![WhatsApp Image 2023-04-09 at 7 15 52 PM](https://user-images.githubusercontent.com/98400026/230777173-415f4d76-2acc-45b9-b6ab-046a1ffe5f75.jpeg)
