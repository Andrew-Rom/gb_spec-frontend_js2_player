"use strict";

let playerEl = document.querySelector(".player");

let videoEl = document.createElement("video");
videoEl.src = "assets/video_sample2.mp4";
videoEl.classList.add("video_box");

let controlPanel = document.createElement("div");
controlPanel.classList.add("control_panel");

let volumeBar = document.createElement("div");
volumeBar.classList.add("volume_bar");

let volumeIcon = document.createElement("img");
volumeIcon.className = "volume_icon";
volumeIcon.src = "assets/volume_button.svg";
volumeIcon.alt = "sound status icon";
let volumeInput = document.createElement("input");
volumeInput.className = "volume_input";
volumeInput.type = "range";

let currentVolume;
function soundControl() {
  if (videoEl.volume > 0) {
    currentVolume = videoEl.volume;
  }
  if (videoEl.volume > 0) {
    videoEl.volume = 0.0;
    volumeIcon.src = "assets/muted_button.svg";
    volumeInput.value = 0;
  } else {
    videoEl.volume = currentVolume;
    volumeIcon.src = "assets/volume_button.svg";
    volumeInput.value = currentVolume * 10;
  }
}
volumeIcon.addEventListener("click", soundControl);
controlPanel.appendChild(volumeIcon);

volumeInput.min = 0;
volumeInput.max = 10;
volumeInput.value = 5;
videoEl.volume = 0.5;
volumeInput.addEventListener("change", (e) => {
  videoEl.volume = e.target.value / 10;
});
volumeBar.appendChild(volumeInput);

let btnEl = document.createElement("div");
btnEl.classList.add("control_button");
let btnElImg = document.createElement("img");
btnElImg.className = "player_button";
btnElImg.src = "assets/play_button.svg";
btnElImg.alt = "play and pause button";
btnEl.appendChild(btnElImg);

function videoControl() {
  if (videoEl.paused) {
    videoEl.play();
    btnElImg.src = "assets/pause_button.svg";
  } else {
    videoEl.pause();
    btnElImg.src = "assets/play_button.svg";
  }
}
btnEl.addEventListener("click", videoControl);

videoEl.addEventListener("ended", () => {
  btnElImg.src = "assets/play_button.svg";
});

let progressBar = document.createElement("div");
progressBar.classList.add("progress_bar");
let progressInput = document.createElement("input");
progressInput.classList.add("progress_input");
progressInput.type = "range";
progressInput.value = 0;
progressInput.addEventListener("change", (e) => {
  videoEl.currentTime = (progressInput.value * videoEl.duration) / 100;
});
progressBar.appendChild(progressInput);

let timeEl = document.createElement("div");
timeEl.className = "video_timer";
timeEl.innerHTML = "00 : 00";

function videoTimer() {
  progressInput.value = (videoEl.currentTime / videoEl.duration) * 100;
  let minutes = Math.floor(videoEl.currentTime / 60);
  minutes = minutes < 10 ? "0" + String(minutes) : String(minutes);
  let seconds = Math.floor(videoEl.currentTime % 60);
  seconds = seconds < 10 ? "0" + String(seconds) : String(seconds);
  timeEl.innerHTML = `${minutes} : ${seconds}`;
}
videoEl.addEventListener("timeupdate", videoTimer);

let playbackSpeedEl = document.createElement("div");
playbackSpeedEl.className = "playback";

let playbackSpeedDetails = document.createElement("details");
playbackSpeedDetails.className = "playback__details";
let playbackSpeedSummary = document.createElement("summary");
playbackSpeedSummary.className = "playback__summary";
playbackSpeedSummary.innerHTML = "1.0x";
let playbackSpeedSelector = document.createElement("div");
playbackSpeedSelector.className = "playback__selector";

playbackSpeedSelector.addEventListener("mouseleave", (e) => {
  playbackSpeedDetails.open = false;
});

let playbackSpeedSlowPoint = document.createElement("div");
playbackSpeedSlowPoint.className = "playback__point";
let playbackSpeedSlowInput = document.createElement("input");
playbackSpeedSlowInput.className = "playback__input";
playbackSpeedSlowInput.type = "radio";
playbackSpeedSlowInput.id = "playback__slow";
playbackSpeedSlowInput.name = "playback__speed";
let playbackSpeedSlowLabel = document.createElement("label");
playbackSpeedSlowLabel.className = "playback__label";
playbackSpeedSlowLabel.for = "playback__normal";
playbackSpeedSlowLabel.innerHTML = "0.5x";
playbackSpeedSlowPoint.appendChild(playbackSpeedSlowInput);
playbackSpeedSlowPoint.appendChild(playbackSpeedSlowLabel);

let playbackSpeedNormalPoint = document.createElement("div");
playbackSpeedNormalPoint.className = "playback__point";
let playbackSpeedNormalInput = document.createElement("input");
playbackSpeedNormalInput.className = "playback__input";
playbackSpeedNormalInput.type = "radio";
playbackSpeedNormalInput.id = "playback__normal";
playbackSpeedNormalInput.name = "playback__speed";
let playbackSpeedNormalLabel = document.createElement("label");
playbackSpeedNormalLabel.className = "playback__label";
playbackSpeedNormalLabel.for = "playback__normal";
playbackSpeedNormalLabel.innerHTML = "1.0x";
playbackSpeedNormalInput.checked = true;
playbackSpeedNormalPoint.appendChild(playbackSpeedNormalInput);
playbackSpeedNormalPoint.appendChild(playbackSpeedNormalLabel);
playbackSpeedSelector.appendChild(playbackSpeedNormalPoint);

let playbackSpeedFastPoint = document.createElement("div");
playbackSpeedFastPoint.className = "playback__point";
let playbackSpeedFastInput = document.createElement("input");
playbackSpeedFastInput.className = "playback__input";
playbackSpeedFastInput.type = "radio";
playbackSpeedFastInput.id = "playback__fast";
playbackSpeedFastInput.name = "playback__speed";
let playbackSpeedFastLabel = document.createElement("label");
playbackSpeedFastLabel.className = "playback__label";
playbackSpeedFastLabel.for = "playback__fast";
playbackSpeedFastLabel.innerHTML = "2.0x";

playbackSpeedEl.addEventListener("change", () => {
  if (playbackSpeedSlowInput.checked) {
    videoEl.playbackRate = 0.5;
    playbackSpeedSummary.innerHTML = playbackSpeedSlowLabel.innerHTML;
  }
  if (playbackSpeedNormalInput.checked) {
    videoEl.playbackRate = 1.0;
    playbackSpeedSummary.innerHTML = playbackSpeedNormalLabel.innerHTML;
  }
  if (playbackSpeedFastInput.checked) {
    videoEl.playbackRate = 2.0;
    playbackSpeedSummary.innerHTML = playbackSpeedFastLabel.innerHTML;
  }
});

playbackSpeedFastPoint.appendChild(playbackSpeedFastInput);
playbackSpeedFastPoint.appendChild(playbackSpeedFastLabel);
playbackSpeedSelector.appendChild(playbackSpeedFastPoint);

playbackSpeedSelector.appendChild(playbackSpeedSlowPoint);
playbackSpeedSelector.appendChild(playbackSpeedNormalPoint);
playbackSpeedSelector.appendChild(playbackSpeedFastPoint);

playbackSpeedDetails.appendChild(playbackSpeedSummary);
playbackSpeedDetails.appendChild(playbackSpeedSelector);
playbackSpeedEl.appendChild(playbackSpeedDetails);

controlPanel.appendChild(volumeBar);
controlPanel.appendChild(btnEl);
controlPanel.appendChild(progressBar);
controlPanel.appendChild(timeEl);
controlPanel.appendChild(playbackSpeedEl);

playerEl.appendChild(videoEl);
playerEl.appendChild(controlPanel);
