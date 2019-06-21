let symbols = [];
let generators = [];
let columns = 10;

function setup() {
    createCanvas(300, 300);
}

function draw() {
    clear();

    if (random() > 0.95) {
        let x = floor(random() * (columns + 1)) * Symbol.size;
        generators.push(new Generator(x, 500));
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
