from flask import Flask, request
from agents import student, deep_eval_review, clear_state
app = Flask(__name__)

topic = None


@app.route('/init', methods = ["POST"])
def index():
    global topic
    print("fine")
    clear_state()
    topic = request.form["topic"]
    res = student(f"Hi, I'm your {topic} teacher. What can I help you with today?", topic) 
    print("BACKEND", res)
    return {"text": res}


@app.route("/session", methods = ["POST"])
def index2():
    global topic
    answer = request.form["answer"]
    res = student(answer, topic)
    return {"question": res}


@app.route("/reasoning")
def reasoning():
    return deep_eval_triple()
    


@app.route("/review")
def index3():
    return {"score": deep_eval_review()} 
