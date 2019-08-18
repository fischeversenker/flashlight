let mouseControlled = true;
let showPlayer = true;
let removeTops = false;
let showInfo = true;

const PLAYER = {
  radius: 40,
  pos: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
};
const PLAYER_MAX_VELOCITY = 0.7;

function preload() {
  origImg = loadImage('assets/city1/city.jpg');
  img = loadImage('assets/city1/city.jpg');
  imgMask = loadImage('assets/city1/city-alpha.png');

  shineMask = loadImage('assets/shine-alpha.png');
  shineImg = loadImage('assets/city1/city-bright.jpg');
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  ctx = canvas.drawingContext;

  fireflies = new FireflyManager({ drawShine: drawShine });
  fireflies2 = new FireflyManager({ drawShine: drawShine });
  fireflies3 = new FireflyManager({ drawShine: drawShine });

  resize();

  img.mask(imgMask);

  noStroke();
  frameRate(30);
}

function draw() {
  background(100, 100, 100);
  image(origImg, 0, 0);

  if (showPlayer) {
    drawPlayer();
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
  textAlign(LEFT);
  text('controller (c): ' + (mouseControlled ? 'mouse' : 'keyoard'), 50, windowHeight - 175);
  text('remove tree tops (t): ' + removeTops, 50, windowHeight - 150);
  text('switch flashlight on/off (f): ' + showPlayer, 50, windowHeight - 125);
  text('kiosk mode (fullscreen) (k)', 50, windowHeight - 100);
  text('show/hide this info (i)', 50, windowHeight - 75);

  textAlign(RIGHT);
  text('switch to labyrinth (1)', windowWidth - 50, windowHeight - 75);
  text('switch to forest (2)', windowWidth - 50, windowHeight - 50);
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
    case "k":
      toggleFullscreen();
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
      window.location.href = '/labyrinth.html';
      break;
    case "2":
      window.location.href = '/forest.html';
      break;
  }
}

function resize() {
  const windowRatio = windowWidth / windowHeight;
  const imgRatio = origImg.width / origImg.height;
  if (windowRatio < imgRatio) {
    origImg.resize(0, windowHeight);
    shineImg.resize(0, windowHeight);
    img.resize(0, windowHeight);
    imgMask.resize(0, windowHeight);
  } else {
    origImg.resize(windowWidth, 0);
    shineImg.resize(windowWidth, 0);
    img.resize(windowWidth, 0);
    imgMask.resize(windowWidth, 0);
  }
  canvas = createCanvas(windowWidth, windowHeight);
  ctx = canvas.drawingContext;
}

function windowResized() {
  resize();
}
