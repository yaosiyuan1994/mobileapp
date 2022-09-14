window.addEventListener("DOMContentLoaded", function () {
  $("header").textillate({
    loop: false,
    minDisplayTime: 2000,
    intialDelay: 2000,
    autoStart: true,
    in: {
      effect: "fadeInLeftBig",
      delayScale: 1.5,
      delay: 50,
      sync: false,
      shuffle: true,
    },
  });
  $(function () {
    ScrollReveal().reveal("#btn", { duration: 9000 });
  });
  let popMessage = "show ur love!!";
  window.alert(popMessage);
});
let soundEndFlag = "0";
const btn1 = document.getElementById("btn");
const omikujiText = document.getElementById("omikujiText");
const omikujiTextImage = document.getElementById("omikujiTextImage");
btn1.addEventListener(
  "click",
  function () {
    if (soundEndFlag === "1") {
      soundControl("end", "");
    }
    let resultText = [
      "./img/love.png",
      "./img/love1.png",
      "./img/love2.jpg",
      "./img/love3.png",
      "./img/love4.png",
    ];
    let resultImage = [
      "./img/star.png",
      "./img/sakura_hanabira.png",
      "./img/sakura_hanabira.png",
      "./img/sakura_hanabira.png",
      "./img/leaf.png",
      "./img/snowflakes.png",
    ];
    let resultImgMaxSpeed = [10, 10, 8, 5, 5];
    let resultImgMinSpeed = [30, 30, 20, 20, 20];
    let resultSound = [
      "./sound/1.mp3",
      "./sound/2.mp3",
      "./sound/3.mp3",
      "./sound/4.mp3",
      "./sound/5.mp3",
    ];
    let n = Math.floor(Math.random() * resultText.length);
    omikujiTextImage.src = resultText[n];
    omikujiTextImage.classList.add("omikujiPaper");
    omikujiTextImage.addEventListener(
      "animationend",
      function () {
        omikujiTextImage.classList.remove("omikujiPaper");
      },
      false
    );
    w_sound = resultSound[n];
    soundControl("start", w_sound);
    soundEndFlag = "1";

    $(document).snowfall("clear");

    setTimeout(function () {
      $(document).ready(function () {
        $(document).snowfall({
          maxSpeed: resultImgMaxSpeed[n],
          minSpedd: 1,
          maxSize: resultImgMinSpeed[n],
          minSize: 1,
          image: resultImage[n],
        });
      });
    }, 200);
  },
  false
);
let w_sound;
let music;
function soundControl(status, w_sound) {
  if (status === "start") {
    music = new Audio(w_sound);
    music.currentTime = 0;
    music.play();
  } else if (status === "end") {
    music.pause();
    music.currentTime = 0;
  }
}
function back() {
  history.go(-1);
}
