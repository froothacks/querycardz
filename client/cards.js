var card = document.querySelector(".flipcard");

card.addEventListener("click", function () {
  console.log("clicked");
  card.classList.toggle("is-flipped");
  $("#answer").show();
});

const URL = "127.0.0.1:5000/getcards";
let data = [];
let currentCard = 0;

var requestOptions = {
  method: "GET",
  redirect: "follow",
};

function leftCard() {
  currentCard--;
  if (currentCard < 0) {
    currentCard = 0;
  }
  updateCard();
}

function updateCard() {
  qa = data[currentCard];
  card.classList.remove("is-flipped");
  $("#question").text(qa.query);
  $("#answer").hide();
  $("#answer").text(qa.answer);
}

function rightCard() {
  currentCard++;
  if (currentCard > data.length - 1) {
    currentCard = data.length - 1;
  }
  updateCard();
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
fetch(`http://${URL}?topic=${getParameterByName("topic")}`, requestOptions)
  .then((response) => response.json())
  .then((result) => {
    data = result;
    updateCard();
  })
  .catch((error) => console.log("error", error));

document.onkeydown = function (event) {
  switch (event.key) {
    case "ArrowLeft":
      leftCard();
      break;
    case "ArrowRight":
      rightCard();
      break;
    case "ArrowUp":
      // Up pressed
      break;
    case "ArrowDown":
      // Down pressed
      break;
  }
  event.preventDefault(); // prevent the default action (scroll / move caret)
};
