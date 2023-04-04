// Retrieve a new quote from the API
async function getNewQuote() {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    return data;
  }

  // Fetch a random quote from the API
  fetch('https://api.quotable.io/random')
  .then(response => response.json())
  .then(data => {
    // Display the quote of the day
    const quoteOfTheDayElement = document.getElementById('quote-of-the-day');
    quoteOfTheDayElement.innerHTML = `Quote of the Day: "${data.content}" - ${data.author}`;
  })
  .catch(error => console.error(error));
  
  // Generate a new quote and display it on the page
  async function generateQuote() {
    const { content, author } = await getNewQuote();
    document.getElementById("quote-text").textContent = content;
    document.getElementById("author-text").textContent = `- ${author}`;
    document.getElementById("speak-quote-button").disabled = false;
  }
  
  // Speak the current quote using the Web Speech API
  function speakQuote() {
    const textToSpeak = `${document.getElementById("quote-text").textContent} by ${document.getElementById("author-text").textContent}`
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    speechSynthesis.speak(utterance);
  }
  
  // Share the current quote on Twitter
  function shareQuote() {
    const quoteText = encodeURIComponent(document.getElementById("quote-text").textContent);
    const authorText = encodeURIComponent(document.getElementById("author-text").textContent);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText}${authorText}&hashtags=QuoteOfTheMinute`;
    window.open(twitterUrl, "_blank");
  }
  
  // Display the current time in the footer
  function displayTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    document.getElementById("time").textContent = `Current time: ${timeString}`;
  }
  
  // Add event listeners to buttons
  document.getElementById("new-quote-button").addEventListener("click", generateQuote);
  document.getElementById("speak-quote-button").addEventListener("click", speakQuote);
  document.getElementById("share-quote-button").addEventListener("click", shareQuote);
  
  // Generate an initial quote and display the current time
  generateQuote();
  displayTime();
  setInterval(displayTime, 1000); // Update the time every second
  
  // Display quote in a box
  const quoteBox = document.getElementById("quote-box");
  quoteBox.addEventListener("click", function() {
    quoteBox.classList.toggle("box-open");
  });
  
  // Generate a new quote when clicking the refresh button
  const refreshButton = document.getElementById("refresh-button");
  refreshButton.addEventListener("click", function() {
    generateQuote();
  });
  
  // Add event listener to the share button
  const shareButton = document.getElementById("share-button");
  shareButton.addEventListener("click", function() {
    shareQuote();
  });
  

  // Digital Clock
  const digitalClockElement = document.getElementById('digital-clock');
  setInterval(() => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    digitalClockElement.textContent = `${hours}:${minutes}:${seconds}`;
  }, 1000);
  
  // Analog Clock
  const analogClockElement = document.getElementById('analog-clock');
  const context = analogClockElement.getContext('2d');
  const radius = analogClockElement.height / 2;
  context.translate(radius, radius);
  radius *= 0.9;
  setInterval(() => {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    drawClockFace(context, radius);
    drawHand(context, hours * 30 + minutes / 2, radius * 0.5, radius * 0.07);
    drawHand(context, minutes * 6 + seconds / 10, radius * 0.7, radius * 0.07);
    drawHand(context, seconds * 6, radius * 0.9, radius * 0.02);
  }, 1000);
  
  function drawClockFace(context, radius) {
    context.beginPath();
    context.arc(0, 0, radius, 0, 2 * Math.PI);
    context.fillStyle = 'white';
    context.fill();
    context.lineWidth = radius * 0.1;
    context.strokeStyle = 'black';
    context.stroke();
    context.beginPath();
    context.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    context.fillStyle = 'black';
    context.fill();
  }
  

  function drawHand(context, position, length, width) {
    context.beginPath();
    context.lineWidth = width;
    context.lineCap = 'round';
    context.moveTo(0, 0);
    context.rotate(position * Math.PI / 180);
    context.lineTo(0, -length);
    context.stroke();
    context.rotate(-position * Math.PI / 180);
  }

