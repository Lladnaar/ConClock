import { EventEmitter } from './eventemitter.js';

// format time for display
export function format00(f) {
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

export function formatTimeHMS(h, m, s) {
	if (h instanceof Date)
		return formatTimeHMS(h.getHours(), h.getMinutes(), h.getSeconds());
	else
		return format00(h) + ':' + format00(m) + ':' + format00(s);
}

export function formatTimeHM(h, m, s) {
	if (h instanceof Date)
		return formatTimeHM(h.getHours(), h.getMinutes(), h.getSeconds());
	else
		return format00(h) + ':' + format00(m);
}

export function formatDurationHMS(h, m, s) {
	if (h instanceof Date)
		return formatDurationHMS(h.getHours(), h.getMinutes(), h.getSeconds());
	else
		return format00(h) + 'h' + format00(m) + 'm' + format00(s) + 's';
}

export function formatDurationHM(h, m, s) {
	if (h instanceof Date)
		return formatDurationHM(h.getHours(), h.getMinutes(), h.getSeconds());
	else
		return format00(h) + 'h' + format00(m) + 'm';
}

// timer class - Clock display

export class Clock extends EventEmitter {
	constructor() {
		super();
		
		// initialise clock
		this.offset = 0;
		this.timer = setInterval(function() { this.doTick(); }.bind(this), 500);
	}

	// calculate current time
	getTime() {
		return new Date(Date.now() + this.offset);
	}

	// set the timer
	setTime(time) {
		this.offset = time - Date.now()
		return this;
	}

	// display current time
	doTick() {
		this.emit('tick', this.getTime());
		return this;
	}
}
