/* ========================================
   CHESS.COM ARCADE HUB — SCRIPT.JS V2
======================================== */


/* =========================
   TAB SYSTEM
========================= */

let activeGame = "runner";

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {

    document.querySelectorAll(".tab").forEach(t =>
      t.classList.remove("active")
    );

    document.querySelectorAll(".game").forEach(game =>
      game.classList.remove("active-game")
    );

    tab.classList.add("active");

    activeGame = tab.dataset.game;

    document
      .getElementById(activeGame)
      .classList.add("active-game");

  });
});


/* =========================
   CHESS RUNNER
========================= */

const runnerCanvas = document.getElementById("runnerCanvas");
const rctx = runnerCanvas.getContext("2d");

runnerCanvas.width = 600;
runnerCanvas.height = 220;

let knightY = 160;
let velocityY = 0;
const gravity = 0.7;

let jumping = false;
let spikes = [];

let runnerScore = 0;
let runnerRunning = true;

let runnerBest =
  Number(localStorage.getItem("runnerBest")) || 0;

document.getElementById("runnerBest").textContent =
  runnerBest;


/* JUMP */

function jump() {

  if (activeGame !== "runner") return;

  if (!jumping && runnerRunning) {
    velocityY = -13;
    jumping = true;
  }
}


/* Touch / mouse button */

const jumpButton =
  document.getElementById("jumpButton");

jumpButton.addEventListener("pointerdown", event => {
  event.preventDefault();
  jump();
});


/* Keyboard */

document.addEventListener("keydown", event => {

  if (
    activeGame === "runner" &&
    (
      event.code === "Space" ||
      event.code === "ArrowUp"
    )
  ) {
    event.preventDefault();
    jump();
  }

});


function resetRunner() {

  knightY = 160;
  velocityY = 0;

  spikes = [];

  runnerScore = 0;

  runnerRunning = true;

  document.getElementById("runnerScore").textContent = 0;
}


function updateRunner() {

  /* PAUSE WHEN NOT VIEWING RUNNER */

  if (activeGame !== "runner") return;

  if (!runnerRunning) return;


  velocityY += gravity;
  knightY += velocityY;


  if (knightY >= 160) {

    knightY = 160;
    velocityY = 0;
    jumping = false;

  }


  /* Random spikes */

  if (Math.random() < 0.018) {

    spikes.push({
      x: 600,
      width: 20 + Math.random() * 15
    });

  }


  spikes.forEach(spike => {
    spike.x -= 6;
  });


  spikes = spikes.filter(spike =>
    spike.x > -50
  );


  /* Collision */

  for (const spike of spikes) {

    const knightLeft = 70;
    const knightRight = 110;
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


  runnerScore++;

  document.getElementById("runnerScore").textContent =
    Math.floor(runnerScore / 5);

}


function drawRunner() {

  rctx.clearRect(
    0,
    0,
    runnerCanvas.width,
    runnerCanvas.height
  );


  /* Ground */

  rctx.strokeStyle = "#444";

  rctx.beginPath();

  rctx.moveTo(0, 200);
  rctx.lineTo(600, 200);

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


function gameOverRunner() {

  runnerRunning = false;

  const finalScore =
    Math.floor(runnerScore / 5);


  if (finalScore > runnerBest) {

    runnerBest = finalScore;

    localStorage.setItem(
      "runnerBest",
      runnerBest
    );

    document
      .getElementById("runnerBest")
      .textContent =
      runnerBest;

  }


  setTimeout(() => {

    if (activeGame === "runner") {
      alert(
        "GAME OVER!\nScore: " +
        finalScore
      );
    }

    resetRunner();

  }, 100);

}


function runnerLoop() {

  updateRunner();

  /*
    Only redraw the runner
    while it is open.
  */

  if (activeGame === "runner") {
    drawRunner();
  }

  requestAnimationFrame(runnerLoop);

}

runnerLoop();


/* =========================
   COLOR SORT
========================= */

const sortColors = [
  "red",
  "blue",
  "green",
  "yellow"
];


function startSortGame() {

  const balls =
    document.getElementById("balls");

  balls.innerHTML = "";

  document
    .getElementById("sortMessage")
    .textContent = "";


  const gameBalls = [];


  for (let i = 0; i < 8; i++) {

    gameBalls.push(
      sortColors[
        Math.floor(
          Math.random() *
          sortColors.length
        )
      ]
    );

  }


  gameBalls.forEach(color => {

    const ball =
      document.createElement("div");

    ball.className = "ball";

    ball.style.background = color;

    ball.draggable = true;

    ball.dataset.color = color;


    ball.addEventListener(
      "dragstart",
      event => {

        event.dataTransfer.setData(
          "color",
          color
        );

        window.draggedBall = ball;

      }
    );


    balls.appendChild(ball);

  });

}


document
  .querySelectorAll(".zone")
  .forEach(zone => {

    zone.addEventListener(
      "dragover",
      event => event.preventDefault()
    );


    zone.addEventListener(
      "drop",
      event => {

        event.preventDefault();

        const color =
          event.dataTransfer.getData("color");


        if (
          color === zone.dataset.color &&
          window.draggedBall
        ) {

          window.draggedBall.remove();

          document
            .getElementById("sortMessage")
            .textContent =
            "Correct!";


          if (
            document
              .getElementById("balls")
              .children.length === 0
          ) {

            document
              .getElementById("sortMessage")
              .textContent =
              "YOU SORTED EVERYTHING!";

          }

        } else {

          document
            .getElementById("sortMessage")
            .textContent =
            "Wrong color!";

        }

      }
    );

  });


startSortGame();


/* =========================
   EMOJI LUCK
========================= */

const emojis = [
  "♟",
  "♞",
  "👑",
  "🔥",
  "💎",
  "⚡",
  "🍕",
  "🚀"
];

let emojiScore = 0;


document
  .getElementById("spinButton")
  .addEventListener("click", () => {

    const result = [];


    for (let i = 0; i < 3; i++) {

      result.push(
        emojis[
          Math.floor(
            Math.random() *
            emojis.length
          )
        ]
      );

    }


    document.getElementById("slot1").textContent =
      result[0];

    document.getElementById("slot2").textContent =
      result[1];

    document.getElementById("slot3").textContent =
      result[2];


    let points = 0;


    if (
      result[0] === result[1] &&
      result[1] === result[2]
    ) {

      points = 100;

      document
        .getElementById("emojiMessage")
        .textContent =
        "JACKPOT +100";

    } else if (
      result[0] === result[1] ||
      result[1] === result[2] ||
      result[0] === result[2]
    ) {

      points = 20;

      document
        .getElementById("emojiMessage")
        .textContent =
        "PAIR +20";

    } else {

      document
        .getElementById("emojiMessage")
        .textContent =
        "No match...";

    }


    emojiScore += points;

    document
      .getElementById("emojiScore")
      .textContent =
      emojiScore;

  });


/* =========================
   SNAKE
========================= */

const snakeCanvas =
  document.getElementById("snakeCanvas");

const sctx =
  snakeCanvas.getContext("2d");

snakeCanvas.width = 400;
snakeCanvas.height = 400;

let snake;
let food;

let snakeDX = 20;
let snakeDY = 0;

let snakeGame;


function startSnake() {

  clearInterval(snakeGame);


  snake = [
    {
      x: 200,
      y: 200
    }
  ];


  food = randomFood();


  snakeDX = 20;
  snakeDY = 0;


  document
    .getElementById("snakeScore")
    .textContent = 0;


  drawSnake();


  snakeGame =
    setInterval(
      updateSnake,
      120
    );

}


function randomFood() {

  return {

    x:
      Math.floor(
        Math.random() * 20
      ) * 20,

    y:
      Math.floor(
        Math.random() * 20
      ) * 20

  };

}


function snakeDirection(dir) {

  if (!snake) return;


  if (
    dir === "up" &&
    snakeDY === 0
  ) {

    snakeDX = 0;
    snakeDY = -20;

  }


  if (
    dir === "down" &&
    snakeDY === 0
  ) {

    snakeDX = 0;
    snakeDY = 20;

  }


  if (
    dir === "left" &&
    snakeDX === 0
  ) {

    snakeDX = -20;
    snakeDY = 0;

  }


  if (
    dir === "right" &&
    snakeDX === 0
  ) {

    snakeDX = 20;
    snakeDY = 0;

  }

}


function updateSnake() {

  const head = {

    x:
      snake[0].x +
      snakeDX,

    y:
      snake[0].y +
      snakeDY

  };


  /* Wall collision */

  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= 400 ||
    head.y >= 400
  ) {

    clearInterval(snakeGame);

    alert("GAME OVER!");

    return;

  }


  /* Self collision */

  if (
    snake.some(part =>
      part.x === head.x &&
      part.y === head.y
    )
  ) {

    clearInterval(snakeGame);

    alert("GAME OVER!");

    return;

  }


  snake.unshift(head);


  if (
    head.x === food.x &&
    head.y === food.y
  ) {

    food = randomFood();

    document
      .getElementById("snakeScore")
      .textContent =
      snake.length - 1;

  } else {

    snake.pop();

  }


  drawSnake();

}


function drawSnake() {

  sctx.clearRect(
    0,
    0,
    400,
    400
  );


  sctx.fillStyle = "#ff2020";


  snake.forEach(part => {

    sctx.fillRect(
      part.x,
      part.y,
      18,
      18
    );

  });


  sctx.fillStyle = "#ffffff";

  sctx.fillRect(
    food.x,
    food.y,
    18,
    18
  );

}


/* =========================
   REACTION TEST
========================= */

let reactionStart = 0;
let reactionTimeout;
let reactionReady = false;


document
  .getElementById("reactionButton")
  .addEventListener(
    "click",
    startReaction
  );


document
  .getElementById("reactionBox")
  .addEventListener(
    "click",
    reactionClick
  );


function startReaction() {

  reactionReady = false;


  const box =
    document.getElementById(
      "reactionBox"
    );


  box.style.background = "#161616";

  box.textContent = "WAIT...";


  clearTimeout(reactionTimeout);


  reactionTimeout =
    setTimeout(() => {

      reactionReady = true;

      reactionStart =
        Date.now();


      box.style.background =
        "#ff2020";


      box.textContent =
        "CLICK!";

    },
    1000 + Math.random() * 4000
  );

}


function reactionClick() {

  if (!reactionReady) return;


  const time =
    Date.now() -
    reactionStart;


  reactionReady = false;


  document
    .getElementById("reactionBox")
    .textContent =
    time + " ms";

}


/* =========================
   CPS TEST
========================= */

let cpsRunning = false;
let cpsClicks = 0;
let cpsTimer;


document
  .getElementById("cpsButton")
  .addEventListener(
    "click",
    cpsClick
  );


function cpsClick() {

  if (!cpsRunning) {

    cpsRunning = true;

    cpsClicks = 1;

    let time = 5;


    document
      .getElementById("cpsClicks")
      .textContent =
      cpsClicks;


    document
      .getElementById("cpsButton")
      .textContent =
      "CLICK FAST!";


    cpsTimer =
      setInterval(() => {

        time--;


        document
          .getElementById("cpsTime")
          .textContent =
          time;


        if (time <= 0) {

          clearInterval(cpsTimer);

          cpsRunning = false;


          const cps =
            (
              cpsClicks / 5
            ).toFixed(1);


          document
            .getElementById("cpsResult")
            .textContent =
            cps;


          document
            .getElementById("cpsButton")
            .textContent =
            "CLICK TO START";


          document
            .getElementById("cpsTime")
            .textContent =
            5;

        }

      }, 1000);

  } else {

    cpsClicks++;


    document
      .getElementById("cpsClicks")
      .textContent =
      cpsClicks;

  }

}


/* =========================
   AIM TRAINER
========================= */

let aimScore = 0;
let aimStart = 0;
let aimRunning = false;

const target =
  document.getElementById("target");


function startAim() {

  aimScore = 0;

  aimRunning = true;

  aimStart =
    Date.now();


  document
    .getElementById("aimScore")
    .textContent =
    "0/20";


  document
    .getElementById("aimTime")
    .textContent =
    "0";


  moveTarget();

}


function moveTarget() {

  const area =
    document.getElementById(
      "aimArea"
    );


  target.style.display =
    "block";


  target.style.left =
    Math.random() *
    (
      area.clientWidth - 45
    ) +
    "px";


  target.style.top =
    Math.random() *
    (
      area.clientHeight - 45
    ) +
    "px";

}


target.addEventListener(
  "click",
  () => {

    if (!aimRunning) return;


    aimScore++;


    document
      .getElementById("aimScore")
      .textContent =
      aimScore + "/20";


    if (aimScore >= 20) {

      aimRunning = false;

      target.style.display =
        "none";


      const time =
        (
          (
            Date.now() -
            aimStart
          ) / 1000
        ).toFixed(2);


      document
        .getElementById("aimTime")
        .textContent =
        time;

    } else {

      moveTarget();

    }

  }
);


/* =========================
   MEMORY
========================= */

const memorySymbols = [
  "♟",
  "♞",
  "♜",
  "♛",
  "🔥",
  "💎",
  "🚀",
  "⚡"
];

let flippedCards = [];
let lockMemory = false;


function startMemory() {

  const board =
    document.getElementById(
      "memoryBoard"
    );


  board.innerHTML = "";


  let cards = [
    ...memorySymbols,
    ...memorySymbols
  ];


  cards =
    cards.sort(
      () =>
        Math.random() - 0.5
    );


  cards.forEach(symbol => {

    const card =
      document.createElement("div");


    card.className =
      "memory-card hidden";


    card.dataset.symbol =
      symbol;


    card.textContent =
      symbol;


    card.addEventListener(
      "click",
      flipMemory
    );


    board.appendChild(card);

  });


  flippedCards = [];

}


function flipMemory() {

  if (
    lockMemory ||
    !this.classList.contains(
      "hidden"
    ) ||
    flippedCards.length >= 2
  ) return;


  this.classList.remove(
    "hidden"
  );


  flippedCards.push(this);


  if (
    flippedCards.length === 2
  ) {

    lockMemory = true;


    setTimeout(() => {

      if (
        flippedCards[0].dataset.symbol ===
        flippedCards[1].dataset.symbol
      ) {

        flippedCards.forEach(card => {
          card.style.visibility =
            "hidden";
        });

      } else {

        flippedCards.forEach(card =>
          card.classList.add(
            "hidden"
          )
        );

      }


      flippedCards = [];

      lockMemory = false;

    }, 700);

  }

}

startMemory();


/* =========================
   2048
========================= */

let grid2048;
let score2048;


function start2048() {

  grid2048 =
    Array.from(
      { length: 4 },
      () =>
        Array(4).fill(0)
    );


  score2048 = 0;


  addTile2048();
  addTile2048();


  render2048();

}


function addTile2048() {

  const empty = [];


  for (
    let y = 0;
    y < 4;
    y++
  ) {

    for (
      let x = 0;
      x < 4;
      x++
    ) {

      if (
        grid2048[y][x] === 0
      ) {

        empty.push([y, x]);

      }

    }

  }


  if (!empty.length) return;


  const spot =
    empty[
      Math.floor(
        Math.random() *
        empty.length
      )
    ];


  grid2048[
    spot[0]
  ][
    spot[1]
  ] =
    Math.random() < 0.9
      ? 2
      : 4;

}


function render2048() {

  const board =
    document.getElementById(
      "board2048"
    );


  board.innerHTML = "";


  grid2048
    .flat()
    .forEach(value => {

      const tile =
        document.createElement("div");


      tile.className =
        "tile2048";


      tile.textContent =
        value || "";


      if (value >= 8) {
        tile.style.color =
          "#ff3030";
      }


      board.appendChild(tile);

    });


  document
    .getElementById("score2048")
    .textContent =
    score2048;

}


function compressLine(line) {

  const newLine =
    line.filter(
      x => x !== 0
    );


  for (
    let i = 0;
    i < newLine.length - 1;
    i++
  ) {

    if (
      newLine[i] ===
      newLine[i + 1]
    ) {

      newLine[i] *= 2;

      score2048 +=
        newLine[i];

      newLine.splice(
        i + 1,
        1
      );

    }

  }


  while (
    newLine.length < 4
  ) {

    newLine.push(0);

  }


  return newLine;

}


function move2048(dir) {

  if (
    dir === "left"
  ) {

    grid2048 =
      grid2048.map(
        row =>
          compressLine(row)
      );

  }


  if (
    dir === "right"
  ) {

    grid2048 =
      grid2048.map(row =>
        compressLine(
          [...row].reverse()
        ).reverse()
      );

  }


  if (
    dir === "up" ||
    dir === "down"
  ) {

    for (
      let x = 0;
      x < 4;
      x++
    ) {

      let column =
        grid2048.map(
          row => row[x]
        );


      if (
        dir === "down"
      ) {
        column.reverse();
      }


      column =
        compressLine(column);


      if (
        dir === "down"
      ) {
        column.reverse();
      }


      for (
        let y = 0;
        y < 4;
        y++
      ) {

        grid2048[y][x] =
          column[y];

      }

    }

  }


  addTile2048();

  render2048();

}

start2048();


/* =========================
   TIC TAC TOE
========================= */

let tttCells;

let currentPlayer = "X";

let gameTTT = true;


function resetTTT() {

  const board =
    document.getElementById(
      "tttBoard"
    );


  board.innerHTML = "";


  currentPlayer = "X";

  gameTTT = true;


  document
    .getElementById("tttStatus")
    .textContent =
    "Your turn: X";


  tttCells = [];


  for (
    let i = 0;
    i < 9;
    i++
  ) {

    const cell =
      document.createElement("div");


    cell.className =
      "ttt-cell";


    cell.addEventListener(
      "click",
      playTTT
    );


    board.appendChild(cell);

    tttCells.push(cell);

  }

}


function playTTT() {

  if (
    this.textContent ||
    !gameTTT
  ) return;


  this.textContent =
    currentPlayer;


  if (checkTTT()) {

    document
      .getElementById("tttStatus")
      .textContent =
      currentPlayer +
      " WINS!";


    gameTTT = false;

    return;

  }


  currentPlayer =
    currentPlayer === "X"
      ? "O"
      : "X";


  document
    .getElementById("tttStatus")
    .textContent =
    "Turn: " +
    currentPlayer;

}


function checkTTT() {

  const wins = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]

  ];


  return wins.some(win =>
    win.every(
      i =>
        tttCells[i]
          .textContent ===
        currentPlayer
    )
  );

}

resetTTT();


/* =========================
   BUBBLE POP
========================= */

let bubbleScore = 0;
let bubbleTime = 20;
let bubbleTimer;


function startBubble() {

  bubbleScore = 0;
  bubbleTime = 20;


  document
    .getElementById("bubbleScore")
    .textContent = 0;


  document
    .getElementById("bubbleTime")
    .textContent = 20;


  document
    .getElementById("bubbleArea")
    .innerHTML = "";


  clearInterval(bubbleTimer);


  spawnBubble();


  bubbleTimer =
    setInterval(() => {

      bubbleTime--;


      document
        .getElementById("bubbleTime")
        .textContent =
        bubbleTime;


      if (
        bubbleTime <= 0
      ) {

        clearInterval(
          bubbleTimer
        );


        document
          .getElementById("bubbleArea")
          .innerHTML = "";

      }

    }, 1000);

}


function spawnBubble() {

  if (
    bubbleTime <= 0
  ) return;


  const area =
    document.getElementById(
      "bubbleArea"
    );


  const bubble =
    document.createElement("div");


  bubble.className =
    "bubble";


  const size =
    25 +
    Math.random() * 45;


  bubble.style.width =
    size + "px";

  bubble.style.height =
    size + "px";


  bubble.style.left =
    Math.random() *
    (
      area.clientWidth -
      size
    ) +
    "px";


  bubble.style.top =
    Math.random() *
    (
      area.clientHeight -
      size
    ) +
    "px";


  bubble.addEventListener(
    "click",
    () => {

      bubbleScore++;


      document
        .getElementById("bubbleScore")
        .textContent =
        bubbleScore;


      bubble.remove();


      spawnBubble();

    }
  );


  area.appendChild(bubble);

}


/* =========================
   MAZE
========================= */

const mazeMap = [

  [0,1,0,0,0,0,1,0],
  [0,1,0,1,1,0,1,0],
  [0,0,0,1,0,0,0,0],
  [1,1,0,1,0,1,1,0],
  [0,0,0,0,0,0,1,0],
  [0,1,1,1,1,0,1,0],
  [0,0,0,0,1,0,0,0],
  [1,1,1,0,0,0,1,0]

];

let mazePlayer;


function startMaze() {

  mazePlayer = {
    x: 0,
    y: 0
  };


  renderMaze();

}


function renderMaze() {

  const board =
    document.getElementById(
      "mazeBoard"
    );


  board.innerHTML = "";


  mazeMap.forEach(
    (row, y) => {

      row.forEach(
        (cell, x) => {

          const div =
            document.createElement(
              "div"
            );


          div.className =
            "maze-cell";


          if (
            cell === 1
          ) {

            div.classList.add(
              "wall"
            );

          }


          if (
            x === mazePlayer.x &&
            y === mazePlayer.y
          ) {

            div.classList.add(
              "player"
            );

          }


          if (
            x === 7 &&
            y === 7
          ) {

            div.classList.add(
              "exit"
            );

          }


          board.appendChild(div);

        }
      );

    }
  );

}


function moveMaze(dir) {

  let x =
    mazePlayer.x;

  let y =
    mazePlayer.y;


  if (dir === "up") y--;

  if (dir === "down") y++;

  if (dir === "left") x--;

  if (dir === "right") x++;


  if (
    x < 0 ||
    y < 0 ||
    x >= 8 ||
    y >= 8 ||
    mazeMap[y][x] === 1
  ) return;


  mazePlayer = {
    x,
    y
  };


  renderMaze();


  if (
    x === 7 &&
    y === 7
  ) {

    setTimeout(() => {

      alert(
        "YOU ESCAPED!"
      );

      startMaze();

    }, 100);

  }

}

startMaze();