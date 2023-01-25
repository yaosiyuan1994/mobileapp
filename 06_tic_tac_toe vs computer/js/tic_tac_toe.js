"use strict";

let flag = 1;

let counter = 9;

//表すメッセージ取得
const msgtext = document.getElementById("msgtext");

//square取得
const squares = document.getElementsByClassName("square");
//array に変換
const squareArray = Array.from(squares);

//碁盤取得
const a_1 = document.getElementById("a_1");
const a_2 = document.getElementById("a_2");
const a_3 = document.getElementById("a_3");
const b_1 = document.getElementById("b_1");
const b_2 = document.getElementById("b_2");
const b_3 = document.getElementById("b_3");
const c_1 = document.getElementById("c_1");
const c_2 = document.getElementById("c_2");
const c_3 = document.getElementById("c_3");

//NEWGANME button get
const newgamebtn_display = document.getElementById("newgame-btn");
const newgamebtn = document.getElementById("btn90");

//Win or Lose Judgment Line
const line1 = JudgLine(squareArray, ["a_1", "a_2", "a_3"]);
const line2 = JudgLine(squareArray, ["b_1", "b_2", "b_3"]);
const line3 = JudgLine(squareArray, ["c_1", "c_2", "c_3"]);
const line4 = JudgLine(squareArray, ["a_1", "b_1", "c_1"]);
const line5 = JudgLine(squareArray, ["a_2", "b_2", "c_2"]);
const line6 = JudgLine(squareArray, ["a_3", "b_3", "c_3"]);
const line7 = JudgLine(squareArray, ["a_1", "b_2", "c_3"]);
const line8 = JudgLine(squareArray, ["a_3", "b_2", "c_1"]);

const lineArray = [line1, line2, line3, line4, line5, line6, line7, line8];

let winningLine = null;

//メッセージ
const msgtxt1 =
  '<p class="image"><img src ="img/penguins.jpg" width=61px height=61px></p><p class="text">Penguins Attack!(your turn)</p>';
const msgtxt2 =
  '<p class="image"><img src ="img/whitebear.jpg" width=61px height=61px></p><p class="text">WhiteBear Attack!(Computer turn)</p>';
const msgtext3 =
  '<p class="image"><img src ="img/penguins.jpg" width=61px height=61px></p><p class="text animate__animated animate__lightSpeedInRight">Penguins Win!!</p>';
const msgtext4 =
  '<p class="image"><img src ="img/WhiteBear.jpg" width=61px height=61px></p><p class="text animate__animated animate__lightSpeedInLeft">WhiteBear Win!!</p>';
const msgtext5 =
  '<p class="image"><img src ="img/penguins.jpg" width=61px height=61px><img src = "img/whitebear.jpg" width=61px height=61px></p><p class="text animate__bounceIn">Draw!!</p>';
//サウンド
let gameSound = [
  "sound/click_sound1.mp3",
  "sound/click_sound2.mp3",
  "sound/penwin_sound.mp3",
  "sound/braewin_sound.mp3",
  "sound/draw_sound.mp3",
];
//勝利の条件check
function JudgLine(targetArray, idArray) {
  return targetArray.filter(function (e) {
    return e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2];
  });
}

window.addEventListener(
  "DOMContentLoaded",
  function () {
    setMessage("pen-turn");
    //squareがclick可能かを判断するクラスを追加
    squareArray.forEach((square) => {
      square.classList.add("js-clickable");
    });
  },
  false
);

//squareをclickした時にevent発火
squareArray.forEach((square) => {
  square.addEventListener("click", () => {
    let gameOverFlag = isSelect(square); //gameStatusを返却
    //game not over
    if (gameOverFlag === "0") {
      const squaresBox = document.getElementById("squaresBox");
      squaresBox.classList.add("js-unclickable");
      setTimeout(function () {
        bearTurn();
      }, "2000");
    }
  });
});

//clickしたら、碁盤 ? penguins : bear
const isSelect = (selectSquare) => {
  console.log("selectSquare", selectSquare);
  let gameOverFlag = "0";
  if (flag === 1) {
    console.log("flag", flag);
    //click sound
    let music = new Audio(gameSound[0]);
    music.currentTime = 0;
    music.play(); //play
    selectSquare.classList.add("js-pen-checked");
    selectSquare.classList.add("js-unclickable"); //再びclickできないように
    selectSquare.classList.remove("js-clickable"); //squareがclick可能かを判断するクラスを削除
    //penguins win
    // isWinner("penguins");
    if (isWinner("penguins")) {
      setMessage("pen-win");
      gameOver("penguins");
      return (gameOverFlag = "1");
    }
    setMessage("bear-turn");
    flag = 2;
  } else {
    //click sound
    let music = new Audio(gameSound[1]);
    music.currentTime = 0;
    music.play(); //play
    selectSquare.classList.add("js-bear-checked");
    selectSquare.classList.add("js-unclickable");
    selectSquare.classList.remove("js-clickable"); //squareがclick可能かを判断するクラスを削除
    //white-bear win
    isWinner("bear");
    if (isWinner("bear")) {
      setMessage("bear-win");
      gameOver("bear");
      return (gameOverFlag = "1");
    }
    setMessage("pen-turn");
    flag = 1;
  }
  counter--;
  if (counter === 0) {
    setMessage("draw");
    gameOver("draw");
    return (gameOverFlag = "1");
  }
  return (gameOverFlag = "0");
};

//勝負判定
const isWinner = (symbol) => {
  //some:１つでも条件を満たしていればTrueを返す
  const result = lineArray.some((line) => {
    //every:全て条件を満たしていればTrueを返す
    const subResult = line.every((square) => {
      if (symbol === "penguins") {
        return square.classList.contains("js-pen-checked");
      }
      if (symbol === "bear") {
        return square.classList.contains("js-bear-checked");
      }
    });
    //Tureを返したlineをwinningLineに代入
    if (subResult) {
      winningLine = line;
    }
    return subResult;
  });
  return result;
};

//game終了判定
function gameOver(status) {
  //GameOver sound
  let w_sound;
  switch (status) {
    case "penguins":
      w_sound = gameSound[2];
      break;
    case "bear":
      w_sound = gameSound[3];
      break;
    case "draw":
      w_sound = gameSound[4];
      break;
  }

  let music = new Audio(w_sound);
  music.currentTime = 0;
  music.play(); //play
  //all square unclickable
  // squareArray.forEach(function (square) {
  //   square.classList.add("js-unclickable");
  // });
  squaresBox.classList.add("js-unclickable");
  //display NEWGANME button
  newgamebtn_display.classList.remove("js-hidden");
  //winEffect
  if (status === "penguins") {
    //winner-line penguins Line
    if (winningLine) {
      winningLine.forEach((e) => {
        e.classList.add("js_pen_highLine");
      });
    }
    //penguins win !!==>snow color is pink
    $(document).snowfall({
      flakeColor: "rgb(255,240,245)",
      maxSpeed: 3,
      minSpeed: 1,
      maxSize: 20,
      minSize: 10,
      round: true,
    });
  } else if (status === "bear") {
    //winner-line penguins Line
    if (winningLine) {
      winningLine.forEach((e) => {
        e.classList.add("js_bear_highLine");
      });
    }
    //penguins win !!==>snow color is pink
    $(document).snowfall({
      flakeColor: "rgb(1winningLine75,238,238)",
      maxSpeed: 3,
      minSpeed: 1,
      maxSize: 20,
      minSize: 10,
      round: true,
    });
    //NEWGAME button click
    newgamebtn.addEventListener("click", function () {
      flag = 1;
      counter = 9;
      winningLine = null;
      squareArray.forEach((square) => {
        square.classList.remove("js-pen-checked");
        square.classList.remove("js-bear-checked");
        square.classList.remove("js-unclickable");
        square.classList.remove("js_pen_highLine");
        square.classList.remove("js_bear_highLine");
        square.classList.add("js-clickable"); //squareがclick可能かを判断するクラスを追加
      });
      squaresBox.classList.remove("js-unclickable"); //squares-boxをclickできないよにする
      setMessage("pen-turn");
      newgamebtn_display.classList.add("js-hidden");
      //snowfall stop
      $(document).snowfall("clear");
    });
  }
}

// const newGame = () => {
//   newgamebtn.addEventListener("click", function () {
//     console.log("object");
//     flag = 1;
//     counter = 9;
//     winningLine = null;
//     squareArray.forEach((square) => {
//       square.classList.remove(
//         "js-pen-checked",
//         "js-bear-checked",
//         "js-unclickable",
//         "js_pen_highLine",
//         "js_bear_highLine"
//       );
//     });
//     setMessage("pen-turn");
//     newgamebtn_display.classList.add("js-hidden");
//     $(document).snowfall("clear");
//   });
// };

const setMessage = (id) => {
  switch (id) {
    case "pen-turn":
      msgtext.innerHTML = msgtxt1;
      break;
    case "bear-turn":
      msgtext.innerHTML = msgtxt2;
      break;
    case "pen-win":
      msgtext.innerHTML = msgtext3;
      break;
    case "bear-win":
      msgtext.innerHTML = msgtext4;
      break;
    case "draw":
      msgtext.innerHTML = msgtext5;
      break;
    default:
      msgtext.innerHTML = msgtxt1;
      break;
  }
};

function bearTurn() {
  let gameOverFlag = "0";
  const bearSquare = squareArray.filter((square) => {
    return square.classList.contains("js-clickable");
  });
  let n = Math.floor(Math.random() * bearSquare.length);
  gameOverFlag = isSelect(bearSquare[n]);
  if (gameOverFlag === "0") {
    squaresBox.classList.remove("js-unclickable");
  }
}
