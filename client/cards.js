var card = document.querySelector(".flipcard");
var email = "";
function flip(event) {
  console.log("clicked", event);
  if (event && event.target.localName == "a") {
    return;
  }
  card.classList.toggle("is-flipped");
  $("#answer").show();
}
chrome.storage.sync.get("email", (d) => (email = d));

card.addEventListener("click", flip);

const URL = "127.0.0.1:5000/getCards";
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
  if (!qa || !qa.answer) {
    return;
  }
  ans = qa.answer.split("\\n");
  if (ans.length >= 2) {
    linkData = ans[1].split(" ( ");
    linkName = linkData[0];
    linkURL = linkData[1].replace(" ).");
    ans = ans[0] + ` <a target="_blank" href=${linkURL}>${linkName}</a>`;
  }
  $("#cardProgress").text(
    Math.round(
      (currentCard * 100) / (data.length - 1 == 0 ? 1 : data.length - 1)
    ) + " %"
  );
  console.log(
    Math.round(
      (currentCard * 100) / (data.length - 1 == 0 ? 1 : data.length - 1)
    ) + " %"
  );
  $("#question").text(qa.query);
  $("#answer").hide();
  $("#answer").html(ans);
}

function rightCard() {
  currentCard++;
  if (currentCard > data.length - 1) {
    currentCard = data.length - 1;
  }
  updateCard();
}

document.querySelector(".left").addEventListener("click", leftCard);
document.querySelector(".right").addEventListener("click", rightCard);

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
fetch(
  `http://${URL}?email=${email}&topic=${getParameterByName("topic")}`,
  requestOptions
)
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
      flip();
      break;
    case "ArrowDown":
      flip();
      break;
  }
  event.preventDefault(); // prevent the default action (scroll / move caret)
};
