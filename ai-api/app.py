from flask import Flask, request, jsonify

app = Flask(__name__)

# Route for getting all items
@app.route('/', methods=['GET'])
def main_route():
    return jsonify({"msg": "AI API"}), 200

if __name__ == '__main__':
    app.run(debug=True)
