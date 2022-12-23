//get elements
const timeElement = document.querySelector(".watch .time");
const totalTimeElement = document.querySelector(".watch .totalTime");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

//initial value
let seconds = 0;
let totalTime = 0;
let interval = null;

//active clock
startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
resetBtn.addEventListener("click", reset);

//start button
function start() {
  //Check, if there is an interval, don't do anything
  if (interval) {
    return;
  }

  //get the value of input text
  var taskName = document.getElementById("txtInput").value;

  //Check and give an alert if the input is empty
  if (!taskName) {
    alert("You must write what you want to do?!");
    return;
  }

  interval = setInterval(timer, 1000);
}

//stop button -- Unlike the start button
function stop() {
  if (!interval) {
    return;
  }

  var taskName = document.getElementById("txtInput").value;
  if (!taskName) {
    alert("You must write what you want to do?!");
    return;
  }

  document.getElementById("txtInput").value = "";
  clearInterval(interval);
  interval = null;
  seconds = 0;

  const trackedTime = timeElement.innerText;

  const li = document.createElement("li");
  const deleteBtn = document.createElement("button");
  deleteBtn.onclick = deleteRow;
  // var btn = document.createTextNode("\u00D7");
  deleteBtn.innerText = "x";
  deleteBtn.className = "closeBtn";
  // deleteBtn.appendChild(btn);

  li.innerText = `${taskName} (${trackedTime})`;
  li.appendChild(deleteBtn);

  const list = document.getElementsByClassName("list")[0];
  list.appendChild(li);
}

//Timer to calculate time
function timer() {
  seconds++;
  totalTime++;

  timeElement.innerText = renderTime(seconds);
  totalTimeElement.innerText = renderTime(totalTime);
}

function renderTime(seconds) {
  let hrs = Math.floor(seconds / 3600);
  let mins = Math.floor((seconds - hrs * 3600) / 60);
  let secs = seconds % 60;

  if (secs < 10) secs = "0" + secs;
  if (mins < 10) mins = "0" + mins;
  if (hrs < 10) hrs = "0" + hrs;

  return `${hrs}:${mins}:${secs}`;
}

//reset button
function reset() {
  clearInterval(interval);
  interval = null;
  document.getElementById("txtInput").value = "";
  seconds = 0;
  timeElement.innerText = "00:00:00";
}

//delete items
function deleteRow() {
  var div = this.parentElement;
  div.style.display = "none";
}
