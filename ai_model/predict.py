import joblib
import os

def get_prediction(attendance, marks):
    # predict.py irukkura folder-laye model.pkl irukkanum
    model_path = os.path.join(os.path.dirname(__file__), 'model.pkl')
    model = joblib.load(model_path)
    prediction = model.predict([[attendance, marks]])
    return "High Risk" if prediction[0] == 1 else "Safe"