class Rover {
  width = 80
  height = 40
  
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  move(speed, angle){
    let dt = 0.1;
    this.x += speed*dt*cos(angle);
    this.y += speed*dt*sin(angle);
  }
}

let bg;
let trailCanvas;
let speedSlider;
let angleSlider;

let rover;

function setup() {
  createCanvas(800, 800);
  trailCanvas = createGraphics(800, 800);
  bg = loadImage('692002main_pia16130.jpg');

  speedSlider = createSlider(0, 10, 5, 0.1);
  speedSlider.position(10, 10);
  speedSlider.size(width/2, 10);

  angleSlider = createSlider(0, 2*PI, 0, 0.1);
  angleSlider.position(10, 40);
  angleSlider.size(width/2, 10);


  rover = new Rover(400, 400);
}

function draw() {
  background(bg);

  speed = speedSlider.value();
  angle = angleSlider.value();
  rover.move(speed, angle);

  //draws slider text
  fill(255, 255, 255, 123);
  noStroke();
  rect(480, 13, 100, 22, 5);
  rect(480, 40, 100, 22, 5);
  fill(0);
  textSize(20);
  text("Speed:" + speed.toString(), 480, 20);
  text("Angle:" + angle.toString(), 480, 47);

  // draws trail
  trailCanvas.strokeWeight(8);
  trailCanvas.stroke('#6f512f');
  let t1 = createVector(-rover.width/2, rover.height/3).rotate(angle);
  let t2 = createVector(-rover.width/2, -rover.height/3).rotate(angle);
  trailCanvas.point(rover.x + t1.x, rover.y + t1.y)
  trailCanvas.point(rover.x + t2.x, rover.y + t2.y)
  image(trailCanvas, 0, 0)
  // draws rover
  if (speed<3){fill(255, 0, 0)}
  else if (speed<7){fill(255, 255, 0)}
  else {fill(0, 255, 0)}

  translate(rover.x, rover.y)
  rotate(angle)
  rectMode(CENTER)
  rect(0, 0, rover.width, rover.height)

  fill(0)
  textAlign(CENTER)
  textSize(20)
  text('ROVER', 0, 5)
}
