class Bird {
	static getX() {
		return 200;
	}

	static getHalfBest(birds) {
		birds.sort((a, b) => {
			return b.fitness-a.fitness;
		});
		let ret = [];
		for (let i = 0; i < COUNT/2; i++) {
			ret.push(birds[i]);
		}
		return ret;
	}
	static pickRandom(birds) {
		for (let bird of birds) {
		 	if (bird.fitness > random()) {
				return bird;
			}
		}
		return birds[birds.length-1];
	}
	static nextGeneration(birds) {
		let ret = Bird.getHalfBest(birds);
		ret = Bird.reincarnate(ret);
		for (let i = 0; i < COUNT/4; i++) {
			let pick = Bird.pickRandom(birds);
			let bird = new Bird(pick.brain.copy().mutate());
			ret.push(bird);
		}
		for (let i = 0; i < COUNT/4; i++) {
			ret.push(new Bird());
		}
		return ret;
	}

	static reincarnate(birds) {
		for (let bird of birds) {
			bird.alive = true;
		}
		return birds;
	}

	constructor(brain) {
		this.radius = 20;
		this.pos = createVector(200, 200);
		this.vel = createVector(0, -8);
		if (brain == null) {
			this.brain = new NeuralNetwork(4, 4, 1);
		} else {
			this.brain = brain.copy().mutate();
		}
		this.alive = true;

		this.score = 0;
		this.fitness = 0;
	}

	draw() {
		noStroke();
		fill(255, 120, 0, 100);
		circle(this.pos.x, this.pos.y, this.radius);
	}

	update() {
		this.score += 0.01;

		this.pos.add(this.vel);
		if (this.pos.y - this.radius <= 0) {
			this.kill();
		}
		if (this.pos.y + this.radius < height) {
			this.vel.add(gravity);
		} else {
			this.kill();
		}
	}

	decide(pipe) {
		// 1.y 2.yVel 3.pipeX 4.pipeGap
		let inputs = [
			map(this.pos.y, 0, height, 0, 1),
			map(this.vel.y, 0.5, -10, 0, 1),
			map(pipe.x, 0, width, 0, 1),
			map(pipe.upperH, 30, height-30, 0, 2)
		];
		let outputs = this.brain.query(inputs);
		if (outputs[0] > 0.5) {
			this.jump();
		}
	}

	jump() {
		this.vel.y = -8;
	}

	kill() {
		this.alive = false;
	}

	isAlive() {
		return this.alive;
	}

	addScore(score) {
		this.score += score;
	}

	calculateFitness(sum) {
		this.fitness = this.score/sum;
	}
}
