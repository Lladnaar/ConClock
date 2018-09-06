import * as common from './common.js';
import * as timer from './timer.js';

var clock = new timer.Clock();
var settingTime = new timer.Clock();

window.addEventListener("load", function () { init(); } );

function displayClock(time) {
	document.getElementById("clock").textContent = timer.formatTimeHMS(time);
}

function init() {
	clock.on("tick", displayClock);
	
	settingTime.on("tick", displayTime);
	document.body.on("keypress", showSettings);
	document.getElementById("year").on("change", changeTime);
	document.getElementById("month").on("change", changeTime);
	document.getElementById("day").on("change", changeTime);
	document.getElementById("hour").on("change", changeTime);
	document.getElementById("minute").on("change", changeTime);
	document.getElementById("second").on("change", changeTime);
	document.getElementById("apply").on("click", applySettings);
	document.getElementById("cancel").on("click", hideSettings);
}

function showSettings(event) {
	if (event.key == "Enter") {
		settingTime.setTime(clock.getTime());

		document.body.off("keypress", showSettings);
		document.getElementById("settings").style.visibility='visible';
		document.getElementById("settings").on("keypress", keySettings);
		document.getElementById("hour").focus();
		
		event.stopPropagation();
	}
}

function keySettings(event) {
	if (event.key == "Enter") {
		applySettings(event);
		event.stopPropagation();
	}
	else if (event.key == "Escape") {
		hideSettings(event);
		event.stopPropagation();
	}
}

function hideSettings(event) {
	event.target.blur();
	document.getElementById("settings").style.visibility='hidden';
	document.getElementById("settings").off("keypress", keySettings);
	document.body.on("keypress", showSettings);
}

function applySettings(event) {
	clock.setTime(settingTime.getTime());
	hideSettings(event);
}

function displayTimeExcept(time, except) {
	if (except != "year") 
		document.getElementById("year").value = timer.format00(time.getFullYear());
	if (except != "month") 
		document.getElementById("month").value = timer.format00(time.getMonth() + 1);
	if (except != "day") 
		document.getElementById("day").value = timer.format00(time.getDate());
	if (except != "hour") 
		document.getElementById("hour").value = timer.format00(time.getHours());
	if (except != "minute") 
		document.getElementById("minute").value = timer.format00(time.getMinutes());
	if (except != "second") 
		document.getElementById("second").value = timer.format00(time.getSeconds());
}

function displayTime(time) {
	displayTimeExcept(time, document.activeElement.id);
}

function changeTime(event) {
	var current = settingTime.getTime();
	var time = new Date(
		event.target.id=="year" ? document.getElementById("year").value : current.getFullYear(),
		event.target.id=="month" ? document.getElementById("month").value - 1 : current.getMonth(),
		event.target.id=="day" ? document.getElementById("day").value : current.getDate(),
		event.target.id=="hour" ? document.getElementById("hour").value : current.getHours(),
		event.target.id=="minute" ? document.getElementById("minute").value : current.getMinutes(),
		event.target.id=="second" ? document.getElementById("second").value : current.getSeconds(),
		current.getMilliseconds()
	);
	settingTime.setTime(time);
	displayTimeExcept(time, null);
}
