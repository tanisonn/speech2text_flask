from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process_recognized_text', methods=['POST'])
def process_recognized_text():
    # Get the recognized text from the JSON request
    data = request.get_json()
    recognized_text = data.get('recognized_text', '')

    # Perform any processing on the recognized text here if needed
    # For example, you can convert it to uppercase
    processed_text = recognized_text.upper()

    # Return the processed text as a JSON response
    response_data = {'processed_text': processed_text}
    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True)
