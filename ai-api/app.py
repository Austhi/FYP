from flask import Flask, request, jsonify
import csv
import subprocess

app = Flask(__name__)

# Route for AI analysis
@app.route('/ai_analysis', methods=['POST'])
def ai_analysis():
    data = request.get_json()
    # try:
    # Write data to medic.csv
    with open('medic.csv', mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow([
            "age", "restingBP", "gender", "chestpain", "serumcholestrol", 
            "fastingbloodsugar", "restingrelectro", "maxheartrate", 
            "exerciseangia", "oldpeak", "slope", "noofmajorvessels"
        ])
        print(data, flush=True)
        item = data['data']
        writer.writerow([
            int(float(item.get('age', 0))),         # Convert float to int
            int(float(item.get('restingBp', 0))),   # Convert float to int
            int(float(1)),   # Convert float to int
            int(float(item.get('chestPain', 0))),   # Convert float to int
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
    process = subprocess.Popen(['python', 'test.py', 'medic.csv'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)  # Ensure the output is captured with UTF-8 encoding
    stdout, stderr = process.communicate()
    analysis_result = {}
    return_value = 200
    # Check stdout and stderr        
    if (stdout):
        stdout_str = stdout.decode('utf-8')  # Ensure stdout is a string
    if stdout_str:
        if (stdout_str.index("Prediction: ") >= 0):
            pred_start_idx = stdout_str.index("Prediction: ")
            prediction = stdout_str[pred_start_idx:stdout_str.find('\n', pred_start_idx)]
            # print(f"Extracted Prediction Line: {str}")
            analysis_result["msg"] = prediction
            return_value = 200
        else:
            print('d')
            print(stdout.index("Prediction: ") >= 0, flush=True)
            if stderr:
                print(f"STDERR:\n{stderr}")
                analysis_result["msg"] = stderr
                return_value = 400
    return jsonify(analysis_result), return_value
    # except:
    #     return jsonify("error"), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3333, debug=True)
