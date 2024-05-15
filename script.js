const displayText = document.getElementById("text");
const timeCount = document.querySelector(".time span");
const mistakes = document.querySelector(".mistakes span");
const wpm = document.querySelector(".wpm span");
const cpm = document.querySelector(".cpm span");
const input = document.getElementById("input-field");

let timeIntervalId;
let maxTime = 60;
let remainingTime = 60;
let mistakesCount = 0;
let wpmCount = 0;

let charIndex = 0;

let isTyping = false;

const randomText = [
  "As time wore on, simple dog commands turned into full paragraphs explaining why the dog couldn’t do something.",
  "Each person who knows you has a different perception of who you are.",
  "Today arrived with a crash of my car through the garage door.",
  "She wasn't sure whether to be impressed or concerned that he folded underwear in neat little packages.",
  "The balloons floated away along with all my hopes and dreams.",
  "He was 100% into fasting with her until he understood that meant he couldn't eat.",
  "She had that tint of craziness in her soul that made her believe she could actually make a difference.",
  "He wasn't bitter that she had moved on but from the radish.",
  "Stop waiting for exceptional things to just happen.",
  "Tom got a small piece of pie.",
  "Before he moved to the inner city, he had always believed that security complexes were psychological.",
  "She looked at the masterpiece hanging in the museum but all she could think is that her five-year-old could do better.",
  "The murder hornet was disappointed by the preconceived ideas people had of him.",
  "The fox in the tophat whispered into the ear of the rabbit.",
  "Everyone says they love nature until they realize how dangerous she can be.",
  "The fact that there's a stairway to heaven and a highway to hell explains life well.",
  "Buried deep in the snow, he hoped his batteries were fresh in his avalanche beacon.",
  "It isn't true that my mattress is made of cotton candy.",
  "He didn’t want to go to the dentist, yet he went anyway.",
  "He had a vague sense that trees gave birth to dinosaurs.",
  "The beauty of the sunset was obscured by the industrial cranes.",
  "Everybody should read Chaucer to improve their everyday vocabulary.",
  "The llama couldn't resist trying the lemonade.",
];

displayText.addEventListener("click", () => {
  input.focus();
});

input.addEventListener("input", () => {
  typeCheck();
});

document.addEventListener("keydown", () => {
  input.focus();
});

generateRandomPara();

function countTime() {
  if (remainingTime > 0) {
    remainingTime--;
    timeCount.innerText = remainingTime;
    wpmCount = Math.round(
      ((charIndex - mistakesCount) / 5 / (maxTime - remainingTime)) * 60
    );
    wpm.innerText = wpmCount;
    cpm.innerText = charIndex - mistakesCount;
  } else {
    clearInterval(timeIntervalId);
  }
}

function generateRandomPara() {
  displayText.innerHTML = "";
  const randomIndex = Math.floor(Math.random() * randomText.length);
  for (let charText of randomText[randomIndex]) {
    displayText.innerHTML += `<span>${charText}</span>`;
  }
  displayText.querySelectorAll("span")[0].classList.add("active");
}

function typeCheck() {
  const displayChar = displayText.querySelectorAll("span");
  const char = input.value.charAt(charIndex);
  if (charIndex < displayChar.length && remainingTime > 0) {
    if (!isTyping) {
      timeIntervalId = setInterval(countTime, 1000);
      isTyping = true;
    }
    if (char === displayChar[charIndex].innerText) {
      displayChar[charIndex].classList.add("correct");
    } else {
      displayChar[charIndex].classList.add("incorrect");
      mistakesCount++;
    }
    charIndex++;
    if (charIndex < displayChar.length) {
      displayChar[charIndex].classList.add("active");
      mistakes.innerHTML = mistakesCount;
    } else {
      clearInterval(timeIntervalId);
      input.value = "";
    }
  } else {
    clearInterval(timeIntervalId);
    input.value = "";
  }
}

document.querySelector(".try-again-button").addEventListener("click", () => {
  reset();
});

function reset() {
  generateRandomPara();
  remainingTime = maxTime;
  mistakesCount = 0;
  wpmCount = 0;
  charIndex = 0;
  isTyping = false;
  timeCount.innerText = 60;
  mistakes.innerText = 0;
  wpm.innerText = 0;
  cpm.innerText = 0;
  input.value = "";
  clearInterval(timeIntervalId);
}
