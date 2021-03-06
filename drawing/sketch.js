var mainCursor;

var countCursors;
var cursors = [];

var clr = {};

function setCursorCount(num) {
    cursors = [];
    cursors.push(mainCursor);
    countCursors = num;
    for (var i = 1; i < countCursors; i++) {
        cursors.push(new Cursor(0, 0));
    }
}

let lastWidth, lastHeight;
function setup() {
    lastWidth = windowWidth * 0.9;
    lastHeight = windowHeight * 0.9;
    createCanvas(lastWidth, lastHeight);
    background(51);
    angleMode(DEGREES);
    mainCursor = new Cursor(mouseX, mouseY);
    clr = {
        r: 0,
        g: 0,
        b: 0
    };
    setCursorCount(6);
}

function setCursors() {
    deltaX = mainCursor.x - width / 2;
    deltaY = mainCursor.y - height / 2;
    angleInc = 360 / countCursors;
    angle = degrees(Math.atan2(deltaY, deltaX));

    distance = sqrt((mainCursor.x - width / 2) ** 2 + (mainCursor.y - height / 2) ** 2);

    for (var i = 1; i < countCursors; i++) {
        angle += angleInc;
        var x = cos(angle) * distance + width / 2;
        var y = sin(angle) * distance + height / 2;

        cursors[i].setPos(x, y);
    }
}

function updateScreenSize() {
    if (lastWidth != windowWidth * 0.9 ||
        lastHeight != windowHeight * 0.9) {
        lastWidth = windowWidth * 0.9;
        lastHeight = windowHeight * 0.9;
        resizeCanvas(lastWidth, lastHeight);
        background(51);
    }
}

function draw() {
    updateScreenSize();
    fill(255, 120, 0);
    noStroke();

    mainCursor.setPos(mouseX, mouseY);

    if (frameCount % 5 == 0) {
        clr.r = random() * 255;
        clr.g = random() * 255;
        clr.b = random() * 255;
    }
    for (var i = 0; i < countCursors; i++) {
        cursors[i].setColor(clr);
    }

    if (mouseIsPressed) {
        setCursors();
        for (var i = 0; i < countCursors; i++) {
            cursors[i].trail();
        }
    } else {
        for (var i = 0; i < countCursors; i++) {
            cursors[i].reset();
        }
    }

}
