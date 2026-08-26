/* =========================================================
   CHESS.COM ARCADE HUB
   ========================================================= */


/* =========================
   TABS
========================= */

let activeGame = "runner";

const tabs = document.querySelectorAll(".tab");
const games = document.querySelectorAll(".game");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const gameName = tab.dataset.game;

    tabs.forEach(t => t.classList.remove("active"));
    games.forEach(g => g.classList.remove("active-game"));

    tab.classList.add("active");

    const selectedGame = document.getElementById(gameName);

    if (selectedGame) {
      selectedGame.classList.add("active-game");
    }

    activeGame = gameName;

    /* Stop games when leaving their tab */

    if (gameName !== "runner") {
      stopRunner();
    }

    if (gameName !== "snake") {
      stopSnake();
    }

    if (gameName !== "cps") {
      stopCPS();
    }

    if (gameName !== "timeattack") {
      stopTimeAttack();
    }
  });
});


/* =========================
   CHESS RUNNER
========================= */

const runnerCanvas = document.getElementById("runnerCanvas");
const rctx = runnerCanvas.getContext("2d");

let knightY = 160;
let velocityY = 0;
let jumping = false;

let spikes = [];
let runnerScore = 0;
let runnerRunning = false;

let runnerBest =
  Number(localStorage.getItem("runnerBest")) || 0;

document.getElementById("runnerBest").textContent = runnerBest;


/* =========================
   RUNNER START
========================= */

function startRunner() {

  if (activeGame !== "runner") return;

  if (runnerRunning) return;

  runnerRunning = true;

  document.getElementById("jumpButton").disabled = false;

  document.getElementById("runnerStart").textContent =
    "RUNNING...";
}


/* =========================
   RUNNER STOP
========================= */

function stopRunner() {

  runnerRunning = false;

  jumping = false;
  velocityY = 0;

  document.getElementById("jumpButton").disabled = true;

  document.getElementById("runnerStart").textContent =
    "START RUNNER";
}


document.getElementById("runnerStart")
  .addEventListener("click", startRunner);

document.getElementById("runnerStop")
  .addEventListener("click", stopRunner);


/* =========================
   JUMP
========================= */

function jump() {

  if (
    activeGame !== "runner" ||
    !runnerRunning
  ) {
    return;
  }

  if (!jumping) {

    velocityY = -13;
    jumping = true;

  }
}


document.getElementById("jumpButton")
  .addEventListener("pointerdown", event => {

    event.preventDefault();

    jump();

  });


document.addEventListener("keydown", event => {

  if (
    activeGame === "runner" &&
    runnerRunning &&
    (
      event.code === "Space" ||
      event.code === "ArrowUp"
    )
  ) {

    event.preventDefault();

    jump();

  }

});


/* =========================
   RESET RUNNER
========================= */

function resetRunner() {

  knightY = 160;
  velocityY = 0;
  jumping = false;

  spikes = [];

  runnerScore = 0;

  document.getElementById("runnerScore").textContent = "0";
}


/* =========================
   UPDATE RUNNER
========================= */

function updateRunner() {

  if (
    activeGame !== "runner" ||
    !runnerRunning
  ) {
    return;
  }


  /* Gravity */

  velocityY += 0.7;
  knightY += velocityY;


  if (knightY >= 160) {

    knightY = 160;
    velocityY = 0;
    jumping = false;

  }


  const displayedScore =
    Math.floor(runnerScore / 5);


  /* Speed increases every 100 points */

  const speedLevel =
    Math.floor(displayedScore / 100);

  const runnerSpeed =
    6 + speedLevel;


  /* =========================
     SPIKE SPAWN
  ========================= */

  const lastSpike =
    spikes[spikes.length - 1];


  /*
     Keep a large minimum distance
     between spikes so combinations
     are actually possible.
  */

  if (
    (!lastSpike || lastSpike.x < 360) &&
    Math.random() < 0.012
  ) {

    spikes.push({

      x: runnerCanvas.width,

      width: 20 + Math.random() * 12

    });

  }


  /* Move spikes */

  spikes.forEach(spike => {

    spike.x -= runnerSpeed;

  });


  /* Remove old spikes */

  spikes =
    spikes.filter(spike =>
      spike.x > -50
    );


  /* Collision */

  for (const spike of spikes) {

    const knightLeft = 65;
    const knightRight = 105;

    const knightBottom =
      knightY + 40;


    if (
      knightRight > spike.x &&
      knightLeft < spike.x + spike.width &&
      knightBottom > 170
    ) {

      gameOverRunner();

      return;

    }

  }


  runnerScore++;


  document.getElementById("runnerScore")
    .textContent =
    Math.floor(runnerScore / 5);

}


/* =========================
   DRAW RUNNER
========================= */

function drawRunner() {

  rctx.clearRect(
    0,
    0,
    runnerCanvas.width,
    runnerCanvas.height
  );


  /* Ground */

  rctx.strokeStyle = "#555";

  rctx.beginPath();

  rctx.moveTo(
    0,
    200
  );

  rctx.lineTo(
    runnerCanvas.width,
    200
  );

  rctx.stroke();


  /* Knight */

  rctx.font = "55px Arial";

  rctx.fillStyle = "white";

  rctx.fillText(
    "♞",
    55,
    knightY + 40
  );


  /* Spikes */

  rctx.fillStyle = "#ff2020";

  spikes.forEach(spike => {

    rctx.beginPath();

    rctx.moveTo(
      spike.x,
      200
    );

    rctx.lineTo(
      spike.x + spike.width / 2,
      160
    );

    rctx.lineTo(
      spike.x + spike.width,
      200
    );

    rctx.fill();

  });

}


/* =========================
   GAME OVER
========================= */

function gameOverRunner() {

  const score =
    Math.floor(runnerScore / 5);


  if (score > runnerBest) {

    runnerBest = score;

    localStorage.setItem(
      "runnerBest",
      runnerBest
    );

    document.getElementById("runnerBest")
      .textContent =
      runnerBest;

  }


  stopRunner();

  resetRunner();


  setTimeout(() => {

    if (activeGame === "runner") {

      alert(
        "GAME OVER!\nScore: " +
        score
      );

    }

  }, 50);

}


/* =========================
   RUNNER LOOP
========================= */

function runnerLoop() {

  updateRunner();

  if (activeGame === "runner") {

    drawRunner();

  }

  requestAnimationFrame(runnerLoop);

}

runnerLoop();


/* =========================
   COLOR SORT
========================= */

const colors = [
  "red",
  "blue",
  "green",
  "yellow"
];

let selectedBall = null;


function startSortGame() {

  const balls =
    document.getElementById("balls");

  balls.innerHTML = "";

  selectedBall = null;

  document.getElementById("sortMessage")
    .textContent = "";


  for (let i = 0; i < 8; i++) {

    const color =
      colors[
        Math.floor(
          Math.random() * colors.length
        )
      ];


    const ball =
      document.createElement("div");

    ball.className = "ball";

    ball.style.background = color;

    ball.dataset.color = color;


    ball.addEventListener("click", () => {

      document.querySelectorAll(".ball")
        .forEach(b =>
          b.classList.remove("selected")
        );

      selectedBall = ball;

      ball.classList.add("selected");

    });


    balls.appendChild(ball);

  }

}


document.querySelectorAll(".zone")
  .forEach(zone => {

    zone.addEventListener("click", () => {

      if (!selectedBall) {

        document.getElementById("sortMessage")
          .textContent =
          "Pick a ball first!";

        return;

      }


      if (
        selectedBall.dataset.color ===
        zone.dataset.color
      ) {

        selectedBall.remove();

        selectedBall = null;

        document.getElementById("sortMessage")
          .textContent =
          "Correct!";


        if (
          document.querySelectorAll(".ball")
            .length === 0
        ) {

          document.getElementById("sortMessage")
            .textContent =
            "YOU SORTED EVERYTHING!";

        }

      } else {

        document.getElementById("sortMessage")
          .textContent =
          "Wrong color!";

      }

    });

  });


document.getElementById("newSortButton")
  .addEventListener(
    "click",
    startSortGame
  );

startSortGame();


/* =========================
   TIME ATTACK
========================= */

let timeAttackScore = 0;
let timeAttackStart = 0;
let timeAttackTimer = null;
let timeAttackRunning = false;


let timeAttackBest =
  Number(
    localStorage.getItem("timeAttackBest")
  ) || 0;


const targetArea =
  document.getElementById("targetArea");


if (timeAttackBest > 0) {

  document.getElementById("timeAttackBest")
    .textContent =
    timeAttackBest.toFixed(2) + "s";

}


/* =========================
   START TIME ATTACK
========================= */

function startTimeAttack() {

  if (activeGame !== "timeattack") {
    return;
  }


  stopTimeAttack();


  timeAttackScore = 0;

  timeAttackRunning = true;

  timeAttackStart =
    performance.now();


  document.getElementById(
    "timeAttackScore"
  ).textContent = "0";


  document.getElementById(
    "timeAttackTime"
  ).textContent = "0.00";


  document.getElementById(
    "timeAttackMessage"
  ).textContent = "";


  spawnTarget();


  timeAttackTimer =
    set
