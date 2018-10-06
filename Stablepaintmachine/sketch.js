var bubbles = [];
var showBg = true;
var fadein = false;
var fadeout = false;

//setting up some arbitrary initial values so that the program runs.
var count = 8;
var rad = 50;
var trans = 5;
var streak = 5;
var life = 10;
var lift = 5;
var grav = 5;
var spread = 5;
var redLow = 100;
var redHigh = 255;
var greenLow = 30;
var greenHigh = 180;
var blueLow = 100;
var blueHigh = 255;
var bgtrans = 0;



function setup() {
	//this used to be: createCanvas(windowWidth, windowHeight);
	canvas = createCanvas(window.innerWidth, window.innerHeight)
	frameRate(15);
  background(255);
	updateCount();

}

//function to set up new bubbles
function updateCount(){
  //bubbles = [];
	for (var i = 0; i < count; i++){
		var x = random(0, width);
		var y = random(0, height);
		bubbles [i] = new Bubble(x, y);
	}
}


//turns Particle mode on and off
function backgroundChange(){
	showBg = !showBg
}

function draw() {



//Dan Shiffman's function to resize canvas as window size changes.
window.onresize = function() {
  var w = window.innerWidth;
  var h = window.innerHeight;
  canvas.size(w,h);
  width = w;
  height = h;
}

//sets up bubbles and removes them if they are offscreen
	for (var i = bubbles.length -1; i > 0; i--){
		bubbles[i].show();
		bubbles[i].trail();
		bubbles[i].move();
		if (bubbles[i].offscreen > 0 && bubbles[i].history.length == 0) {
			bubbles.splice(i, 1);
		//	bubbles.push(new Bubble(random(0, width), random(0, height)));
		}
	}

	if (bubbles.length === 1){
		//setTimeout(updateCount, 3000);
		fadeout = true;
	}

	if (fadeout == true){
			bgtrans = bgtrans + 2;
		}

	if (fadeout == true && bgtrans >= 175){
				bgtrans = 0;
				fadeout = false;
				fadein = true;
				updateCount();
		}

	fill(255, bgtrans);
	noStroke();
	rect(0, 0, width, height);

}


//triggers parameters to show and hide
function keyPressed(){
	if (key == ' ') {
		HUDon = !HUDon
	}
}

//bubble class below
class Bubble{
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.Red = random(redLow, redHigh);
		this.Green = random(greenLow, greenHigh);
		this.Blue = random(blueLow, blueHigh);
		this.history = [];
		this.offscreen = 0;
		this.rad = random(rad * 0.25, rad * 1.75)
	}

	move(){
		//moves the bubble
		if (this.x > 0 - rad && this.x < windowWidth + rad && this.y > 0 - rad && this.y < windowHeight + rad){
			this.x = this.x + random (-life, life);
			this.y = this.y + random (-life, life);
		} else {
			this.offscreen = 1;
		}

		//history
		if (this.offscreen == 0){
		var v = createVector(this.x, this.y);
		this.history.push(v);
	}
		if (this.offscreen == 1 || this.history.length > streak){
			this.history.splice(0, 1);
		}

		// //move trail
		for (var i = 0; i < this.history.length; i++){
			this.history[i].y += random (-lift, grav);
			this.history[i].x += random (-spread, spread);
		}
	}
//end of move function

	show(){
		fill(this.Red, this.Green, this.Blue, trans);
		noStroke();
		ellipse(this.x, this.y, this.rad, this.rad);
	}

	trail(){
		fill(this.Red, this.Green, this.Blue, trans);
		for (var i = 0; i < this.history.length; i++){
			var pos = this.history[i];
			noStroke();
			ellipse(pos.x, pos.y, this.rad, this.rad);
		}
	}
}
