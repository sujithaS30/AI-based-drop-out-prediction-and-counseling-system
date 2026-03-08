from flask import Flask, jsonify
from flask_cors import CORS

# Flask app initialization
app = Flask(__name__)
CORS(app)  # Idhu frontend (port 5500) and backend (port 5000)-a connect panna help pannum

# Sample data - Inga dhaan namma AI model-oda results varum
@app.route('/students', methods=['GET'])
def get_students():
    data = [
        {"name": "Rahul S", "attendance": 65, "marks": 40, "status": "High Risk"},
        {"name": "Anitha V", "attendance": 92, "marks": 85, "status": "Safe"},
        {"name": "Vijay K", "attendance": 55, "marks": 35, "status": "High Risk"}
    ]
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)