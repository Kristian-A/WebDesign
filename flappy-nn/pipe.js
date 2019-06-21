class Pipe {
	constructor() {
		this.gap = 150;
		this.width = width*0.1;
		this.x = width;

		let gapY = random(this.gap + height*0.1, height-this.gap - height*0.1);
		this.upperH = height - gapY;
		this.lowerH = height - gapY + this.gap;
		this.isPassed = false;
	}

	draw() {
		fill(0, 0, 255);
		rect(this.x, 0, this.width, this.upperH);
		rect(this.x, this.lowerH, this.width, height);
	}

	update() {
		this.x -= 3;
	}

	next() {
		return this.x < width/2;
	}

	toDestroy() {
		return this.x + this.width < 0;
	}

	collides(bird) {
		return (bird.pos.y - bird.radius < this.upperH || bird.pos.y + bird.radius > this.lowerH) &&
		 	   (bird.pos.x + bird.radius > this.x && bird.pos.x - bird.radius < this.x + this.width);
	}

	passed() {
		if (this.isPassed) {
			return false;
		}
		this.isPassed = this.x + this.width < 200;
		return this.isPassed;
	}
}
