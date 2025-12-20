let userScore = 0;
let computerScore = 0;
let gameOver = false;

const userDisplay = document.getElementById("userDisplay");
const computerDisplay = document.getElementById("computerDisplay");
const message = document.getElementById("message");
const buttons = document.querySelectorAll(".choice");

const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popupMessage");
const thumbsDown = document.getElementById("thumbsDown");

const emoji = {
    rock: "🪨",
    paper: "📄",
    scissors: "✂️"
};

function play(userChoice) {
    if (gameOver) return;

    const choices = ["rock", "paper", "scissors"];
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    userDisplay.classList.remove("slide-left");
    computerDisplay.classList.remove("slide-right");

    void userDisplay.offsetWidth;
    void computerDisplay.offsetWidth;

    userDisplay.textContent = emoji[userChoice];
    computerDisplay.textContent = emoji[computerChoice];

    userDisplay.classList.add("slide-left");
    computerDisplay.classList.add("slide-right");

    let result = "";

    if (userChoice === computerChoice) {
        result = "It's a Draw 🤝";
    } else if (
        (userChoice === "rock" && computerChoice === "scissors") ||
        (userChoice === "paper" && computerChoice === "rock") ||
        (userChoice === "scissors" && computerChoice === "paper")
    ) {
        result = "You Win 🎉";
        userScore++;
    } else {
        result = "You Lose 😢";
        computerScore++;
    }

    message.textContent = result;

    userDisplay.classList.remove("bounce");
    computerDisplay.classList.remove("bounce");

    void userDisplay.offsetWidth;
    void computerDisplay.offsetWidth;

    if (result.includes("Win")) {
        userDisplay.classList.add("bounce");
    } else if (result.includes("Lose")) {
        computerDisplay.classList.add("bounce");
    } else {
        userDisplay.classList.add("bounce");
        computerDisplay.classList.add("bounce");
    }

    document.getElementById("userScore").innerText = userScore;
    document.getElementById("computerScore").innerText = computerScore;

    checkWinner();
}

function checkWinner() {
    if (userScore === 5 || computerScore === 5) {
        gameOver = true;
        disableButtons();

        if (userScore === 5) {
            popupMessage.innerText = "🎉 You Won the Game!";
            startConfetti();
        } else {
            popupMessage.innerText = "😢 Computer Won the Game!";
            showThumbsDown();
        }

        popup.style.display = "flex";
    }
}

function disableButtons() {
    buttons.forEach(btn => btn.disabled = true);
}

function enableButtons() {
    buttons.forEach(btn => btn.disabled = false);
}

function resetGame() {
    userScore = 0;
    computerScore = 0;
    gameOver = false;

    userDisplay.textContent = "❔";
    computerDisplay.textContent = "❔";
    message.textContent = "Make your move!";

    document.getElementById("userScore").innerText = 0;
    document.getElementById("computerScore").innerText = 0;

    enableButtons();
    stopConfetti();
}

function closePopup() {
    popup.style.display = "none";
    resetGame();
}

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = [];
let confettiActive = false;

function startConfetti() {
    confettiActive = true;
    confetti = [];

    for (let i = 0; i < 200; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 4,
            d: Math.random() * 5 + 2,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`
        });
    }
    animateConfetti();
}

function stopConfetti() {
    confettiActive = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function animateConfetti() {
    if (!confettiActive) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach(c => {
        ctx.beginPath();
        ctx.fillStyle = c.color;
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fill();
        c.y += c.d;
        if (c.y > canvas.height) c.y = -10;
    });

    requestAnimationFrame(animateConfetti);
}

function showThumbsDown() {
    thumbsDown.classList.remove("show-thumbs");
    void thumbsDown.offsetWidth;
    thumbsDown.classList.add("show-thumbs");
}
