import requests


r = requests.post("http://localhost:5000/init", {"topic": "Java programming"})

print(r.text)

r = requests.post("http://localhost:5000/session", {"answer": input("answer: ")})
print(r.text)
print("Evaluating...")

r = requests.get("http://localhost:5000/review")

print(r.text)
