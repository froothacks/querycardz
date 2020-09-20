const URL = "127.0.0.1:5000/topics";
var requestOptions = {
  method: "GET",
  redirect: "follow",
};
function f(d) {
  console.log(d);
  email = d.email;
  if (email == "") {
    getEmail();
  }
  fetch(`http://${URL}?email=${email}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      data = result;
      console.log(data);
      for (let topic of data) {
        $(".dropdown-menu").append(
          `<a class="dropdown-item" style="text-transform: Capitalize" href="cards.html?topic=${topic}">${topic}</a>`
        );
      }
    })
    .catch((error) => console.log("error", error));
}
const getEmail = () => chrome.storage.sync.get("email", f);
getEmail();
