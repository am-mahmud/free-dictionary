// Date and Time Function

function updateDateTime() {
    const now = new Date();

    // Get day of the week
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = days[now.getDay()];

    // Get date components
    const dayOfMonth = now.getDate();
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthName = months[now.getMonth()]; // Get full month name
    const year = now.getFullYear();

    // Get time components
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Format time for AM/PM display
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'

    // Add leading zeros for single-digit minutes and seconds
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

    // Construct the display string
    //const dateTimeString = `${dayOfWeek} ${monthName} ${dayOfMonth}, ${year} ${hours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
    const dateTimeString = `${dayOfWeek} ${monthName} ${dayOfMonth}, ${year}`;

    // Update the HTML element
    document.getElementById('datetime').textContent = dateTimeString;
}

// Word search form 
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('submit clicked');
    const searchInput = document.getElementById("default-search");
    const inputValue = searchInput.value;

    // if(inputValue){
    //     loadDictionary(inputValue)
    // }

    loadDictionary(inputValue);

})

// Dictionary API
const loadDictionary = async (word) => {
  const response =  await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
  const data = await response.json()
//   console.log(data);
//   getWordInfo(data[0])

  if (Array.isArray(data)) {
    getWordInfo(data[0]);
  } else {
    const wordDetail = document.getElementById("word-details");
    wordDetail.innerHTML = `
     Oops! Word not found
    `;
  }
} 
 

// Word Display
const getWordInfo = (wordData) => {
    console.log(wordData.word); 

    const wordDetail = document.getElementById("word-details");
    const wordContainer = document.getElementById("word-container");

    wordDetail.innerHTML = `
        <div>
           <h1 class="capitalize">${wordData.word}</h1>
           <p><strong>Phonetics:</strong> ${wordData.phonetics[0].text}</p>
           <p><strong>Part of Speech:</strong> ${wordData.meanings[0].partOfSpeech}</p>
           <p><strong>Definition:</strong> ${wordData.meanings[0].definitions[0].definition}</p>
        </div>
    `;
    wordContainer.appendChild(wordDetail);
}
 

// Call the function once to display immediately
updateDateTime();

// Update the time every second
setInterval(updateDateTime, 1000);
