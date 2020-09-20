var auth_url = "https://accounts.google.com/o/oauth2/auth?";
console.log("launching auth flow 0");
var client_id =
  "427268355286-u489aod8fbjeapmlgd57mts4np0b7iv8.apps.googleusercontent.com";
var redirect_url = chrome.identity.getRedirectURL(); // make sure to define Authorised redirect URIs in the Google Console such as https://<-your-extension-ID->.chromiumapp.org/

var auth_params = {
  client_id: client_id,
  redirect_uri: redirect_url,
  response_type: "token",
  scope: [
    "profile email openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
  ],
  // login_hint: 'real_email@gmail.com' // fake or non-existent won't work
};

const url = new URLSearchParams(Object.entries(auth_params));
url.toString();
auth_url += url;

console.log("launching auth flow");

chrome.identity.launchWebAuthFlow(
  { url: auth_url, interactive: true },
  function (responseUrl) {
    console.log(responseUrl);
    let queryParams = responseUrl.split("#")[1];
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo?" + queryParams,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        let userEmail = JSON.parse(result).email;
        chrome.storage.sync.set({ email: userEmail }, function () {
          console.log("Set user email", userEmail);
        });
      })
      .catch((error) => console.log("error", error));
  }
);
