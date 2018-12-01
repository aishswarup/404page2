var numBalls = 700;
var spring = 0.075;
var gravity = 0.015;
var friction = -0.;
var balls = [];

function setup() {
  createCanvas(720, 400);
  for (var i = 0; i < numBalls; i++) {
    balls[i] = new Ball(
      random(width),
      random(height),
      random(30, 05, 03, 01, 20, 30),
      i,
      balls
    );
  }




  noStroke();
  fill(201, 255, 25, 149, 252, 214, 255, 255);
}




function draw() {
  background(242, 150, 2);
  balls.forEach(ball => {
    ball.collide();
    ball.move();
    ball.display();
  });

}


function Ball(xin, yin, din, idin, oin) {
  this.x = xin;
  this.y = yin;
  var vx = 0;
  var vy = 100;
  this.diameter = din;
  this.id = idin;
  this.others = oin;

  this.collide = function() {
    for (var i = this.id + 1; i < numBalls; i++) {
      // console.log(others[i]);
      var dx = this.others[i].x - this.x;
      var dy = this.others[i].y - this.y;
      var distance = sqrt(dx * dx + dy * dy);
      var minDist = this.others[i].diameter / 5 + this.diameter / 2;
      //   console.log(distance);
      //console.log(minDist);
      if (distance < minDist) {
        //console.log("2");
        var angle = atan2(dy, dx);
        var targetX = this.x + cos(angle) * minDist;
        var targetY = this.y + sin(angle) * minDist;
        var ax = (targetX - this.others[i].x) * spring;
        var ay = (targetY - this.others[i].y) * spring;
        vx -= ax;
        vy -= ay;
        this.others[i].vx += ax;
        this.others[i].vy += ay;
      }
    }
  };

  this.move = function() {
    vy += gravity;
    this.x += vx;
    this.y += vy;
    if (this.x + this.diameter / 2 > width) {
      this.x = width - this.diameter / 2;
      vx *= friction;
    } else if (this.x - this.diameter / 2 < 0) {
      this.x = this.diameter / 2;
      vx *= friction;
    }
    if (this.y + this.diameter / 2 > height) {
      this.y = height - this.diameter / 2;
      vy *= friction;
    } else if (this.y - this.diameter / 2 < 0) {
      this.y = this.diameter / 2;
      vy *= friction;
    }
  };

  this.display = function() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  };
}
