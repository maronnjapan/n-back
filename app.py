# N-Backのアプリケーション
from flask import Flask,render_template,request
import math

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("index.html")


@app.route('/result',methods=['GET','POST'])
def result():
    if request.method == 'POST':
        timeStanp = int(request.form["time"])
        score = request.form["score"]
        minutes = math.floor(timeStanp/(60*1000))
        seconds = math.floor((timeStanp-minutes*60)/1000)
        finishTime = str(minutes) + ":" + str(seconds)
        return render_template("result.html",score=score,finishTime=finishTime)

if __name__ == "__main__":
    app.run()
