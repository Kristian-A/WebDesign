class Symbol {

    constructor(x, y, color) {
        this.x = x;
        this.y = y;

        this.char = String.fromCharCode(0x30A0 + round(random(96)));
        this.color(100, 0, 255);
        this.alpha = 255;
        this.highlighted = false;
    }

    mutate() {
        if (random() > .98) {
            this.char = String.fromCharCode(0x30A0 + round(random(96)));
        }
    }

    draw() {
        let {r, g, b} = this.col
        if (this.highlighted) {
            fill(255);
        } else {
            fill(r, g, b, this.alpha);
        }
        this.alpha -= 4;
        this.mutate();
        textSize(Symbol.size);
        text(this.char, this.x, this.y);
    }

    toDestroy() {
        return this.alpha <= 0;
    }

    color(r, g, b) {
        this.col = {r: r, g: g, b: b};
    }
}

Symbol.size = 40;
