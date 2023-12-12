function typeText(text, element, delayAfter, callback) {
    let i = 0;
    element.innerHTML = ""; // Clear existing content
    const averageSpeed = 60000 / (80 * 5); // Calculating speed for 80 wpm

    function typeWriter() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            const variability = Math.random() * averageSpeed * 0.4 - averageSpeed * 0.2;
            const speed = averageSpeed + variability;
            setTimeout(typeWriter, speed);
        } else {
            setTimeout(() => {
                if (callback) callback();
            }, delayAfter);
        }
    }
    typeWriter();
}

function queueTyping(entries) {
    if (entries.length === 0) return;

    const entry = entries.shift();
    const typingElement = document.getElementById('typingArea');
    typeText(entry.text, typingElement, entry.delay, () => queueTyping(entries));
}

document.getElementById('typeButton').addEventListener('click', () => {
    const textInput = document.getElementById('textInput').value.split('\n');
    const entries = textInput.map((line, index) => ({
        text: line,
        delay: index === textInput.length - 1 ? 0 : 1000 // Delay of 1 second between lines, except last line
    }));
    queueTyping(entries);
});

document.getElementById('autoTypeButton').addEventListener('click', () => {
    const entries = [
        { text: "This is the first predefined text!", delay: 1500 },
        { text: "And here comes the second line...", delay: 1000 }
        // Add more predefined entries here if needed
    ];
    queueTyping(entries);
});
