let length1 = 150;
let length2 = 125;
let mass1 = 20;
let mass2 = 20;
let angle1 = 0;
let angle2 = 0;
let angularVelocity1 = 0;
let angularVelocity2 = 0;
let gravitationPull = 0.8;

let pointX = -1;
let pointY = -1;
let translateX, translateY;
let color = 255;
let forward = true;
let canvas;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  pixelDensity(1);
  angle1 = PI / 2;
  angle2 = PI / 2;
  translateX = width / 2;
  translateY = 150;
  canvas = createGraphics(width, height);
  canvas.background(0);
  canvas.translate(translateX, translateY);
}

function draw() {
  background(255);
  imageMode(CORNER);
  image(canvas, 0, 0, width, height);

  //For blob 1
  let number1 = -gravitationPull * (2 * mass1 + mass2) * sin(angle1);
  let number2 = -mass2 * gravitationPull * sin(angle1 - 2 * angle2);
  let number3 = -2 * sin(angle1 - angle2) * mass2;
  let number4 = angularVelocity2 * angularVelocity2 * length2 + angularVelocity1 * angularVelocity1 * length1 * cos(angle1 - angle2);
  let denominator = length1 * (2 * mass1 + mass2 - mass2 * cos(2 * angle1 - 2 * angle2));
  let angularAccelaration1 = (number1 + number2 + number3 * number4) / denominator;

  //For blob 2
  number1 = 2 * sin(angle1 - angle2);
  number2 = (angularVelocity1 * angularVelocity1 * length1 * (mass1 + mass2));
  number3 = gravitationPull * (mass1 + mass2) * cos(angle1);
  number4 = angularVelocity2 * angularVelocity2 * length2 * mass2 * cos(angle1 - angle2);
  denominator = length2 * (2 * mass1 + mass2 - mass2 * cos(2 * angle1 - 2 * angle2));
  let angularAccelaration2 = (number1 * (number2 + number3 + number4)) / denominator;

  translate(translateX, translateY);
  stroke(0);
  strokeWeight(2);

  let x1 = length1 * sin(angle1);
  let y1 = length1 * cos(angle1);

  let x2 = x1 + length2 * sin(angle2);
  let y2 = y1 + length2 * cos(angle2);

  //For rod 1
  stroke(255);
  line(0, 0, x1, y1);
  noStroke();
  fill(57, 255, 20);
  ellipse(x1, y1, mass1, mass1);

  //For rod 2
  stroke(255);
  line(x1, y1, x2, y2);
  noStroke();
  fill(57, 255, 20);
  ellipse(x2, y2, mass2, mass2);

  angularVelocity1 += angularAccelaration1;
  angularVelocity2 += angularAccelaration2;
  angle1 += angularVelocity1;
  angle2 += angularVelocity2;

  canvas.stroke(0);
  if (frameCount > 1) {
    canvas.strokeWeight(1);
    canvas.stroke(0, color*pointY/(length1+length2), color*pointY/(length1+length2));
    canvas.line(pointX, pointY, x2, y2);
  }

  pointX = x2;
  pointY = y2;
}