class Clock {
	constructor(node) {
		this.text = document.createTextNode('');
		node.appendChild(this.text);
		
		var clock = this;
		this.timer = setInterval(function() { clock.tick(); }, 1000);
	}
	
	format(h, m, s) {
		return (h<10?'0':'') + h + ':' + (m<10?'0':'') + m + ':' + (s<10?'0':'') + s;
	}

	tick() {
		var date = new Date();
		this.text.textContent = this.format(date.getHours(), date.getMinutes(), date.getSeconds());
	}
}
