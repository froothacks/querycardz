// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ color: "#3aa757" }, function () {
    console.log("The color is green.");
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "developer.chrome.com" },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});

function doStuffWithDom(domContent) {
  console.log("I received the following DOM content:\n" + domContent);
  if (domContent !== undefined) {
    let domparser = new DOMParser();
    let doc = domparser.parseFromString(domContent, "text/html");
    let collection = doc.getElementsByClassName("gLFyf");
    Array.from(collection).forEach(function (element) {
      console.log(element.value);
      // let data = {query: "what is meiosis"};
      // let url = 'http://localhost:5000/';

      // $http.post(url, data).then(function(response){
      //   if(response.data){
      //     console.log("success");
      //   } else {
      //     console.log("failure");
      //   }
      // });
      // var http = new XMLHttpRequest();
      // // var url = 'get_data.php';
      // var params = `query=${encodeURIComponent("what is mitosis")}`;
      // http.open('POST', url, true);
      //
      // //Send the proper header information along with the request
      // http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

      // http.onreadystatechange = function() {//Call a function when the state changes.
      //     if(http.readyState == 4 && http.status == 200) {
      //         alert(http.responseText);
      //     }
      // }
      // http.send(params);

      // var details = {
      //     'userName': 'test@gmail.com',
      //     'password': 'Password!',
      //     'grant_type': 'password'
      // };

      // var formBody = [];
      // for (var property in data) {
      //   var encodedKey = encodeURIComponent(property);
      //   var encodedValue = encodeURIComponent(data[property]);
      //   formBody.push(encodedKey + "=" + encodedValue);
      // }
      // formBody = formBody.join("&");
      //
      // fetch(url, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      //   },
      //   body: formBody
      // })
      var requestOptions = {
        method: "POST",
        redirect: "follow",
      };

      fetch("http://127.0.0.1:5000/?query=" + element.value, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    });
  }
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == "complete") {
    console.log("complete");
    console.log(tab);
    console.log(changeInfo);
    chrome.tabs.sendMessage(tab.id, { text: "report_back" }, doStuffWithDom);
  }
});

chrome.browserAction.onClicked.addListener(function (activeTab) {
  var newURL = "http://stackoverflow.com/";
  chrome.tabs.create({ url: newURL });
});
