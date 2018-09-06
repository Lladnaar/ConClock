// Event Emitter

export class EventEmitter {
	constructor() {
		this.listeners = {};
	}
	
	on(event, newlistener) {
		if (!(event in this.listeners))
			this.listeners[event] = [];
		this.listeners[event].push(newlistener);
		return this;
	}
	
	addListener(event, newlistener) { return on(event, newlistener); }
	
	off(event, oldlistener) {
		if (event in this.listeners)
			this.listeners[event].forEach(function(listener) {
				if (oldlistener === listener)
					this.listeners[event].splice(listener, 1);
			});
		return this;
	}
	
	removeListener(event, oldlistener) { return off(event, oldlistener); }

	emit(event, data) {
		if (event in this.listeners)
			this.listeners[event].forEach(function(listener) { listener(data); });
		return this;
	}
}
