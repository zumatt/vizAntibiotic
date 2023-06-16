/*
   Visualizzazione dati per MAKEAWARE! - Spearhead.

       Creato da Matteo Subet - Ultima versione del giorno 16 giugno 2023

   SUPSI - Scuola Universitaria della Svizzera Italiana
   DACD  - Dipartimento Architettura Costruzioni e Design
   IDe   - Istituto di Design

*/

// Code based on: array of bouncing balls with vectors in a class by 2sman

let makeawarePeople = [];
var numBalls;
let colors = ["#FF3A17", "#ABABAB", "#FF46ED"];
var antibioticDimension = 25;
let ballMoving = true;

let font, fontsize = 17;

function preload(){
  font = loadFont('font/SuisseIntl-Medium.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //Debug for JSON file
  //console.log(abDimension); console.log(abSpeedX); console.log(abSpeedY); console.log(abColor);

  abDimension.forEach((element, index) => {
    if (element == undefined){
      console.error("In the JSON file, under the dimension row a value is missing. Check the item number " + (index + 1));
    }
  });
  abSpeedX.forEach((element, index) => {
    if (element == undefined){
      console.error("In the JSON file, under the speedX row a value is missing. Check the item number " + (index + 1));
    }
  });
  abSpeedY.forEach((element, index) => {
    if (element == undefined){
      console.error("In the JSON file, under the speedY row a value is missing. Check the item number " + (index + 1));
    }
  });
  abColor.forEach((element, index) => {
    if (element == undefined){
      console.error("In the JSON file, under the speedY row a value is missing. Check the item number " + (index + 1));
    } else if (element >= 3){
      console.error("To select the color insert a value between 0 and 2. In the item number " + (index + 1) + " you inserted the value " + element);
    }
  });

  numBalls = abDimension.length;
  
  for (let i = 0; i < numBalls; i++){
      makeawarePeople[i] = new Ball(
        abDimension[i],   //Dimension
        random(width),    //Random is ok forever
        random(height),   //Random is ok forever
        abSpeedX[i],            //Speed in x axis
        abSpeedY[i],            //Speed in y axis
        abColor[i]);     //Color from array color
  }

  textFont(font);
  textSize(fontsize);
  textAlign(CENTER, CENTER);

  let button = createButton("Is the antibiotic leaflet read?");
  button.position(30, height-70);
  button.mousePressed(onButtonClick);
  button.addClass("btn");
}

function draw() {
  background("#EFEFEF");

  push();
  textAlign(LEFT);
  fill(0);
  text("Exploring people's antibiotic consuption behaviour:", 30, height - 100);
  pop();

  if (!ballMoving){
    push();
    noFill();
    strokeWeight(1);
    stroke(colors[0]);
    square(50,50,250);
    stroke(colors[1]);
    square(width/2 - 125,height - 300,250);
    stroke(colors[2]);
    square(width - 300,50,250);
    pop();
  }
  
  for (let i = 0; i < numBalls; i++){
    makeawarePeople[i].display();
    if (ballMoving){
      console.log("Can move!");
      makeawarePeople[i].move();
      makeawarePeople[i].bounce();
    }
  }

}


class Ball {
  constructor(dimension, tempX, tempY, tempXspeed, tempYspeed, abColor) {
    this.position = createVector(tempX, tempY);
    this.velocity = createVector(tempXspeed, tempYspeed);
    this.dimension = dimension;
    var colorNumber = int(abColor);
    this.color = colors[colorNumber];
  }

  display() {
    strokeWeight(0);
    fill("#FFFFFF");
    circle(this.position.x, this.position.y, this.dimension);
    fill(this.color);
    circle(this.position.x, this.position.y, antibioticDimension);
  }

  move() {
    this.position.add(this.velocity);
  }

  bounce() {
    if ((this.position.x > width) || (this.position.x < 0)) {
      this.velocity.x = this.velocity.x * -1;
    }
    if ((this.position.y > height) || (this.position.y < 0)) {
      this.velocity.y = this.velocity.y * -1;
    }
  }
}

function onButtonClick(){
  ballMoving = false;

  for (let i = 0; i < numBalls; i++){
    if (makeawarePeople[i].color === colors[0]){
      makeawarePeople[i].position = createVector(random(50, 300),random(50, 300));
    } else if (makeawarePeople[i].color === colors[1]){
      makeawarePeople[i].position = createVector(random(width/2 - 125, width/2 + 125),random(height - 300, height - 50));
    } else if (makeawarePeople[i].color === colors[2]){
      makeawarePeople[i].position = createVector(random(width - 300, width - 50),random(50, 300));
    }
  }
}