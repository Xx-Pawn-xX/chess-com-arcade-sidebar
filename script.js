/* =========================================================
   CHESS.COM ARCADE HUB
   ========================================================= */


/* =========================================================
   TABS
   ========================================================= */

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

    /* Stop games that should not continue in background */

    if (gameName !== "runner") {
      stopRunner();
    }

    if (gameName !== "snake") {
      clearInterval(snakeInterval);
    }

    if (gameName !== "cps") {
      clearInterval(cpsInterval);
      cpsRunning = false;
    }

    if (gameName !== "timeattack") {
      stopTimeAttack();
    }
  });
});


/* =========================================================
   CHESS RUNNER
   ========================================================= */

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


/* -------------------------
   START RUNNER
------------------------- */

function startRunner() {

  if (activeGame !== "runner") return;
  if (runnerRunning) return;

  /* Start completely fresh */

  knightY = 160;
  velocityY = 0;
  jumping = false;
  spikes = [];
  runnerScore = 0;

  document.getElementById("runnerScore").textContent = "0";

  runnerRunning = true;

  document.getElementById("jumpButton").disabled = false;

  document.getElementById("runnerStart").textContent =
    "RUNNING...";
}


/* -------------------------
   STOP RUNNER
------------------------- */

function stopRunner() {

  runnerRunning = false;

  knightY = 160;
  velocityY = 0;
  jumping = false;

  spikes = [];

  document.getElementById("jumpButton").disabled = true;

  document.getElementById("runnerStart").textContent =
    "START RUNNER";

  drawRunner();
}


document
  .getElementById("runnerStart")
  .addEventListener("click", startRunner);


document
  .getElementById("runnerStop")
  .addEventListener("click", stopRunner);


/* -------------------------
   JUMP
------------------------- */

function jump() {

  if (activeGame !== "runner") return;
  if (!runnerRunning) return;

  if (!jumping) {

    velocityY = -13;

    jumping = true;
  }
}


document
  .getElementById("jumpButton")
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


/* -------------------------
   UPDATE RUNNER
------------------------- */

function updateRunner() {

  if (!runnerRunning) return;
  if (activeGame !== "runner") return;


  /* Gravity */

  velocityY += 0.7;

  knightY += velocityY;


  /* Ground */

  if (knightY >= 160) {

    knightY = 160;

    velocityY = 0;

    jumping = false;
  }


  /* Current score */

  const score = Math.floor(runnerScore / 5);


  /* Speed increases every 100 score */

  const speedLevel = Math.floor(score / 100);

  const runnerSpeed = 6 + speedLevel;


  /* -------------------------
     SPIKE SPAWNING
  ------------------------- */

  const lastSpike =
    spikes.length > 0
      ? spikes[spikes.length - 1]
      : null;


  /*
     Keep at least 330px between
     spike groups so impossible
     double spikes don't happen.
  */

  if (
    (!lastSpike || lastSpike.x < 330) &&
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

  spikes = spikes.filter(spike => spike.x > -50);


  /* -------------------------
     COLLISION
  ------------------------- */

  for (const spike of spikes) {

    const knightLeft = 65;
    const knightRight = 105;

    const knightBottom = knightY + 40;


    if (
      knightRight > spike.x &&
      knightLeft < spike.x + spike.width &&
      knightBottom > 170
    ) {

      gameOverRunner();

      return;
    }
  }


  /* Score */

  runnerScore++;

  document.getElementById("runnerScore").textContent =
    Math.floor(runnerScore / 5);
}


/* -------------------------
   DRAW RUNNER
------------------------- */

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

  rctx.moveTo(0, 200);

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


/* -------------------------
   GAME OVER
------------------------- */

function gameOverRunner() {

  if (!runnerRunning) return;

  const score =
    Math.floor(runnerScore / 5);


  if (score > runnerBest) {

    runnerBest = score;

    localStorage.setItem(
      "runnerBest",
      runnerBest
    );

    document.getElementById(
      "runnerBest"
    ).textContent = runnerBest;
  }


  stopRunner();


  setTimeout(() => {

    if (activeGame === "runner") {

      alert(
        "GAME OVER!\nScore: " + score
      );
    }

  }, 50);
}


/* -------------------------
   RUNNER LOOP
------------------------- */

function runnerLoop() {

  if (
    activeGame === "runner" &&
    runnerRunning
  ) {

    updateRunner();

    drawRunner();

  }

  requestAnimationFrame(runnerLoop);
}


runnerLoop();


/* =========================================================
   COLOR SORT
   ========================================================= */

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

  document.getElementById(
    "sortMessage"
  ).textContent = "";


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

      document
        .querySelectorAll(".ball")
        .forEach(b =>
          b.classList.remove("selected")
        );


      selectedBall = ball;

      ball.classList.add("selected");

    });


    balls.appendChild(ball);
  }
}


document
  .querySelectorAll(".zone")
  .forEach(zone => {

    zone.addEventListener("click", () => {

      if (!selectedBall) {

        document.getElementById(
          "sortMessage"
        ).textContent =
          "Pick a ball first!";

        return;
      }


      if (
        selectedBall.dataset.color ===
        zone.dataset.color
      ) {

        selectedBall.remove();

        selectedBall = null;

        document.getElementById(
          "sortMessage"
        ).textContent =
          "Correct!";


        if (
          document.querySelectorAll(".ball")
            .length === 0
        ) {

          document.getElementById(
            "sortMessage"
          ).textContent =
            "YOU SORTED EVERYTHING!";
        }

      } else {

        document.getElementById(
          "sortMessage"
        ).textContent =
          "Wrong color!";
      }

    });

  });


document
  .getElementById("newSortButton")
  .addEventListener(
    "click",
    startSortGame
  );


startSortGame();


/* =========================================================
   TIME ATTACK
   ========================================================= */

let timeAttackScore = 0;
let timeAttackStart = 0;
let timeAttackTimer = null;
let timeAttackRunning = false;


let timeAttackBest =
  Number(
    localStorage.getItem(
      "timeAttackBest"
    )
  ) || 0;


const targetArea =
  document.getElementById(
    "targetArea"
  );


if (timeAttackBest > 0) {

  document.getElementById(
    "timeAttackBest"
  ).textContent =
    timeAttackBest.toFixed(2) + "s";
}


function startTimeAttack() {

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
    setInterval(() => {

      if (!timeAttackRunning) return;

      const elapsed =
        (
          performance.now() -
          timeAttackStart
        ) / 1000;


      document.getElementById(
        "timeAttackTime"
      ).textContent =
        elapsed.toFixed(2);

    }, 20);
}


function spawnTarget() {

  if (!timeAttackRunning) return;


  targetArea.innerHTML = "";


  const target =
    document.createElement("div");


  target.className = "target";


  const maxX =
    Math.max(
      0,
      targetArea.clientWidth - 35
    );


  const maxY =
    Math.max(
      0,
      targetArea.clientHeight - 35
    );


  target.style.left =
    Math.random() * maxX + "px";


  target.style.top =
    Math.random() * maxY + "px";


  target.addEventListener(
    "pointerdown",
    event => {

      event.preventDefault();

      if (!timeAttackRunning) return;


      timeAttackScore++;


      document.getElementById(
        "timeAttackScore"
      ).textContent =
        timeAttackScore;


      if (timeAttackScore >= 30) {

        finishTimeAttack();

      } else {

        spawnTarget();
      }

    }
  );


  targetArea.appendChild(target);
}


function finishTimeAttack() {

  if (!timeAttackRunning) return;


  const finalTime =
    (
      performance.now() -
      timeAttackStart
    ) / 1000;


  timeAttackRunning = false;


  clearInterval(timeAttackTimer);

  timeAttackTimer = null;


  targetArea.innerHTML = "";


  document.getElementById(
    "timeAttackMessage"
  ).textContent =
    "FINISHED! " +
    finalTime.toFixed(2) +
    " seconds";


  if (
    timeAttackBest === 0 ||
    finalTime < timeAttackBest
  ) {

    timeAttackBest = finalTime;


    localStorage.setItem(
      "timeAttackBest",
      timeAttackBest
    );


    document.getElementById(
      "timeAttackBest"
    ).textContent =
      timeAttackBest.toFixed(
