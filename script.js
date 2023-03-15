
      
function getNewQuote() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.quotable.io/random");
  xhr.setRequestHeader("X-TheySaidSo-Api-Secret", "DsbrIjHjP3WtHVYXBcjxbF1ai-QysPNS8W2MFmFojbo"); // replace with your API key
  xhr.onload = function() {
if (xhr.status === 200) {
  const data = JSON.parse(xhr.responseText);
  const quoteElement = document.getElementById("quote-text");
  const authorElement = document.getElementById("author-text");
  const authorImageElement = document.getElementById("author-image");
  const quoteText = data.content;
  const authorText = data.author;
  const authorImageUrl = `https://picsum.photos/200?random=${Math.floor(Math.random() * 100)}`;
  quoteElement.innerHTML = quoteText;
  authorElement.innerHTML = authorText;
  authorImageElement.src = authorImageUrl;
} else {
  console.error(xhr.statusText);
}
};
xhr.onerror = function() {
console.error("An error occurred while fetching the quote.");
};
xhr.send();
}





// Call the getNewQuote function when the page loads and when the "New Quote" button is clicked
window.onload = getNewQuote;
document.getElementById("new-quote-button").addEventListener("click", getNewQuote);

// Refresh the quote every minute
setInterval(getNewQuote, 60000);

// Function to display the current time and date
function displayTime() {
  const date = new Date();
  const timeElement = document.getElementById("time");
  timeElement.innerHTML = date.toLocaleString();
}

// Call the displayTime function every second to update the time
setInterval(displayTime, 1000);
