// set up your MapTiler API key
const mapTilerApiKey = 'fTrfhmecGYQKQR3VlHwn';

// initialize the Leaflet map
const map = L.map('map').setView([37.772537, -122.420679], 2);

// add MapTiler tile layer
L.tileLayer(`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${mapTilerApiKey}`, {
  attribution: '&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
  maxZoom: 18,
}).addTo(map);

// defines variables
let currentCountry = null;
let currentImageIndex = 0;
let lives = 3;
let score = 0;
let countryHighlight = null;
let resultPopup = null;

//list of countries (temporary)
const countries = [
  {
    name: "Japan",//
    images: [
      "images/japanL.jpg", //landscape
      "images/foodJapan.jpg", //food
      "images/JapanFlag.png" //flag
    ],
    coordinates: { lat: 36.2048, lng: 138.2529 }  // latitude and longitude for Japan
  },
  {
    name: "China",//
    images: [
      "images/chinaL.jpg", //landscape
      "images/chinaFood.jpg", //food
      "images/chinaFlag.png" //flag
    ],
    coordinates: { lat: 35.8617, lng: 104.1954 }
  },
  {
    name: "Honduras",//
    images: [
      "images/hondurasL.jpg",
      "images/foodHonduran.jpg",
      "images/flagHonduras.png"
    ],
    coordinates: { lat: 15.2000, lng: -86.2419 }

  },
  {
    name: "Vietnam",//
    images: [
      "images/vietnamL.jpg",
      "images/foodVietnam.jpg",
      "images/flagVietnam.png"
    ],
    coordinates: { lat: 14.0583, lng: 108.2772 }
  },
  {
    name: "Thailand",//
    images: [
      "images/ThailandL.jpg",
       "images/foodThai.jpg",
      "images/flagThai.webp"
    ],
    coordinates: { lat: 15.8700, lng: 100.9925 }
  },
  {
    name: "Egypt",//
    images: [
      "images/EgyptL.webp",
      "images/foodEgypt.jpg",
      "images/FlagEgypt.png"
    ],
    coordinates: { lat: 26.8206, lng: 30.8025 }
  },
  {
    name: "Canada",//
    images: [
      "images/canadaL.jpg",
      "images/foodCanada.webp",
      "images/flagCanada.webp"
    ],
    coordinates: { lat: 56.1304, lng: -106.3468 }
  },
  {
    name: "United States",//
    images: [
      "images/usL.jpg",
      "images/foodUs.jpg",
      "images/flagUS.png"
    ],
    coordinates: { lat: 37.0902, lng: -95.7129 }
  },
  {
    name: "South Korea",//
    images: [
      "images/skL.jpg",
      "images/foodSk.jpeg",
      "images/flagSk.png"
    ],
    coordinates: { lat: 35.9078, lng: 127.7669 }
  },
  {
    name: "Australia",//
    images: [
      "images/austrialiaL.jpeg",
      "images/foodAustralia.jpg",
      "images/flagAustralia.png"
    ],
    coordinates: { lat: -25.2744, lng: 133.7751 }
  },
  {
    name: "United Kingdom",//
    images: [
      "images/ukL.jpg",
      "images/foodUk.jpeg",
      "images/flagUK.png"
    ],
    coordinates: { lat: 55.3781, lng: -3.4360 }
  },
  {
    name: "Ireland",//
    images: [
      "images/irelandL.webp",
      "images/foodIreland.jpg",
      "images/flagIreland.webp"
    ],
    coordinates: { lat: 53.4129, lng: -8.2439 }
  },
  {
    name: "Sweden",//
    images: [
      "images/swedenL.jpg",
      "images/foodSweden.jpg",
      "images/flagSweden.png"
    ],
    coordinates: { lat: 60.1282, lng: 18.6435 }
  },
  {
    name: "India",//
    images: [
      "images/indiaL.jpg",
      "images/foodIndia.jpg",
      "images/flagIndia.png"
    ],
    coordinates: { lat: 20.5937, lng: 78.9629 }
  },
  {
    name: "France",//
    images: [
      "images/franceL.jpg",
      "images/foodFrance.webp",
      "images/flagFrance.png"
    ],
    coordinates: { lat: 46.6034, lng: 1.8883 }
  },
  {
    name: "Italy",//
    images: [
      "images/ItalyL.avif",
      "images/foodItaly.jpeg",
      "images/flagItaly.png"
    ],
    coordinates: { lat: 41.8719, lng: 12.5674 }
  },
  {
    name: "Mexico",//
    images: [
      "images/mexicoL.jpg",
      "images/foodMexico.jpeg",
      "images/flagMexico.png"
    ],
    coordinates: { lat: 23.6345, lng: -102.5528 }
  },
  {
    name: "Brazil",//
    images: [
      "images/brazilL.jpeg",
      "images/foodBrazil.jpg",
      "images/flagBrazil.webp"
    ],
    coordinates: { lat: -14.2350, lng: -51.9253 }

  },
  {
    name: "Pakistan",//
    images: [
      "images/pakistanL.jpg",
      "images/foodPakistan.png",
      "images/flagPakistan.png"
    ],
    coordinates: { lat: -18.7669, lng: 46.8691 }
  },
  {
    name: "Madagascar", //
    images: [
      "images/madagascarL.avif",
      "images/foodMadagascar.webp",
      "images/flagMadagascar.png"
    ],
  },
];

// open "How to Play" popup when the page loads
function openPopup() {
  const item = document.getElementById("howToPlayPopup");
  if (item !== null){
    item.style.display = "flex";
  }
}

// close popup and start game
function closePopupAndStartGame() {
  document.getElementById("howToPlayScreen").style.display = "none";
  startGame(); // start the game after closing the popup
}

//start game function
function startGame() {
  lives = 3;
  score = 0;
  currentImageIndex = 0;

  //picks random country 
  currentCountry = countries[Math.floor(Math.random() * countries.length)];
  
  //display the first image
  showImage();


  //hide the start button and show the first image and guess button
document.querySelector(".start-button").style.display = "none";

}

function showImage() {
  // get the image element for the first box
  const imageElement = document.getElementById("image1");
  // set the source to the first image of the current country
  if (currentCountry) {
      imageElement.src = currentCountry.images[0];
  }
}

// function to reveal images in the second and third boxes

function revealImage(index) {
  if (index < currentCountry.images.length) {
      const imageId = index === 1 ? "image2" : "image3";
      const imageElement = document.getElementById(imageId);
      imageElement.src = currentCountry.images[index];
      
      const buttonElement = imageElement.nextElementSibling;
        if (buttonElement && buttonElement.classList.contains('reveal-button')) {
            buttonElement.remove();
  }}
}
//function that resets game
function resetGame(){
  //hide the guess and new image button and show the start button
  document.querySelector(".start-button").style.display = "inline-block";
  //resets the image and game variables
  currentCountry = null;
  currentImageIndex = 0;
  lives = 3;

  //set the images in box2 and box3 to the default question mark
  document.getElementById("image2").src = "images/questionMark.jpeg";
  document.getElementById("image3").src = "images/questionMark.jpeg";

}


function disableButtons() {
  document.querySelector(".new-image-button").disabled = true;
}

//map functions
map.on('click', function (e) {
  if (!currentCountry) {
      alert("Please start the game first!");
      return;
  }

  lastClickedCoords = e.latlng;

  // highlight
  if (countryHighlight) {
      map.removeLayer(countryHighlight);
  }

  countryHighlight = L.circle([e.latlng.lat, e.latlng.lng], {
      color: 'blue',
      fillColor: '#3388ff',
      fillOpacity: 0.4,
      radius: 50000  
  }).addTo(map);
  document.getElementById("confirmButton").style.display = "inline-block";
});

//confirm guess 

const tolerance = 500;

function confirmGuess() {
  if (!lastClickedCoords || !currentCountry) return;

  const distance = map.distance(
      [lastClickedCoords.lat, lastClickedCoords.lng],
      [currentCountry.coordinates.lat, currentCountry.coordinates.lng]
  ) / 1000;

  const resultMessage = (distance <= tolerance) ? 
      "Correct! You've guessed the country!" : 
      `Incorrect! The correct answer was ${currentCountry.name}.`;

  document.getElementById("resultMessage").innerText = resultMessage;
  document.getElementById("resultPopup").style.display = "flex";

  document.getElementById("confirmButton").style.display = "none";
}

function closeResultPopup() {
  document.getElementById("resultPopup").style.display = "none";
  if (lives > 0) startGame();
}


function enableNexButton(nextButtonId){
  const currentButton = event.target;
  currentButton.classList.add('disabled');
  currentButton.disabled = true;

  const nextButton = document.getElementById(nextButtonId);
  nextButton.classList.remove('disabled');
  nextButton.disabled = false;
}