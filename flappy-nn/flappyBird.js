let gravity;
let birds = [];
let pipes = [];
let score = 0;

let currentPipe;
let COUNT = 100;

let generations = 0;
let gensperframe = 1;

function restart() {
	pipes = [];
	score = 0;

	currentPipe = new Pipe();
	pipes.push(currentPipe);
}

function setup() {
	background(51);
	createCanvas(1000, 600);
	gravity = createVector(0, 0.5);
	birds = [];
	for (let i = 0; i < COUNT; i++) {
		birds.push(new Bird());
	}
	currentPipe = new Pipe();
	pipes.push(currentPipe);

}

function draw() {
	background(51);
	for (let i = 0; i < gensperframe;) {
		for (let pipe of pipes) {
			pipe.update();
			pipe.draw();
			if (pipe.passed()) {
				score++;
			} else if (abs(pipe.x - Bird.getX()) < abs(currentPipe.x - Bird.getX())) {
				currentPipe = pipe;
			}
		};

		let aliveBirds = false;
		for (let bird of birds) {
			if (!bird.isAlive()) {
				continue;
			}
			aliveBirds = true;
			bird.update();
			bird.draw();
			bird.decide(currentPipe);
			if (currentPipe.collides(bird)) {
				// bird.addScore(score);
				bird.kill();
			}
		}

		if (!aliveBirds) {
			let sum = 0;
			for (let bird of birds) {
				sum += bird.score;
			}
			for (let bird of birds) {
				bird.calculateFitness(sum);
			}
			birds = Bird.nextGeneration(birds);
			generations++;
			i++;
			restart();
		}

		if (pipes[pipes.length-1].next()) {
			pipes.push(new Pipe());
		}

		if (pipes[0].toDestroy()) {
			pipes.splice(0, 1);
		}

		if (gensperframe == 1) {
			break;
		}
	}
	if (gensperframe > 1) {
		gensperframe = 1;
	}
	fill(255);
	stroke(0);
	strokeWeight(2);
	textSize(40);
	text("score: " + score, 20, height-50);
	text("generations: " + generations, 20, height-20);
}

function keyPressed() {
	if (key == " ") {
		gensperframe = 5;
	}
}
