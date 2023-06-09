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
  
  // Speak the current quote using the Web Speech API . Is it possible to add the controlling speech feature
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
  function translateQuote() {
    const apiKey = 'AIzaSyCJyQ9COVSXpHDvjjMPQ3jVrcxeQ6fQitc';
    const apiUrl = 'https://translation.googleapis.com/language/translate/v2';
    const targetLanguage = document.getElementById('language-dropdown').value;

    // Get the quote text to be translated
    const quoteText = document.getElementById('quote-text').textContent;

    // Send a POST request to the Google Translate API
    fetch(`${apiUrl}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: quoteText,
        target: targetLanguage,
      }),
    })
      .then(response => response.json())
      .then(data => {
        // Extract the translated text from the API response
        const translatedText = data.data.translations[0].translatedText;

        // Update the quote text with the translated text
        document.getElementById('quote-text').textContent = translatedText;
      })
      .catch(error => {
        console.error('Translation error:', error);
      });
  }

  function resetQuote(){
    document.getElementById('quote-text').textContent = " ";
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

  