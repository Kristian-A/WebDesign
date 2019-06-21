Cursor = function(x, y) {
	this.x = x;
	this.y = y;

	this.lx = undefined;
	this.ly = undefined;

	this.colorOff = 0;

	this.show = function() {
		noStroke();
		color(255);
		ellipse(this.x, this.y, 10, 10);
	}

	this.trail = function() {
		if (this.lx == null) {
			this.lx = this.x;
			this.ly = this.y;
		}
		strokeWeight(8);
		let r = 250 - this.colorOff > 0 ? 250 - this.colorOff : 0;
		let g = 120 - this.colorOff > 0 ? 120 - this.colorOff : 0;
		stroke(r, g, 0);
		line(this.x, this.y, this.lx, this.ly);
		this.lx = this.x;
		this.ly = this.y;

		this.colorOff += 2;
	}

	this.reset = function() {
		this.lx = null;
		this.ly = null;
		this.colorOff = 0;
	}

	this.setPos = function(x, y) {
		this.x = x;
		this.y = y;
	}

	this.setColor = function(clr) {
		this.clr = clr
	}
}
