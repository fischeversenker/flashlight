/* GLOBALS, DEFAULTS, */

let ORIG_IMG_SRC,
    DARK_IMG_SRC,
    MASK_IMG_SRC,
    SHINE_MASK_IMG_SRC,
    SHINE_IMG_SRC;

const DEFAULT_PLAYER = {
  radius: 50,
  pos: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
  maxVelocity: 1,
};

const DEFAULT_CONFIG = {
  fireflies: true,
  fireflySwarmCount: 1,
  mouseControlled: true,
  showPlayer: true,
  removeTops: false,
  showInfo: true,
}

let Config,
    Player;

let origImg, img, imgMask, shineMask, shineImg;

function getImageSources() {
  let orig, dark, mask, shineMask, shine;
  orig = ORIG_IMG_SRC || 'assets/forest/forest.jpg';
  dark = DARK_IMG_SRC || 'assets/forest/forest3.jpg';
  mask = MASK_IMG_SRC || 'assets/forest/forest-alpha4.png';
  shineMask = SHINE_MASK_IMG_SRC || 'assets/shine-alpha.png';
  shine = SHINE_IMG_SRC || 'assets/forest/forest-bright3.jpg';
  return { orig, dark, mask, shineMask, shine };
}

/* p5 lifecycle hooks */

function preload() {
  const imageSrcs = getImageSources();
  origImg = loadImage(imageSrcs.orig);
  img = loadImage(imageSrcs.dark);
  imgMask = loadImage(imageSrcs.mask);

  shineMask = loadImage(imageSrcs.shineMask);
  shineImg = loadImage(imageSrcs.shine);
}

function setup() {
  Config = {
    ...DEFAULT_CONFIG,
    ...CONFIG,
  };
  Player = {
    ...DEFAULT_PLAYER,
    ...PLAYER,
  };
  createCanvas(windowWidth, windowHeight);

  if (Config.fireflies) {
    fireflies = new FireflyManager({ drawShine }, Config.fireflyConfig);
  }

  resizeImages();

  img.mask(imgMask);

  noStroke();
  frameRate(30);
}

function draw() {
  image(origImg, 0, 0);

  if (Config.showPlayer) {
    drawPlayer();
  }

  if (Config.fireflies && fireflies) {
    fireflies.update();
  }

  if (!Config.removeTops) {
    image(img, 0, 0);
  }

  if (Config.showInfo) {
    drawInfo();
  }
}

function keyPressed() {
  // check command keys
  switch (key) {
    case "r":
      Player.pos = { x: 0, y: 0 };
      Player.velocity = { x: 0, y: 0 };
      break;
    case "f":
      Config.showPlayer = !Config.showPlayer;
      break;
    case "k":
      toggleFullscreen();
      break;
    case "t":
      Config.removeTops = !Config.removeTops;
      break;
    case "c":
      Config.mouseControlled = !Config.mouseControlled;
      document.body.classList.toggle('show-cursor', !Config.mouseControlled);
      break;
    case "i":
      Config.showInfo = !Config.showInfo;
      break;
    case "1":
      window.location.href = '/labyrinth.html';
      break;
    case "2":
      window.location.href = '/forest.html';
      break;
    case "3":
      window.location.href = '/city1.html';
      break;
  }
}

function windowResized() {
  resizeImages();
}

/* custom (helper) functions */

function drawInfo() {
  fill(255, 255, 255, 100);
  textSize(16);
  textAlign(LEFT);
  text('controller (c): ' + (Config.mouseControlled ? 'mouse' : 'keyoard'), 50, windowHeight - 175);
  text('remove tree tops (t): ' + Config.removeTops, 50, windowHeight - 150);
  text('switch flashlight on/off (f): ' + Config.showPlayer, 50, windowHeight - 125);
  text('kiosk mode (fullscreen) (k)', 50, windowHeight - 100);
  text('show/hide this info (i)', 50, windowHeight - 75);

  textAlign(RIGHT);
  text('switch to labyrinth (1)', windowWidth - 50, windowHeight - 100);
  text('switch to forest (2)', windowWidth - 50, windowHeight - 75);
  text('switch to city (3)', windowWidth - 50, windowHeight - 50);
}

function drawPlayer() {
  if (!Config.mouseControlled) {
    keyboard();
    Player.pos.x += Player.velocity.x;
    Player.pos.y += Player.velocity.y;
    Player.velocity.x *= 0.9;
    Player.velocity.y *= 0.9;
  } else {
    Player.pos.x = mouseX;
    Player.pos.y = mouseY;
  }

  const d = Player.radius * 2;
  const x = Player.pos.x - Player.radius;
  const y = Player.pos.y - Player.radius;

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
      Player.velocity.y -= Player.maxVelocity;
      break;
    case LEFT_ARROW:
      Player.velocity.x -= Player.maxVelocity;
      break;
    case DOWN_ARROW:
      Player.velocity.y += Player.maxVelocity;
      break;
    case RIGHT_ARROW:
      Player.velocity.x += Player.maxVelocity;
      break;
  }
}

function resizeImages() {
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
  createCanvas(windowWidth, windowHeight);
}
