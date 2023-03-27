// DOM elements
const quoteText = document.getElementById('quote-text');
const authorText = document.getElementById('author-text');
const authorImage = document.getElementById('author-image');
const speakQuoteButton = document.getElementById('speak-quote-button');
const newQuoteButton = document.getElementById('new-quote-button');
const shareQuoteButton = document.getElementById('share-quote-button');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const quoteOfDayText = document.getElementById('quote-of-day-text');
const quoteOfDayAuthor = document.getElementById('quote-of-day-author');
const quoteOfDayButton = document.getElementById('quote-of-day-button');
const timeElement = document.getElementById('time');

// Speech synthesis
const synth = window.speechSynthesis;

// Default settings
let currentQuote = '';
let currentAuthor = '';
let currentImage = '';
let currentQuoteOfDay = '';
let currentAuthorOfDay = '';

// Function to get a random quote from the API
async function getQuote() {
  const apiUrl = 'https://api.quotable.io/random';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (response.ok) {
      currentQuote = data.content;
      currentAuthor = data.author;
      currentImage = `https://picsum.photos/seed/${currentAuthor}/300`;
      renderQuote(currentQuote, currentAuthor, currentImage);
    } else {
      throw new Error('Error getting quote.');
    }
  } catch (error) {
    console.log(error);
  }
}

// Function to render the current quote and author
function renderQuote(quote, author, image) {
  quoteText.textContent = quote;
  authorText.textContent = `- ${author}`;
  authorImage.setAttribute('src', image);
}

// Speak the current quote using the Web Speech API
function speakQuote() {
  const textToSpeak = `${document.getElementById("quote-text").textContent} by ${document.getElementById("author-text").textContent}`
  const utterance = new SpeechSynthesisUtterance(textToSpeak);
  speechSynthesis.speak(utterance);
}

