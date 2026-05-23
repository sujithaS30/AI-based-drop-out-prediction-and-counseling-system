# EduPredict AI: Based Drop-out Prediction System 🎓🤖

An AI-powered institutional dashboard developed using modern full-stack web technologies and Machine Learning to accurately predict student drop-out risks, analyze academic metrics, and track professional student counseling interventions.
---
## 🚀 Core Features
* **Risk Assessment Dashboard:** Real-time summary layout fetching records directly through Python API integrations.
* **Predictive AI Analysis:** Built-in Machine Learning classification engine marking profiles instantly as `High Risk` or `Safe`.
* **Student Counseling Records:** Interactive full-stack data system handling active logs (`POST` updates directly written into the relational system).
* **Automated Risk Alerts:** Dedicated isolation filter screen dynamically querying extreme outlier data blocks.
---
## 🛠️ Tech Stack & Architecture
* **Frontend UI:** Responsive Single Page Application (SPA) architecture utilizing structural HTML5, semantic CSS3 animations, and Modern Vanilla JavaScript.
* **Backend Server:** Lightweight python service built over the **Flask Microframework** utilizing Cross-Origin Resource Sharing (CORS) configurations.
* **Database Management Engine:** Relational tracking using **SQLite3** embedded data models (`database.db`).
* **Machine Learning Architecture:** Predictive logic configured over a Supervised **Decision Tree Classifier** via Scikit-Learn pipelines.
---
## 📁 Project Folder Structure
```text
AI-Based Drop-out Prediction System/
│
├── backend/
│   ├── app.py                  # Main Flask Server API Engine
│   ├── train_model.py          # Machine Learning training pipeline script
│   └── database.db             # Auto-generated SQLite Database File
│
├── ai_model/
│   ├── predict.py              # ML classifier extraction wrapper
│   └── model.pkl               # Saved binary Decision Tree Weights
│
└── frontend/
    ├── index.html              # Main Structural Dashboard Interface
    ├── style.css               # Professional Visual Theme Rules
    └── script.js               # Dynamic AJAX API Interaction Logic
