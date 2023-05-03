/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

'use strict';

const snapshotButton = document.querySelector('button#snapshot');
const filterSelect = document.querySelector('select#filter');

// Put variables in global scope to make them available to the browser console.
const video = window.video = document.querySelector('video');
const canvas = window.canvas = document.querySelector('canvas');
canvas.width = 480;
canvas.height = 360;

 openCam.onload = function(){
         let All_mediaDevices=navigator.mediaDevices
         if (!All_mediaDevices || !All_mediaDevices.getUserMedia) {
            console.log("getUserMedia() not supported.");
            return;
         }
         All_mediaDevices.getUserMedia({
            audio: false,
            video: true
         })
         .then(function(vidStream) {
            var video = document.getElementById('videoCam');
            if ("srcObject" in video) {
               video.srcObject = vidStream;
            } else {
               video.src = window.URL.createObjectURL(vidStream);
            }
            video.onloadedmetadata = function(e) {
               video.play();
            };
         })
         .catch(function(e) {
            console.log(e.name + ": " + e.message);
         });
      }


snapshotButton.onclick = function() {
  canvas.className = filterSelect.value;
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
};

filterSelect.onchange = function() {
  video.className = filterSelect.value;
};

const constraints = {
  audio: false,
  video: true
};

function handleSuccess(stream) {
  window.stream = stream; // make stream available to browser console
  video.srcObject = stream;
}

function handleError(error) {
  console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}

navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
