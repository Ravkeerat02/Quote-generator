// Retrieve a new quote from the API
async function getNewQuote() {
  const response = await fetch("https://api.quotable.io/random");
  const data = await response.json();
  return data;
}

// Generate a new quote and display it on the page
async function generateQuote() {
  const { content, author } = await getNewQuote();
  document.getElementById("quote-text").textContent = content;
  document.getElementById("author-text").textContent = `- ${author}`;
  document.getElementById("speak-quote-button").disabled = false;
}

//Generate quote of the day and display it on the page
async function generateQuoteOfDay() {
  

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

//toggle functionality to change the theme 
let isDarkTheme = false;

// Set the initial theme based on the user's preference (if it exists)
if (localStorage.getItem("theme") === "dark") {
  toggleTheme();
}else{
  isDarkTheme = false;
}

themeToggle.addEventListener("change", toggleTheme);

//create a function which will help 
function toggleTheme(){
  if (isDarkTheme) {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    isDarkTheme = false;
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    isDarkTheme = true;
  }
}


