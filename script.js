const SpeechRecognition =
window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.lang = "bn-BD";
recognition.continuous = false;
recognition.interimResults = false;

let isSpeaking = false;

window.onload = function () {
    speechSynthesis.getVoices();

    setTimeout(function () {
        recognition.start();
    }, 1000);
};

recognition.onresult = function(event) {

    if (isSpeaking) return;

    let speech = event.results[0][0].transcript;

    speech = speech.toLowerCase().trim();

    let found = false;

    for (let intent of intents) {

        let ok = true;

        for (let word of intent.keywords) {

            if (!speech.includes(word)) {
                ok = false;
                break;
            }
        }

        if (ok) {
            speak(intent.answer);
            found = true;
            break;
        }
    }

    if (!found) {
        speak("আমি জানি না");
    }
};

recognition.onend = function() {

    if (!isSpeaking) {
        recognition.start();
    }

};

function speak(text) {

    isSpeaking = true;

    recognition.stop();

    let msg = new SpeechSynthesisUtterance();

    msg.text = text;
    msg.lang = "bn-BD";

    msg.onend = function() {

        isSpeaking = false;

        recognition.start();

    };

    speechSynthesis.speak(msg);
}