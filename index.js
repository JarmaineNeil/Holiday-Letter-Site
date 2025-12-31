const start = document.getElementById('startBtn');

"use client";
import { useState } from "react";

export default function HolidayLetterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  // This function runs when the button is clicked
  async function handleSendLetter() {
    if (!name || !email) {
      setStatus("Please enter your name and email.");
      return;
    }


    setStatus("Sending your letter...");

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("🎄 Your letter has been sent!");
      } else {
        setStatus(`Error: ${data.error || "Something went wrong"}`);
      }
    } catch (err) {
      setStatus(`Error: ${err.message}`);
    }
  }
start.onclick =handleSendLetter();
  return (
  

      

      <p>{status}</p>
    
  );
  
}




// BLINKING HOODIE PENG SCRIPT
const img = document.getElementById("blinkImg");

setInterval(() => {
  img.src = "penguin pics/hoodie_peng-removebg-preview - Copy.png";

  setTimeout(() => {
    img.src = "penguin pics/hoodie_peng-removebg-preview.png";

    setTimeout(() => {
      img.src = "penguin pics/hoodie_peng-removebg-preview - Copy.png";
      setTimeout(() => img.src = "penguin pics/hoodie_peng-removebg-preview.png", 80);
    }, 150);

  }, 100);
}, 2200);

// BLINKING GREETING PENG (MODAL IS HAVING AN EPILEPSY TOO, FML, added preloader, working ?, nope, toss this)


// const img2 = document.getElementById('characterImg');
// const openImg = new Image();
// openImg.src = "greeting_peng-removebg-preview.png";

// const closedImg = new Image();
// closedImg.src = "penguin pics/greeting_peng-removebg-preview - Copy.png";

// setInterval( function(){
//   img2.src = "penguin pics/greeting_peng-removebg-preview - Copy.png"

//   setTimeout(function(){
//     img2.src = "greeting_peng-removebg-preview.png";

//     setTimeout(function(){
//     img2.src = "penguin pics/greeting_peng-removebg-preview - Copy.png";
//     setTimeout(function(){img2.src = "penguin pics/greeting_peng-removebg-preview.png"}, 80)
//     }, 150)
//   }, 100)
// }, 3000)

// setInterval( function(){
//   img2.src = closedImg.src;

//   setTimeout(function(){
//     img2.src = openImg.src;

//     setTimeout(function(){
//     img2.src = closedImg.src;
//     setTimeout(function(){img2.src = openImg.src}, 80)
//     }, 150)
//   }, 100)
// }, 3000)



// MODAL SECTION

start.onclick = function(){
    console.log("Start button working.");
}


// Get elements
const modal = document.getElementById("myModal");
const btn = document.getElementById("startBtn");
const close = document.querySelector(".close");

// Open modal when button clicked
btn.onclick = () => {
  // modal.style.display = "block";

}

// Close modal when X clicked
close.onclick = () => {
  modal.style.display = "none";
}

// Close modal when clicking outside the modal content
window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}

// DIALOGUE

const characterImg = document.getElementById('characterImg');

const dialogues = [
  "You look new, what's your name?",
  "I want to write you a short letter, type in your email so I can send it there.",
  "Give me a sec, I am writing it now..."
];
const images = [
  'penguin pics/greeting_peng-removebg-preview.png',
  'penguin pics/talking_peng-removebg-preview.png',
  'penguin pics/writing_peng-removebg-preview.png'
]
let index = 0;
const text = document.getElementById("dialogueText");

document.getElementById("nextBtn").onclick = () => {
  if (index < dialogues.length - 1) {
    index++;
    text.textContent = dialogues[index];
    characterImg.src = images[index];
  }
};

document.getElementById("backBtn").onclick = () => {
  if (index > 0) {
    index--;
    text.textContent = dialogues[index];
    characterImg.src = images[index];
  }
};

