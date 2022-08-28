// landing game
let btnS = document.querySelector(".btn-s");
let containerS = document.querySelector(".Game-start");
btnS.addEventListener("click", function (e) {
  let x = e.clientX - e.target.offsetLeft;
  let y = e.clientY - e.target.offsetTop;
  let ripples = document.createElement("span");
  ripples.className = "span-effect";
  ripples.style.left = x + "px";
  ripples.style.top = y + "px";
  this.appendChild(ripples);
  setTimeout(() => {
    ripples.remove();
  }, 1000);
});

// fix multiple clicks
let clickStart = false;
btnS.addEventListener("click", function (e) {
  let levelGame = document.querySelector(".level-opt");
  if (clickStart == false) {
    setTimeout(() => {
      containerS.classList.add("left");
    }, 500);
    setTimeout(() => {
      containerS.remove();
      creatGame(levelGame);
    }, 1000);
    clickStart = true;
  }
});

// generate list of nfts crad
let divNfts = [];
let counter = 0;
for (let i = 1; i <= 16; i++) {
  counter++;
  let div = `<div class="nft-i" data-postion="p-${i}"><img data-fillter="n-${counter}" src="https://raw.githubusercontent.com/y00ts/img/main/${counter}.jpg" alt=""></div>`;
  divNfts.push(div);
  if (counter == 8) {
    counter = 0;
  }
}

// start game
function creatGame(levelGame) {
  let div = document.createElement("div");
  div.className = "container Game-c";
  div.innerHTML += `
    <div class="nav">
                <div class="time">
                    <img src="https://raw.githubusercontent.com/y00ts/img/main/icons8-timer-100.png"/>
                    <p>-</p><span>s</span>
                </div>       
                <div class="try">
                    <img src="https://raw.githubusercontent.com/y00ts/img/main/icons8-restart-100.png"/>
                    <p>-</p>
                </div>           
    </div>`;
  div.innerHTML += `
                    <div class="succ">
                        <h1>success!</h1>
                    </div>`;
  let div2 = document.createElement("div");
  div2.className = "crad-grid";
  div.appendChild(div2);

  // generate random nfts form generate list
  let lengthNfts = divNfts.length;
  for (let i = 0; i < lengthNfts; i++) {
    let mt = Math.trunc(Math.random() * divNfts.length - 1);
    div2.innerHTML += divNfts[mt];
    divNfts.splice(divNfts.indexOf(divNfts[mt]), 1);
  }

  div.innerHTML += `<div class="win-section">
                        <div></div>
                        <div></div>
                    </div>
                    <div class="monkey-liser">
                        <img src="https://raw.githubusercontent.com/y00ts/gamesrc7/main/0_body.png">
                    </div>
                    </div>`;
  document.body.appendChild(div);
  gameStrat(levelGame);
}

function gameStrat(levelGame) {
  let nfts = document.querySelectorAll(".nft-i");
  // show all nfts
  nfts.forEach((e) => {
    flipAnim(e);
  });

  // time fillter with level game
  let timeShow = 3000;
  switch (levelGame.value) {
    case "hard":
      timeShow = 3800;
      break;
    case "don't try":
      timeShow = 5000;
      break;
    default:
      timeShow = 3000;
      break;
  }
  //
  setTimeout(() => {
    nfts.forEach((e) => {
      flipAnim(e, "hide");
    });
    setTimeout(() => {
      eventClickFlip(nfts, levelGame);
    }, 1000);
  }, timeShow);
}

function eventClickFlip(nfts, levelGame) {
  let counterWin = 0;
  let counterClick = 0;
  let nftOne = null;
  let nftPostion = [];

  //

  let trySec = document.querySelector(".try p");

  //
  let tryCounter = 20;
  let timerSec = document.querySelector(".time p");
  let s = null;
  // Filter work for each level
  switch (levelGame.value) {
    case "easy":
      s = 50;
      break;
    case "medium":
      s = 40;
      tryCounter = 16;
      break;
    case "hard":
      s = 25;
      tryCounter = 8;
      break;
    case "don't try":
      s = "-";
      tryCounter = 1;
      break;
    default:
      s = "-";
      break;
  }
  trySec.innerHTML = tryCounter;
  timerSec.innerHTML = s;
  let time = setInterval(() => {
    if (typeof s == "number") {
      if (timerSec.innerHTML != 0) {
        timerSec.innerHTML = --s;
      } else {
        clearInterval(time);
        failedAnim();
      }
    }
  }, 1000);
  //

  nfts.forEach((e) => {
    e.addEventListener("click", function () {
      //
      if (
        counterClick < 2 &&
        nftPostion.includes(this.dataset.postion) == false
      ) {
        flipAnim(this);
        if (counterClick < 1) {
          nftOne = this;
        }
        counterClick++;

        if (
          counterClick == 2 &&
          nftOne.dataset.postion != this.dataset.postion &&
          nftPostion.includes(nftOne.dataset.postion) == false &&
          nftPostion.includes(this.dataset.postion) == false
        ) {
          if (
            nftOne.firstElementChild.dataset.fillter !=
            this.firstElementChild.dataset.fillter
          ) {
            setTimeout(() => {
              flipAnim(nftOne, "hide");
              flipAnim(this, "hide");
              if (trySec.innerHTML > 1) {
                trySec.innerHTML = --tryCounter;
              } else {
                failedAnim();
              }
              counterClick = 0;
            }, 800);
          } else {
            // storage nftPostion to don't click again
            nftPostion.push(nftOne.dataset.postion);
            nftPostion.push(this.dataset.postion);

            counterWin++;
            if (counterWin == 8) {
              clearInterval(time);
              winAnim();
            }
            setTimeout(() => {
              counterClick = 0;
            }, 800);
            //

            //
          }
        } else {
          counterClick = 1;
          nftOne = this;
        }
      }
      //
    });
  });
}

// win
function winAnim() {
  let nfts = document.querySelectorAll(".nft-i");
  let succ = document.querySelector(".succ");
  let winSec = document.querySelector(".win-section");
  let cradGrid = document.querySelector(".crad-grid");
  let winMon = document.querySelector(".monkey-liser");
  let nav = document.querySelector(".nav");
  nav.setAttribute("style", "opacity: 0;");
  winSec.classList.add("win-rotate");
  setTimeout(() => {
    winMon.classList.add("win-top");
    cradGrid.classList.add("win-scale");
    nfts.forEach((e) => {
      return e.setAttribute("style", "filter: blur(3px);");
    });
    setTimeout(() => {
      succ.classList.add("win-opa");
    }, 500);
  }, 2000);
}

// failde
function failedAnim() {
  let nfts = document.querySelectorAll(".nft-i");
  let succ = document.querySelector(".succ");
  let winSec = document.querySelector(".win-section");
  let cradGrid = document.querySelector(".crad-grid");
  let winMon = document.querySelector(".monkey-liser");
  let nav = document.querySelector(".nav");
  nav.setAttribute("style", "opacity: 0;");
  succ.firstElementChild.innerHTML = "failed!";
  succ.firstElementChild.style.color = "red";
  cradGrid.setAttribute("style", "z-index: -1;");
  winMon.firstElementChild.src =
    "https://raw.githubusercontent.com/y00ts/gamesrc7/main/10_body.png";
  setTimeout(() => {
    winMon.classList.add("win-top");
    cradGrid.classList.add("win-scale");
    nfts.forEach((e) => {
      return e.setAttribute("style", "filter: blur(3px);");
    });
    setTimeout(() => {
      succ.classList.add("win-opa");
    }, 500);
  }, 800);
}

// flip anmation

function flipAnim(element, type = "show") {
  if (type == "show") {
    element.classList.remove("Nclicked");
    element.classList.add("clicked");
    setTimeout(() => {
      element.firstElementChild.style.display = "block";
    }, 300);
  }
  if (type == "hide") {
    element.classList.remove("clicked");
    element.classList.add("Nclicked");
    setTimeout(() => {
      element.firstElementChild.style.display = "none";
    }, 300);
  }
}
/* https://eimaung.com/ */
