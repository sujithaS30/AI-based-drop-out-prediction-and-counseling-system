import sys
import os

# Idhu thaan mukkiyamaana fix
# Project-oda root folder-a path-la add panrom
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from ai_model.predict import get_prediction
from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

# ... (rest of your code)
from ai_model.predict import get_prediction 

# Current directory-a path-la add panrom to find ai_model
sys.path.append(os.getcwd())

app = Flask(__name__)
CORS(app)

# Database Setup
def init_db():
    db_path = os.path.join(os.path.dirname(__file__), 'database.db')
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    # Counseling-kku extra columns add panni iruken
    cursor.execute('''CREATE TABLE IF NOT EXISTS students 
                      (id INTEGER PRIMARY KEY AUTOINCREMENT,
                       name TEXT, attendance INTEGER, marks INTEGER, 
                       counseling_date TEXT, remarks TEXT)''')
    
    # Sample data insert pannu
    cursor.execute("SELECT count(*) FROM students")
    if cursor.fetchone()[0] == 0:
        cursor.execute("INSERT INTO students (name, attendance, marks) VALUES (?, ?, ?)", ('Rahul S', 65, 40))
        cursor.execute("INSERT INTO students (name, attendance, marks) VALUES (?, ?, ?)", ('Anitha V', 92, 85))
        cursor.execute("INSERT INTO students (name, attendance, marks) VALUES (?, ?, ?)", ('Vijay K', 55, 35))
        conn.commit()
    conn.close()

init_db()

# Fetch students with AI Status
@app.route('/students', methods=['GET'])
def get_students():
    db_path = os.path.join(os.path.dirname(__file__), 'database.db')
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, attendance, marks FROM students")
    rows = cursor.fetchall()
    conn.close()
    
    student_list = []
    for row in rows:
        id, name, attendance, marks = row
        status = get_prediction(attendance, marks) 
        student_list.append({"id": id, "name": name, "attendance": attendance, "marks": marks, "status": status})
    
    return jsonify(student_list)

# Update Counseling Details
@app.route('/update_counseling', methods=['POST'])
def update_counseling():
    data = request.json
    db_path = os.path.join(os.path.dirname(__file__), 'database.db')
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("UPDATE students SET counseling_date = ?, remarks = ? WHERE id = ?", 
                   (data['date'], data['remarks'], data['id']))
    conn.commit()
    conn.close()
    return jsonify({"message": "Counseling updated successfully!"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)