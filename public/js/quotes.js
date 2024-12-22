const apiurl = "https://qapi.vercel.app/api/random"; // API endpoint for random quotes
const quote = document.getElementById("quote");
const author = document.getElementById("author");

async function geturl(url) {
    try {
        const response = await fetch(url); // Fetch the data from the API
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json(); // Parse the JSON response
        console.log(data); // Log the fetched data for debugging
        
        // Update the DOM elements with quote and author
        quote.innerHTML = data.quote; // Assuming API provides 'content' for quote
        author.innerHTML = data.author; // Assuming API provides 'author' for author
    } catch (error) {
        console.error('Error fetching data:', error);
        quote.innerHTML = "Failed to fetch quote."; // Display an error message in the UI
        author.innerHTML = "Unknown";
    }
}

setInterval(() => {
    geturl(apiurl);
}, 10000);// Call the function to fetch and display a random quote