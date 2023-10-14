//purposely bad code so students can fix it - can make it worse

import "./style.css";

const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const bird = document.getElementById("bird");

const dinoCac: number = 150;
const cactusColl: number = 7;
const dinoBird: number = 55;
const birdColli: number = 11;

const scoreText = document.getElementById("scoreText");
let score = 0;
setText("click to start!");

var isJumping = false;
let gameOver = true;

document.addEventListener("mousedown", () => jump());

setInterval(function () {
  Main();
}, 10);

function Main() {
  if (gameOver == false) {
    score += 1;
    setText("Score: " + score);

    requestAnimationFrame(checkGameOver);
    checkGameOver();
  }
}

function jump() {
  if (gameOver === false) {
    if (isJumping == false) {
      isJumping = true;
      dino?.classList.add("jump");
      setTimeout(RemoveJump, 500);
    }
  } else {
    startGame();
  }
}

function RemoveJump() {
  dino?.classList.remove("jump");
  isJumping = false;
  //mainLoop = mainLoop //bug fix?
}

function RemoveObstacles() {
  cactus?.classList.remove("cactusMove");
  bird?.classList.remove("birdMove");
}

function GetPosition(object: HTMLElement, position: string) {
  return parseInt(window.getComputedStyle(object).getPropertyValue(position));
}

function checkGameOver() {
  if (gameOver == false && dino != null && cactus != null && bird != null) {
    //get is dinosaur jumping
    let dinoTop = GetPosition(dino, "top");

    //get cactus position
    let cactusLeft = GetPosition(cactus, "left");

    //get bird position
    let birdLeft = GetPosition(bird, "left");

    //detect cactus collision
    if (dinoTop >= dinoCac && Math.abs(cactusLeft) < cactusColl) {
      //end game
      console.log("player died!");
      setText("Final Score: " + score + "! Click To Play Again!");
      gameOver = true;

      //reset player
      RemoveJump();

      //reset cactus
      RemoveObstacles();
    }

    //detect bird collision
    if (dinoTop <= dinoBird && Math.abs(birdLeft) < birdColli) {
      //end game
      console.log("player died!");
      setText("Final Score: " + score + "! Click To Play Again!");
      gameOver = true;

      //reset player
      RemoveJump();

      //reset cactus
      RemoveObstacles();
    }
  }
}

function startGame() {
  console.log("Game started!");
  gameOver = false;
  score = 0;
  cactus?.classList.add("cactusMove");
  bird?.classList.add("birdMove");
}

function setText(s: string) {
  if (scoreText) {
    scoreText.textContent = s;
  }
}
