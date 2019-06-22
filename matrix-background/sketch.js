let symbols = [];
let generators = [];
let columns;

function setup() {
    createCanvas(windowWidth*0.98, windowHeight*0.98);
    columns = width/Symbol.size - 1;
}

function windowResized() {
    resizeCanvas(windowWidth*0.98, windowHeight*0.98);
    columns = width/Symbol.size - 1;
}

function draw() {
    clear();

    if (random() > 0.8) {
        let x = floor(random() * columns) * Symbol.size;
        let available = true;
        for (let gen of generators) {
            if (gen.x == x) {
                available = false;
                break;
            }
        }
        if (available) {
            generators.push(new Generator(x, height+10));
        }
    }

    for (let generator of generators) {
        if (generator.toDestroy()) {
            generators.splice(generators.indexOf(generator), 1);
            continue;
        }
        if (generator.update()) {
            symbols.push(generator.generate());
        }
    }

    for (let symbol of symbols) {
        if (symbol.toDestroy()) {
            symbols.splice(symbols.indexOf(symbol), 1);
            continue;
        }
        symbol.draw();
        symbol.mutate();
    }
}
