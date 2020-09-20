// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";

chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostContains: "." },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});

function doStuffWithDom(domContent) {;
  if (domContent !== undefined) {
    console.log("google search!");
    let domparser = new DOMParser();
    let doc = domparser.parseFromString(domContent, "text/html");
    let collection = doc.getElementsByClassName("gLFyf");
    Array.from(collection).forEach(function (element) {
      console.log("query", element.value);
      var requestOptions = {
        method: "POST",
        redirect: "follow",
      };

      fetch("http://127.0.0.1:5000/?query=" + element.value, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    });
  } else {
    console.log("undefined DOM (not google search)");
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
