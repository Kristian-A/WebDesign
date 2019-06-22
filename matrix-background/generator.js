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
        // let r = map(this.x, 0, width, 100, 255);
        // let b = map(this.x, 0, width, 255, 0);

        let r = map(this.x, 0, width, 255, 0);
        let b = map(this.x, 0, width, 0, 255);

        let ret = new Symbol(this.x, this. y)
        ret.color(r, 30, b);
        return ret;
    }

    toDestroy() {
        return this.y < 0;
    }
}
