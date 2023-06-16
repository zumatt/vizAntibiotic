/*
   Visualizzazione dati per MAKEAWARE! - Spearhead.

       Creato da Matteo Subet - Ultima versione del giorno 16 giugno 2023

   SUPSI - Scuola Universitaria della Svizzera Italiana
   DACD  - Dipartimento Architettura Costruzioni e Design
   IDe   - Istituto di Design

*/

// Code based on: array of bouncing balls with vectors in a class by 2sman

let makeawarePeople = [];
var numBalls = 23;
let colors = ["#FF3A17", "#ABABAB", "#FF46ED"];
var antibioticDimension = 25;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  for (let i = 0; i < numBalls; i++){
    var speed = random(-3,4);
      makeawarePeople[i] = new Ball(
        random(30, 80),   //Dimension
        random(width),    //Random is ok forever
        random(height),   //Random is ok forever
        speed,            //Speed in x axis
        speed,            //Speed in y axis
        random(0,3));     //Color from array color
  }
}

function draw() {
  background("#EFEFEF");
  
  for (let i = 0; i < numBalls; i++){
    makeawarePeople[i].display();
    makeawarePeople[i].move();
    makeawarePeople[i].bounce();
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