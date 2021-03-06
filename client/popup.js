// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";

let changeColor = document.getElementById("changeColor");
let pic = "";

function p(d) {
  console.log(d);
  pic = d.picture;
  if (pic == "" || pic == undefined) {
    setTimeout(getPicture, 2000);
  } else {
    console.log(pic);
    $("#pic").attr("src", pic);
    $("#signinState").html("Signed In");
  }
}
const getPicture = () => chrome.storage.sync.get("picture", p);
getPicture();

// chrome.storage.sync.get("color", function (data) {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute("value", data.color);
// });

changeColor.onclick = function (element) {
  /*let color = element.target.value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.body.style.backgroundColor = "' + color + '";'});
  });
  */
  chrome.tabs.create(
    { url: chrome.extension.getURL("newpage.html") },
    function (tab) {
      // Tab opened.
    }
  );
};
