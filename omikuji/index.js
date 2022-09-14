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
  let popMessage = "いらっしゃい！おみくじ引いてって!";
  window.alert(popMessage);
});

const btn1 = document.getElementById("btn");
btn1.addEventListener(
  "click",
  function () {
    let resultText = ["大吉!!", "吉!!", "中吉!!", "小吉!!", "末吉!!", "凶!!"];
    let resultColor = [
      "#FF0000",
      "#C71585",
      "#FF69B4",
      "#FF8C00",
      "#1E90FF",
      "#9e1df4",
    ];
    let resultFontSize = ["55px", "50px", "45px", "40px", "35px", "30px"];
    let resultImage = [
      "./img/star.png",
      "./img/sakura_hanabira.png",
      "./img/sakura_hanabira.png",
      "./img/sakura_hanabira.png",
      "./img/leaf.png",
      "./img/snowflakes.png",
    ];
    let resultImgMaxSpeed = [10, 10, 8, 5, 5, 5];
    let resultImgMinSpeed = [30, 30, 20, 20, 20, 20];
    let n = Math.floor(Math.random() * resultText.length);
    btn1.textContent = resultText[n];
    btn1.style.color = resultColor[n];
    btn1.style.fontSize = resultFontSize[n];
    $(document).snowfall("clear");
    $(document).ready(function () {
      $(document).snowfall({
        maxSpeed: resultImgMaxSpeed[n],
        minSpedd: 1,
        maxSize: resultImgMinSpeed[n],
        minSize: 1,
        image: resultImage[n],
      });
    });
  },
  false
);

function back() {
  history.go(-1);
}
