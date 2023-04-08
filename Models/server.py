from flask import Flask,request
from model import search_video
app = Flask(__name__)


@app.route('/')
def test():
	return 'Not the correct way to connect to API'

@app.route('/video',methods=['POST'])
def video():
    link = request.json['link']
    query = request.json['query']
    try:
        return search_video(link,query)
    except:
        return "Error" 

if __name__ == '__main__':
	app.run()
