// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log('The color is green.');
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'developer.chrome.com'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

function doStuffWithDom(domContent) {
    console.log('I received the following DOM content:\n' + domContent);
    if (domContent !== undefined) {
      let domparser = new DOMParser();
      let doc = domparser.parseFromString(domContent, "text/html");
      let collection = doc.getElementsByClassName("gLFyf");
      Array.from(collection).forEach(function (element) {
        console.log(element.value);
      });
    }
}

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    console.log("complete");
    console.log(tab);
    console.log(changeInfo);
    chrome.tabs.sendMessage(tab.id, {text: 'report_back'}, doStuffWithDom);
  }
});