import joblib
from sklearn.tree import DecisionTreeClassifier
import os

# 1. Training Data (Attendance, Marks)
# 0 = Safe, 1 = High Risk
X = [[95, 85], [40, 30], [80, 70], [50, 45], [90, 90], [30, 20]]
y = [0, 1, 0, 1, 0, 1]

# 2. Model Training
model = DecisionTreeClassifier()
model.fit(X, y)

# 3. Path Setup
# ai_model folder irukku nu confirm pannikitu, athukkulla model.pkl-a save pannuvom
model_dir = 'ai_model'
if not os.path.exists(model_dir):
    os.makedirs(model_dir)

model_path = os.path.join(model_dir, 'model.pkl')

# 4. Save the model
joblib.dump(model, model_path)
print(f"Success! AI Model saved at: {os.path.abspath(model_path)}")