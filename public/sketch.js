const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let mouseControlled = true;
let showPlayer = true;
let removeTops = false;

const PLAYER = {
  radius: 150,
  color: '#ffe89e',
  pos: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
};

function preload() {
  origImg = loadImage('assets/forest.jpg');
  img = loadImage('assets/forest.jpg');
  imgMask = loadImage('assets/forest-alpha4.png');

  shineMask = loadImage('assets/shine-alpha.png');
  shineImg = loadImage('assets/forest-bright.jpg');
}

function setup() {
  canvas = createCanvas(WIDTH, HEIGHT);
  ctx = canvas.drawingContext;

  const windowRatio = WIDTH / HEIGHT;
  const imgRatio = origImg.width / origImg.height;
  if (windowRatio < imgRatio) {
    origImg.resize(0, HEIGHT);
    shineImg.resize(0, HEIGHT);

    img.resize(0, HEIGHT);
    imgMask.resize(0, HEIGHT);
  } else {
    origImg.resize(WIDTH, 0);
    shineImg.resize(WIDTH, 0);

    img.resize(WIDTH, 0);
    imgMask.resize(WIDTH, 0);
  }

  img.mask(imgMask);

  noStroke();
  frameRate(30);
}

function draw() {
  if (!mouseControlled) {
    keyboard();
    PLAYER.pos.x += PLAYER.velocity.x;
    PLAYER.pos.y += PLAYER.velocity.y;
    PLAYER.velocity.x *= 0.9;
    PLAYER.velocity.y *= 0.9;
  } else {
    PLAYER.pos.x = mouseX;
    PLAYER.pos.y = mouseY;
  }

  image(origImg, 0, 0);

  if (showPlayer) {
    drawPlayer();
  }

  if (!removeTops) {
    image(img, 0, 0);
  }

  drawInfo();
}

function drawInfo() {
  fill(255, 255, 255, 100);
  textSize(20);
  text('controller (c): ' + (mouseControlled ? 'mouse' : 'keyoard'), 50, HEIGHT - 110);
  text('remove tree tops (t): ' + removeTops, 50, HEIGHT - 80);
  text('show flashlight (f or p): ' + showPlayer, 50, HEIGHT - 50);
}

function drawPlayer() {
  const d = PLAYER.radius * 2;
  const x = PLAYER.pos.x - PLAYER.radius;
  const y = PLAYER.pos.y - PLAYER.radius;

  const shineImgMasked = createImage(d, d);
  shineImgMasked.copy(shineImg, x, y, d, d, 0, 0, d, d);
  shineImgMasked.mask(shineMask);
  image(shineImgMasked, x, y);
}

function keyboard() {
  if (!keyIsPressed) {
    return false;
  }

  // check direction keys
  switch (keyCode) {
    case UP_ARROW:
      PLAYER.velocity.y -= 5;
      break;
    case LEFT_ARROW:
      PLAYER.velocity.x -= 5;
      break;
    case DOWN_ARROW:
      PLAYER.velocity.y += 5;
      break;
    case RIGHT_ARROW:
      PLAYER.velocity.x += 5;
      break;
  }
}

function keyPressed() {
  // check command keys
  switch (key) {
    case "r":
      PLAYER.pos = { x: 0, y: 0 };
      PLAYER.velocity = { x: 0, y: 0 };
      break;
    case "p":
    case "f":
      showPlayer = !showPlayer;
      break;
    case "t":
      removeTops = !removeTops;
      break;
    case "c":
      mouseControlled = !mouseControlled;
      break;
  }
}
