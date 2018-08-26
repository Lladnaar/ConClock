class Timer {
	constructor(node) {
		this.node = node;
		
		var timer = this;
		this.timer = setInterval(function() { timer.tick(); }, 1000);
	}
	
	tick() {
		var date = new Date();
		this.node.textContent = date.getHours() + 'h' + date.getMinutes() + 'm' + date.getSeconds() + 's';
	}
}
