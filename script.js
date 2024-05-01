const wrapper = document.querySelector(".wrapper");
const question = document.querySelector(".question");
const gif = document.querySelector(".gif");
const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");
const textBelow = document.querySelector(".text-below");

const predefinedTexts = [
  "No",
];

const MAX_SNOWFLAKES = 50; // Maximum number of snowflakes

let currentIndex = 0;
let lastDisplayedGifUrl = '';

function createSnowflake() {
  const snowflakes = document.querySelectorAll(".snowflake");
  if (snowflakes.length >= MAX_SNOWFLAKES) {
    // If maximum snowflakes reached, exit the function
    return;
  }

  const snowflake = document.createElement("div");
  snowflake.classList.add("snowflake");
  const size = Math.random() * 10 + 5;
  const initialX = Math.random() * window.innerWidth;
  snowflake.style.width = `${size}px`;
  snowflake.style.height = `${size}px`;
  snowflake.style.left = `${initialX}px`;
  snowflake.style.top = `0px`;
  snowflake.style.animationDuration = `${Math.random() * 5 + 5}s`;
  document.getElementById("snow-container").appendChild(snowflake);
}

function createSnowfall() {
  setInterval(createSnowflake, 500);
}

createSnowfall();

yesBtn.addEventListener("click", () => {
  question.innerHTML = "Yay! Now Please read this I'm your Boyfriend now";
  gif.remove();
  yesBtn.style.display = "none";
  noBtn.style.display = "none";
  wrapper.style.display = "flex";
  wrapper.style.flexDirection = "column";
  wrapper.style.alignItems = "center";
  startTypingAnimation();
});

// Array of GIF URLs for 'No' button mouseover
const gifUrls = [
  "https://media.tenor.com/925LDfyVUGEAAAAi/cute-sad.gif",
  "https://media.tenor.com/hLgZBJ7RjzYAAAAi/cute-dog.gif",
  "https://media.tenor.com/2DbtR2cs0-8AAAAi/mimibubu.gif",
  "https://media.tenor.com/wqYFElBnfoYAAAAi/yelynn-yelynnn.gif",
  "https://media.tenor.com/KkDb5-sgVZkAAAAi/sad-anxious.gif",
  "https://media.tenor.com/JQylNRYWG9QAAAAi/sad.gif",
  "https://media.tenor.com/FPzGMNfFGnYAAAAi/cute-cat.gif",
  "https://media.tenor.com/fYlDBJAaG3AAAAAi/tkthao219-bubududu.gif",
  "https://media.tenor.com/kZQ5tEqCoWsAAAAi/sad-boo-sad.gif",
  "https://media.tenor.com/b05cSfPU2VkAAAAi/sad-dp.gif",
  // Add more URLs here...
];

noBtn.addEventListener("mouseover", () => {
  const noBtnRect = noBtn.getBoundingClientRect();
  const maxX = window.innerWidth - noBtnRect.width;
  const maxX = window.innerHeight - noBtnRect.height;
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  noBtn.style.left = randomX + "px;
  noBtn.style.top = randomY + "px;

  if (currentIndex < predefinedTexts.length) {
    noBtn.innerHTML = predefinedTexts[currentIndex];
    if (predefinedTexts[currentIndex] === "No") {
      yesBtn.innerHTML = "Please";
    }
    currentIndex++;
  }

  // Choose a random GIF URL
  const randomGifUrl = gifUrls[Math.floor(Math.random() * gifUrls.length)];

  // Create and display popup GIF
  const popupGif = document.createElement("img");
  popupGif.src = randomGifUrl;
  popupGif.style.position = "fixed";
  popupGif.style.top = Math.random() * window.innerHeight + "px";
  popupGif.style.left = Math.random() * window.innerWidth + "px";
  popupGif.style.width = "100px";
  popupGif.style.height = "100px";
  document.body.appendChild(popupGif);

  // Remove popup GIF after 2 seconds
  setTimeout(() => {
    popupGif.remove();
  }, 2000);

  const currentSize = parseInt(window.getComputedStyle(yesBtn).fontSize);
  const maxSize = 30;
  const newSize = Math.min(currentSize + 2, maxSize);
  yesBtn.style.fontSize = newSize + "px";

  centerYesButton();
});

function centerYesButton() {
  const yesBtnRect = yesBtn.getBoundingClientRect();
  const windowWidth = window.innerWidth;
  const centerX = (windowWidth - yesBtnRect.width) / 2;

  yesBtn.style.right = centerX + "px";

  // Add transition class when centered
  yesBtn.classList.add("centered");
}

window.addEventListener("resize", () => {
  centerYesButton();
});

function startTypingAnimation() {
  const congratsSection = document.querySelector(".congrats-section");
  const congratsText = document.getElementById("congratsText");

  const congratsMessages = [
    "Salamat crush na mahal mo ako",
    "Ako ang magiging loyal Boyfriend mo hangang kamatayan",
  ];

  let currentIndex = 0;

  congratsText.textContent = congratsMessages[currentIndex];
  currentIndex++;

  wrapper.style.display = "none";
  congratsSection.style.display = "block";
}

yesBtn.style.zIndex = "1";
noBtn.style.zIndex = "1";

const hoverTexts = [
  "Please don't do this 🥹",
  "It's your Decision",
  "I have Feelings for you",
  "but Remember this I always Love you",
];

let hoverIndex = 0;

let lastDisplayedIndex = -1;

noBtn.addEventListener("mouseover", () => {
  if (hoverTexts.length > 0) {
    lastDisplayedIndex = (lastDisplayedIndex + 1) % hoverTexts.length;
    textBelow.textContent = hoverTexts[lastDisplayedIndex];
    hoverTexts.splice(lastDisplayedIndex, 1); // Remove the displayed text
    
    // Add fade-in class to display the hover text with fade-in effect
    textBelow.classList.add("fade-in");
  }
});

window.addEventListener("resize", () => {
  centerYesButton();
});
