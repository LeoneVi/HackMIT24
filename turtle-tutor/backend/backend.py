from flask import Flask, request
from agents import student, deep_eval_review, clear_state
app = Flask(__name__)

@app.route('/init', methods = ["POST"])
def index():
    clear_state()
    topic = request.form["topic"]
    res = student(f"Hi, I'm your {topic} teacher. What can I help you with today?") 
    return res 

@app.route("/session", methods = ["POST"])
def index2():
    answer = request.form["answer"]
    res = student(answer)
    return res



@app.route("/review")
def index3():
    return {"score": deep_eval_review()} 
