var img;
var imgMask;
var fullImg;
var ratio;
var fsh, fsW;
var masker;
var bg, msk, msk2, fg, i1, i2, i3, care;

var offset

function preload() {
	bg = loadImage("assets/forest.jpg");
	msk = loadImage("assets/shine-alpha.png");
	fg = loadImage("assets/shine.jpg");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	ratio = fg.height / fg.width;
	//fsW = windowWidth + 200;
	//fsH = fsW * ratio;
	fsH = windowHeight + 200;
	fsW = fsH * 2;
  imageMode(CENTER);
  offset = 0;
}

function draw() {
	background(255);

	var mm = map(mouseX, 0, width, -100, 100);
	var mx = map(mouseY, 0, width, 100, -100);
	var mz = (width/2)+mx;

	image(bg, mz, height/2,fsW, fsH);

	fg.loadPixels();
	fg.updatePixels(mm, 0, fsW, fsH);
	fg.mask(msk);
	image(fg, width/2, height/2, fsW, fsH);
  fg.updatePixels(0, 0, fsW, fsH);

  offset += 5;

}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	fsH = windowHeight + 200;
	fsW = fsH * 2;
}
