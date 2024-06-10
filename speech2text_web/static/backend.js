// advanced_backend.js
const startSpeechRecognitionButton = document.getElementById('startSpeechRecognition');
const recognizedTextElement = document.getElementById('recognizedText');
const processedTextElement = document.getElementById('processedText');

if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onstart = () => {
        console.log('Speech recognition started.');
    };

    recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        recognizedTextElement.textContent = `Recognized Text: ${result}`;

        // Send the recognized text to the Flask backend
        fetch('/process_recognized_text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'recognized_text': result }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Processed Text:', data.processed_text);
            processedTextElement.textContent = `Processed Text: ${data.processed_text}`;
            
            // Convert processed text to speech
            const synth = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance(data.processed_text);
            synth.speak(utterance);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
    };

    startSpeechRecognitionButton.addEventListener('click', () => {
        recognition.start();
        recognizedTextElement.textContent = 'Recognized Text: Listening...';
    });
} else {
    recognizedTextElement.textContent = 'Speech recognition is not supported in this browser.';
    startSpeechRecognitionButton.disabled = true;
}
