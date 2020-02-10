// Open and connect socket
let socket = io();
// Create user directory
let users = {};

let balls = [];

// Listen for confirmation of connection
socket.on('connect', function() {
  console.log("Connected");
});

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  for (let i in balls) {
    balls[i] = new Ball();
  }

}

function draw() {

  for (var i = 0; i < balls.length; i++) {
    balls[i].update();
    balls[i].display();
    balls[i].bounce();
  }

  // Send mouse info
  socket.emit('data', {
    x: mouseX,
    y: mouseY
  });
}

function mousePressed() {
  // with each mouse press, create new ball at mouse location
  // this ball is added to the array
  balls.push(new Ball(mouseX, mouseY));
}

function Ball(x, y) {
  this.x = mouseX;
  this.y = y;
  this.sz = 15;
  this.yspeed = random(-2, 2);

  this.update = function() {
    this.y += this.yspeed;
  };

  this.display = function() {
    fill(255);
    stroke(0);
    ellipse(this.x, this.y, this.sz, this.sz);
  };

  this.bounce = function() {
    if (this.y > height || this.y < 0) {
      this.yspeed *= -1;
    }
  }
}
