const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let mouseControlled = true;
let showPlayer = true;
let removeTops = false;
let showInfo = true;

const PLAYER = {
  radius: 100,
  pos: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
};
const PLAYER_MAX_VELOCITY = 0.7;

const GHOST = {
  radius: 10,
  color: '#ffffff20',
  pos: { x: 400, y: 400 },
  velocity: { x: 0, y: 0 },
};
const GHOST_MAX_VELOCITY = 10;

function preload() {
  origImg = loadImage('assets/forest/forest.jpg');
  img = loadImage('assets/forest/forest.jpg');
  imgMask = loadImage('assets/forest/forest-alpha4.png');

  shineMask = loadImage('assets/shine-alpha.png');
  shineImg = loadImage('assets/forest/forest-bright.jpg');
}

function setup() {
  canvas = createCanvas(WIDTH, HEIGHT);
  ctx = canvas.drawingContext;

  fireflies = new FireflyManager({ drawShine: drawShine });
  fireflies2 = new FireflyManager({ drawShine: drawShine });
  fireflies3 = new FireflyManager({ drawShine: drawShine });

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
  image(origImg, 0, 0);

  if (showPlayer) {
    drawPlayer();
  }

  if (false) {
    drawGhost();
  }

  if (true) {
    fireflies.update();
    fireflies2.update();
    fireflies3.update();
  }

  if (!removeTops) {
    image(img, 0, 0);
  }

  if (showInfo) {
    drawInfo();
  }

}

function drawInfo() {
  fill(255, 255, 255, 100);
  textSize(16);
  text('controller (c): ' + (mouseControlled ? 'mouse' : 'keyoard'), 50, HEIGHT - 125);
  text('remove tree tops (t): ' + removeTops, 50, HEIGHT - 100);
  text('switch flashlight on/off (f): ' + showPlayer, 50, HEIGHT - 75);
  text('show/hide this info (i)', 50, HEIGHT - 50);

  text('switch to labyrinth (1)', WIDTH - 220, HEIGHT - 50);
}

function drawPlayer() {
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

  const d = PLAYER.radius * 2;
  const x = PLAYER.pos.x - PLAYER.radius;
  const y = PLAYER.pos.y - PLAYER.radius;

  drawShine(x, y, d);
}

function drawShine(x, y, d) {
  const shineImgMasked = createImage(d, d);
  shineImgMasked.copy(shineImg, x, y, d, d, 0, 0, d, d);
  shineImgMasked.mask(shineMask);
  image(shineImgMasked, x, y);
}

function drawGhost() {
  GHOST.pos.x += GHOST.velocity.x;
  GHOST.pos.y += GHOST.velocity.y;
  GHOST.velocity.x *= 0.9;
  GHOST.velocity.y *= 0.9;

  if (GHOST.pos.x + GHOST.radius < 0) {
    GHOST.pos.x = WIDTH + GHOST.radius;
  }

  if (GHOST.pos.x - GHOST.radius > WIDTH) {
    GHOST.pos.x = 0 - GHOST.radius;
  }

  if (GHOST.pos.y - GHOST.radius < 0) {
    GHOST.pos.y = HEIGHT + GHOST.radius;
  }

  if (GHOST.pos.y - GHOST.radius > HEIGHT) {
    GHOST.pos.y = 0;
  }

  fill(GHOST.color);
  circle(GHOST.pos.x, GHOST.pos.y, GHOST.radius * 2);

  const incX = map(Math.random(), 0, 1, -GHOST_MAX_VELOCITY, GHOST_MAX_VELOCITY);
  const incY = map(Math.random(), 0, 1, -GHOST_MAX_VELOCITY, GHOST_MAX_VELOCITY);
  GHOST.velocity.x += incX;
  GHOST.velocity.y += incY;
}

function keyboard() {
  if (!keyIsPressed) {
    return false;
  }

  // check direction keys
  switch (keyCode) {
    case UP_ARROW:
      PLAYER.velocity.y -= PLAYER_MAX_VELOCITY;
      break;
    case LEFT_ARROW:
      PLAYER.velocity.x -= PLAYER_MAX_VELOCITY;
      break;
    case DOWN_ARROW:
      PLAYER.velocity.y += PLAYER_MAX_VELOCITY;
      break;
    case RIGHT_ARROW:
      PLAYER.velocity.x += PLAYER_MAX_VELOCITY;
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
    case "f":
      showPlayer = !showPlayer;
      break;
    case "t":
      removeTops = !removeTops;
      break;
    case "c":
      mouseControlled = !mouseControlled;
      document.body.classList.toggle('show-cursor', !mouseControlled);
      break;
    case "i":
      showInfo = !showInfo;
      break;
    case "1":
      window.location.href = '/index.html';
      break;
  }
}
