import './style.css';

const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const bird = document.getElementById("bird");

const scoreText = document.getElementById("scoreText");
let score = 0;
setText("Click to Start!");

let isJumping = false;
let gameOver = true;

document.addEventListener('mousedown', jump);

setInterval(function () { Main()}, 10);

function Main() {
    if(gameOver == false) {
        score = score + 1;
        setText("Score: " + score);
        checkGameOver();
    }
}

function jump() {
    if(gameOver === false) {
        if(isJumping == false) {
            isJumping = true;
            dino?.classList.add("jump");
            setTimeout(() => {
                dino?.classList.remove("jump");
                isJumping = false;
            }, 500);
        }
    }
    else {
        startGame();
    }   
}

function removeObstacles() {
    cactus?.classList.remove("cactusMove");
    bird?.classList.remove("birdMove");
}

function checkGameOver() {
    if(gameOver == false && dino != null && cactus != null && bird != null) {
        //get is dinosaur jumping
        let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));

        //get cactus position
        let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

        //get bird position
        let birdLeft = parseInt(window.getComputedStyle(bird).getPropertyValue("left"));

        //detect cactus collision
        if(dinoTop >= 150 && Math.abs(cactusLeft) < 7) {
            //end game
            endGame();
            
            //reset cactus
            removeObstacles();
        }

        //detect bird collision
        if(dinoTop <= 55 && Math.abs(birdLeft) < 11) {
            //end game
            endGame();
            
            //reset cactus
            removeObstacles();
        }
    }
}

function startGame() {
    console.log("Game Started!");
    gameOver = false;
    score = 0;
    cactus?.classList.add("cactusMove");
    bird?.classList.add("birdMove");
}

function endGame() {
    console.log("Player Died!");
    setText("Final Score: " + score + "! Click To Play Again!");
    gameOver = true;
}

function setText(s: string) {
    if(scoreText) {
        scoreText.textContent = s;
    }
}
