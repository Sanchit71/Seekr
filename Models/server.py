#Imports
from flask import Flask, jsonify, request
from model import search_video,hot_words,query
from flask_cors import CORS,cross_origin
#App
app = Flask("App")
CORS(app)
#Test
@app.route('/')
def test():
	return 'Not the correct way to connect to API'
#CORS

@app.route("/video",methods=["POST"])
#Function
def image_result():
    # print(request.get_json())
    #Required parameters
    try:
        query=request.get_json()['query']
        link=request.get_json()['link']
        type=request.get_json()['type']
    except:
        return jsonify({"Error":"Please enter all the required parameters"})
    if len(query)==0 or len(link)==0 or len(type)==0:
        return jsonify({"Error":"Please enter all the required parameters"})
    else:
        try:
            timestamps={"times_in_sec":search_video(query,link,type)}
            return jsonify(timestamps)
        except:
            return jsonify({"Error":"Something went wrong"})
        
@app.route("/audio_time",methods=["POST"])
#Function
def audio_results():
    try:
        file=request.get_json()['file']
        q=request.get_json()['query']
    except:
        return jsonify({"Error":"Please enter all the required parameters"})
    if  len(file)==0 or len(q)==0:
        return jsonify({"Error":"Please enter all the required parameters"})
    else:
        try:
            timestamp={"timestamps":query(file,q)}
            return jsonify(timestamp)
        except:
            return jsonify({"Error":"Something went wrong"})
@app.route("/audio",methods=["POST"])
#Function
def hot_word():
    try:
        link=request.get_json()['link']
        type=request.get_json()['type']
    except:
        return jsonify({"Error":"Please enter all the required parameters"})
    if  len(link)==0 or len(type)==0:
        return jsonify({"Error":"Please enter all the required parameters"})
    else:
        try:
            file,hot_word=hot_words(link,type)
            hot={"hot_words":hot_word,"file":file}
            return jsonify(hot)
        except:
            return jsonify({"Error":"Something went wrong"})

if __name__ == '__main__':
	app.run()
