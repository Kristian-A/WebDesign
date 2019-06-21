class Symbol {

    constructor(x, y, color) {
        this.x = x;
        this.y = y;

        this.char = String.fromCharCode(0x30A0 + round(random(96)));
        this.color = [255, 120, 0];
        this.alpha = 255;
    }

    mutate() {
        if (random() > .95) {
            this.char = String.fromCharCode(0x30A0 + round(random(96)));
        }
    }

    draw() {
        fill(this.color[0], this.color[1], this.color[2], this.alpha);
        this.alpha -= 4;
        this.mutate();
        textSize(Symbol.size);
        text(this.char, this.x, this.y);
    }

    toDestroy() {
        return this.alpha <= 0;
    }
}

Symbol.size = 25;
