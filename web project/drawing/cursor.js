Cursor = function(x, y) {
	this.x = x;
	this.y = y;

	this.lx = undefined;
	this.ly = undefined;

	this.clr = [];

	this.show = function() {
		noStroke();
		color(255);
		ellipse(this.x, this.y, 10, 10);
	}

	this.trail = function() {
		if (this.y > height-100) {
			this.lx = null;
			return;
		}

		if (this.lx == null) {
			this.lx = this.x;
			this.ly = this.y;
		}
		strokeWeight(8);
		stroke(this.clr.r, this.clr.g, this.clr.b);
		line(this.x, this.y, this.lx, this.ly);
		this.lx = this.x;
		this.ly = this.y;
	}

	this.reset = function() {
		this.lx = null;
		this.ly = null;
	}

	this.setPos = function(x, y) {
		this.x = x;
		this.y = y;
	}

	this.setColor = function(clr) {
		this.clr = clr
	}
}
