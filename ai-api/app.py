from flask import Flask, request, jsonify
import csv
import subprocess

app = Flask(__name__)

# Route for AI analysis
@app.route('/ai_analysis', methods=['POST'])
def ai_analysis():
    data = request.get_json()

    # Write data to medic.csv
    with open('medic.csv', mode='w', newline='') as file:
        writer = csv.writer(file)
        # Write header
        writer.writerow([
            'patientId', 'age', 'chestPain', 'restingBp', 'serumCholestrol',
            'fastingBloodSugar', 'restingElectroRecords', 'maxHeartRate',
            'exerciseAngia', 'oldPeak', 'slope', 'noMajorVessels'
        ])
        # Write data rows
        item = data['data']
        writer.writerow([
            int(float(item.get('patientId', 0))),  # Convert float to int
            int(float(item.get('age', 0))),         # Convert float to int
            int(float(item.get('chestPain', 0))),   # Convert float to int
            int(float(item.get('restingBp', 0))),   # Convert float to int
            int(float(item.get('serumCholestrol', 0))),  # Convert float to int
            int(float(item.get('fastingBloodSugar', 0))),  # Convert float to int
            int(float(item.get('restingElectroRecords', 0))),  # Convert float to int
            int(float(item.get('maxHeartRate', 0))),  # Convert float to int
            int(float(item.get('exerciseAngia', 0))),  # Convert float to int
            float(item.get('oldPeak', 0.0)),   # Replace with your actual default value
            int(float(item.get('slope', 0))),         # Convert float to int
            int(float(item.get('noMajorVessels', 0)))  # Convert float to int
        ])
    
    # Execute test.py script with medic.csv as argument
    process = subprocess.Popen(['python', 'test.py', 'medic.csv'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    stdout, stderr = process.communicate()

    analysis_result = {}
    return_value = 200

    # Check stdout and stderr
    if stdout:
        print(f"STDOUT:\n{stdout.decode('utf-8')}")
        analysis_result = {"msg": stdout.decode('utf-8'), "data": data}
        return_value = 200
    if stderr:
        print(f"STDERR:\n{stderr.decode('utf-8')}")
        analysis_result = {"msg": stderr.decode('utf-8'), "data": data}
        return_value = 500

    return jsonify(analysis_result), return_value

if __name__ == '__main__':
    app.run(debug=True)
