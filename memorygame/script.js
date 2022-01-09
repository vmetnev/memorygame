"use strict";

document.addEventListener("DOMContentLoaded", () => {
  let grid = document.querySelector(".grid");
  let progressingScore = document.getElementById("progress");
  let status = document.getElementById("status");
  status.innerHTML = " Playing";
  let btnRestart = document.getElementById("btn-restart");
  btnRestart.addEventListener("click", startGame);

  let open = 0;
  let score = 0;
  let scope = {};
  let output = []; // mac lenght 16 0-15
  let myBoard = [];
  let previousCard = false;
  let previousID = false;
  let waitTransitionComplete = true;

  // Card Options
  const source = [
    {
      name: "sovynia",
      img: "img/7.jpg",
    },
    {
      name: "krosh",
      img: "img/2.png",
    },
    {
      name: "kopatych",
      img: "img/3.png",
    },
    {
      name: "ezh",
      img: "img/4.png",
    },
    {
      name: "baran",
      img: "img/5.jpg",
    },
    {
      name: "svinka",
      img: "img/6.jpg",
    },
    {
      name: "karkarych",
      img: "img/8.png",
    },
    {
      name: "pigvin",
      img: "img/9.png",
    },
    {
      name: "losyash",
      img: "img/10.png",
    },
  ];

  startGame();

  function startGame() {
    previousCard = false;
    status.innerHTML = " Playing";
    previousID = false;
    waitTransitionComplete = true;
    open = 0;
    score = 0;
    scope = {};
    output = []; // mac lenght 16 0-15
    myBoard = [];
    progressingScore.innerHTML = "0 из 16";
    createBoard();
    generateOutput();
  }

  // Create game board
  function createBoard() {
    while (grid.firstChild) {
      grid.removeChild(grid.firstChild);
    }

    for (let i = 0; i < 16; i++) {
      let card = document.createElement("img");
      card.setAttribute("src", "img/blank.jpg");
      card.setAttribute("data-id", i);
      card.setAttribute("width", 100);
      card.setAttribute("height", 100);
      card.addEventListener("click", flipCard);
      grid.appendChild(card);
    }
  }

  function generateOutput() {
    let counter = -1;

    while (counter < 15) {
      let picture = source[rnd(0, source.length - 1)];
      output[uniqueID(0, 15)] = picture;
      output[uniqueID(0, 15)] = picture;
      counter++;
      counter++;
    }
    //console.log(output);
  }

  function uniqueID(min, max) {
    let thisCounter = 0;
    let contender = 0;
    do {
      contender = rnd(min, max);
      thisCounter++;
    } while (scope[contender] === true || thisCounter === 100);
    scope[contender] = true;
    return contender;
  }

  function rnd(min, max) {
    return min + Math.round(Math.random() * max);
  }

  function flipCard() {
    let e = this.src.toString();
    console.log(e);
    let newID = this.getAttribute("data-id");
    let service = "ongoing";

    console.log(
      `previousID = ${previousID} previous card = ${previousCard} newID = ${newID}`
    );

    if (this.src.toString().includes("yes")) {
      service = "completed";
    }

    if (
      this.src.toString().includes("blank") &&
      previousCard === false &&
      waitTransitionComplete === true
    ) {
      console.log("service blank previous none");
      this.setAttribute("src", output[this.getAttribute("data-id")].img);
      previousID = this.getAttribute("data-id");
      previousCard = true;
      service = "completed";
    }

    if (
      service === "ongoing" &&
      previousCard === true &&
      newID === previousID &&
      waitTransitionComplete === true
    ) {
      console.log("service the same previously opened card to blank");
      previousID = -1;
      previousCard = false;
      this.setAttribute("src", "img/blank.jpg");
      service = "completed";
    }
    console.log(output[newID].name);
    console.log(output[previousID].name);

    if (
      service === "ongoing" &&
      previousCard === true &&
      waitTransitionComplete === true
    ) {
      console.log("service the new blank while other card opened");
      this.setAttribute("src", output[this.getAttribute("data-id")].img);

      if (
        e.includes("blank") &&
        output[newID].name === output[previousID].name &&
        waitTransitionComplete === true
      ) {
        console.log(this.src.toString());

        // both cards coinsided - to yes
        console.log("both cards coinsided");
        score++;
        score++;
        waitTransitionComplete = false;
        setTimeout(() => {
          let toYes = document.querySelector(`[data-id="${previousID}"]`);
          toYes.setAttribute("src", "img/yes.png");
          //toYes.style = "border: 1px solid green";
          toYes = document.querySelector(`[data-id="${newID}"]`);
          toYes.setAttribute("src", "img/yes.png");
          //toYes.style = "border: 1px solid green";
          previousID = -1;
          previousCard = false;
          waitTransitionComplete = true;
        }, 1000);
      } else {
        console.log(this.src.toString());
        console.log("both cards did not coinside");
        console.log(`previous id is ${previousID}`);
        waitTransitionComplete = false;
        let toYes = document.querySelector(`[data-id="${previousID}"]`);
        //toYes.style = "border: 1px solid red";
        toYes = document.querySelector(`[data-id="${newID}"]`);
        //toYes.style = "border: 1px solid red";
        setTimeout(() => {
          let toYes = document.querySelector(`[data-id="${previousID}"]`);
          toYes.setAttribute("src", "img/blank.jpg");
          //toYes.style = "border: 1px solid grey";
          toYes = document.querySelector(`[data-id="${newID}"]`);
          //toYes.style = "border: 1px solid grey";
          toYes.setAttribute("src", "img/blank.jpg");
          previousID = -1;
          previousCard = false;
          waitTransitionComplete = true;
        }, 1000);
      }

      console.log(`newid name is ${output[newID].name}`);
      console.log(`previous card name is ${output[previousID].name}`);
    }

    if (score < 16) {
      progressingScore.innerHTML = `${score} из 16`;
    } else {
      status.innerHTML = " Finished";
      progressingScore.innerHTML = "16 из 16";
    }
  }
});
