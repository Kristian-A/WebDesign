class Generator {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    update() {
        if (frameCount % 5 == 0) {
            this.y -= Symbol.size;
            return 1;
        }
        return 0;
    }

    generate() {
        return new Symbol(this.x, this. y);
    }

    toDestroy() {
        return this.y < 0;
    }
}
