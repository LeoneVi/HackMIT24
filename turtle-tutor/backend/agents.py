import openai
import json

from deepeval import evaluate
from deepeval.metrics import FaithfulnessMetric, ContextualPrecisionMetric, ContextualRelevancyMetric, AnswerRelevancyMetric
from deepeval.test_case import LLMTestCase


client = openai.OpenAI()


teacher_short_system = "Your job is to act as my Java programming tutor. Be very brief in your answer, just a couple sentences."
teacher_verbose_system = "Your job is to act as my Java programming tutor. Be extremely thorough in your answer, provide high quality explanations to my questions."

review_system = "I want you to score how well a tutor answers a students Java questions. I will send you a question by the student, as well as the teacher's answer. Respond with JSON with two fields. A 'comments' string field with your comments about how well the teacher answers the students question, and a 'score' integer field, which should have your rating as a value between 0 and 5. With 5 being a perfect score, and 0 being the worst score." 

bad_teacher_system = "I want you to act as a bad tutor. I'm going to ask you Java questions, and I want you to either completely incorrectly. Your answers shouldn't be tongue and cheek or just humorous, but deadpan and directly factually incorrect. Make your ansers seem plausible while not being true. Specifically, dont joke about Java being coffee."


student_messages = []
#bad_teacher_messages = [{"role": "system", "content": bad_teacher_system}]
teacher_messages = [{"role": "system", "content": teacher_verbose_system}]



def student(msg: str, topic : str):
     
    student_system = f"Your job is to act as my {topic} student. You should ask me questions, and have me try to explain {topic} concepts to you. If I explain something well, say you understand and ask more questions. If I explain concepts poorly, continue to act confused and ask more questions to attempt to understand."
    student_messages.append({"role": "user", "content": msg})
    response = client.chat.completions.create(
        model= "gpt-4o-mini",
        messages= [{"role": "system", "content": student_system}] + student_messages,
        temperature = 0.5
    )
    text = response.choices[0].message.content
    student_messages.append({"role": "assistant", "content": text})
    print("\033[96mStudent: " + text)
    print
    teacher_messages.append({"role": "user", "content": text})
    teacher_messages.append({"role": "assistant", "content": msg})
    return text

def clear_state():
    global student_messages, teacher_messages
    student_messages = []
    teacher_messages = [{"role": "system", "content": teacher_verbose_system}]
   

def teacher1(msg: str): 
    teacher_messages.append({"role": "user", "content": msg})
    response = client.chat.completions.create(
        model= "gpt-4o-mini",
        messages= teacher_messages,
        temperature = 0.5
    )
    text = response.choices[0].message.content
    teacher_messages.append({"role": "assistant", "content": text})
    print("\033[92mTeacher: " + text) 
    return text


def test_deep_eval():
    metric = ContextualPrecisionMetric(
        threshold=0.7,
        model="gpt-4o-mini",
        include_reason=True
    )
    test_case = LLMTestCase(
        input="What is the 4th planet from the sun?",
        actual_output= "Mars",
        expected_output= "The fourth planet from the sun is Mars",
        retrieval_context=["The 5 closest planets in order are Mercury, Venus, Earth, Mars, Jupiter"]
    )
    metric.measure(test_case)
    print(metric.score)    
    print(metric.reason)





def deep_eval_triple():
    msgs = student_messages
    relv_metric = AnswerRelevancyMetric(
            threshold = 0.7,
            model = "gpt-4o-mini",
            include_reason = True
    )
    faith_metric = FaithfulnessMetric(
            threshold = 0.7,
            model = "gpt-4o-mini",
            include_reason = True
    )
    cont_metric = ContextualRelevancyMetric( 
            threshold = 0.7,
            model = "gpt-4o-mini",
            include_reason = True
    ) 
    last_student = msgs[-3]
    last_user = msgs[-2]
    
    print(last_student)
    assert last_student["role"] == "assistant"
    assert last_user["role"] == "user"
    response = client.chat.completions.create(
        model = "gpt-4o-mini",
        messages = teacher_messages,
        temperature = 0.5,
    )
    ideal_text = response.choices[0].message.content
    relv_case = LLMTestCase(
        input = last_student["content"],
        actual_output = last_user["content"],
    )
    test_case = LLMTestCase(
        input = last_student["content"],
        actual_output = last_user["content"],
        retrieval_context = [ideal_text]
    )
    relv_metric.measure(relv_case)
    faith_metric.measure(test_case)
    cont_metric.measure(test_case)
    eval_json = {"faithfulness": faith_metric.score, "faithfulness_reason": faith_metric.reason, "relevancy": relv_metric.score, "relevancy_reason": relv_metric.reason, "cont": cont_metric.score, "cont_reason": cont_metric.reason} 
    return eval_json






def deep_eval_review():
    msgs = student_messages
    relv_metric = AnswerRelevancyMetric(
            threshold = 0.7,
            model = "gpt-4o-mini",
            include_reason = True
    )
    faith_metric = FaithfulnessMetric(
            threshold = 0.7,
            model = "gpt-4o-mini",
            include_reason = True
    )
    cont_metric = ContextualRelevancyMetric( 
            threshold = 0.7,
            model = "gpt-4o-mini",
            include_reason = True
    ) 
    last_student = msgs[-3]
    last_user = msgs[-2]
    
    print(last_student)
    assert last_student["role"] == "assistant"
    assert last_user["role"] == "user"
    response = client.chat.completions.create(
        model = "gpt-4o-mini",
        messages = teacher_messages,
        temperature = 0.5,
    )
    ideal_text = response.choices[0].message.content
    relv_case = LLMTestCase(
        input = last_student["content"],
        actual_output = last_user["content"],
    )
    test_case = LLMTestCase(
        input = last_student["content"],
        actual_output = last_user["content"],
        retrieval_context = [ideal_text]
    )
    relv_metric.measure(relv_case)
    faith_metric.measure(test_case)
    cont_metric.measure(test_case)
    eval_json = {"faithfulness": faith_metric.score, "faithfulness_reason": faith_metric.reason, "relevancy": relv_metric.score, "relevancy_reason": relv_metric.reason, "cont": cont_metric.score, "cont_reason": cont_metric.reason} 
    return (relv_metric.score * (cont_metric.score + faith_metric.score)) / 2


def review(conversation: list[dict]):
    out = []
    msgs = conversation["messages"]
    for i in range(2, len(conversation["messages"]), 2):
        if i + 1 >= len(conversation["messages"]):
            break
        out.append({"role": "student", "content": msgs[i]})
        out.append({"role": "teacher", "content": msgs[i+1]})
        print(f"\x1b[36m{conversation['messages'][i]}")
        print(f"\x1b[32m{conversation['messages'][i+1]}")
        in_str = f"STUDENT: {conversation['messages'][i]}\nTEACHER: {conversation['messages'][i+1]}\n"
        response = client.chat.completions.create(
            model = "gpt-4o-mini",
            messages = [{"role": "system", "content": review_system} , {"role": "user", "content": in_str}],
            temperature = 0.5,
            response_format = { "type": "json_object" }
        )
        json1 = response.choices[0].message.content
        out.append({"role": "reviewer", "content": json1})
        print(f"\x1b[33m{json1}")
    with open("reviews.jsonl", "a") as f:
        f.write(json.dumps({"messages": out}) + "\n")


"""
starter = "Hi, I'm your Java tutor. What can I help you with today"
s = student(starter)
for i in range(5):
    t = teacher1(s)
    s = student(t)

with open("student.jsonl", "a") as f:
    f.write(json.dumps(student_messages) + "\n")
"""


def read_jsonl(f):
    return [json.loads(f) for f in f.readlines()]

def print_jsonl(jsonl):
    for j in jsonl:
        print("{")
        for k in j:
            print(f"\t{k}: {j[k]}")
        print("}") 

if __name__ == "__main__":
    with open("student.jsonl", "r") as f:
        messages = read_jsonl(f)
        for m in messages[3:]:
            deep_eval_review(m["messages"])
