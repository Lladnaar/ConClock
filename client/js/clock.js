import * as timer from './timer.js';

var clock;

window.addEventListener("load", function () { init(); } );

function settings(event) {
	var settings = document.getElementById("settings");
	settings.style.visibility='visible';
}

function init() {
	clock = new timer.Clock(document.getElementById("clock"));
	
	window.addEventListener("keypress", settings);
	
	//************************
	var now = new Date();
	setClock(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
	document.getElementById("year").addEventListener("change", updateClock);
	document.getElementById("month").addEventListener("change", updateClock);
	document.getElementById("day").addEventListener("change", updateClock);
	document.getElementById("hour").addEventListener("change", updateClock);
	document.getElementById("minute").addEventListener("change", updateClock);
	document.getElementById("second").addEventListener("change", updateClock);
	//************************
}

//************************
function setClock(y,m,d,h,n,s) {
	var time = new Date(y,m,d,h,n,s);
	document.getElementById("year").value = time.getFullYear();
	document.getElementById("month").value = time.getMonth() + 1;
	document.getElementById("day").value = time.getDate();
	document.getElementById("hour").value = time.getHours();
	document.getElementById("minute").value = time.getMinutes();
	document.getElementById("second").value = time.getSeconds();
}

function updateClock() {
	var time = new Date(
		document.getElementById("year").value,
		document.getElementById("month").value - 1,
		document.getElementById("day").value,
		document.getElementById("hour").value,
		document.getElementById("minute").value,
		document.getElementById("second").value
	);
	setClock(time.getFullYear(), time.getMonth(), time.getDate(), time.getHours(), time.getMinutes(), time.getSeconds());
}
//************************
