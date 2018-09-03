// format time for display
function formatTimeFragment(f) {
	if (isNaN(f)) {
		return '\u2013\u2013';
	}
	else if (f < 10) {
		return '0' + f;
	}
	else {
		return f;
	}
}

function formatTimeHMS(h, m, s) {
	return formatTimeFragment(h) + ':' + formatTimeFragment(m) + ':' + formatTimeFragment(s);
}

function formatTimeHM(h, m, s) {
	return formatTimeFragment(h) + ':' + formatTimeFragment(m);
}

function formatDurationHMS(h, m, s) {
	return formatTimeFragment(h) + 'h' + formatTimeFragment(m) + 'm' + formatTimeFragment(s) + 's';
}

function formatDurationHM(h, m, s) {
	return formatTimeFragment(h) + 'h' + formatTimeFragment(m) + 'm';
}

// timer class - Clock display

export class Clock {
	constructor(node) {
		// initialise time
		this.offset = localStorage.getItem("TimeOffset") ? localStorage.getItem("TimeOffset") : 0;
		this.formatTime = formatTimeHMS;

		// create time text node
		this.display = document.createTextNode('');
		node.appendChild(this.display);

		// initialise clock display and update
		var clock = this;
		this.tick();
		this.timer = setInterval(function() { clock.tick(); }, 1000);
	}

	// calculate current time
	getTime() {
		return new Date(Date.now() + this.offset);
	}

	// set the timer
	setTime(time) {
		this.offset = time - Date.now()
		localStorage.setItem("TimeOffset", this.offset);
	}

	// display current time
	tick() {
		var now = this.getTime();
		this.display.textContent = this.formatTime(now.getHours(), now.getMinutes(), now.getSeconds());
	}
}
