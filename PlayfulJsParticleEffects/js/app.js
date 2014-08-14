/**
 * Created by backland on 13/08/2014.
 */

function Particle(x,y){
    this.x = this.oldX = x;
    this.y = this.oldY = y;

    var r = Math.round(255 * Math.random());
    var g = Math.round(255 * Math.random());
    var b = Math.round(255 * Math.random());

    this.color = 'rgb('+r+','+g+','+b+')';
}

Particle.prototype.integrate = function(){
    var velocityX = (this.x-this.oldX) * DAMPING;
    var velocityY = (this.y-this.oldY) * DAMPING;

    this.oldX = this.x;
    this.oldY = this.y;

    this.x += velocityX;
    this.y += velocityY;
}

Particle.prototype.attract = function(x,y){
    var dx = x - this.x;
    var dy = y - this.y;

    var distance = Math.sqrt(dx*dx+dy*dy);

    this.x += dx/distance;
    this.y += dy/distance;
}

Particle.prototype.draw = function(){


    ctx.strokeStyle = this.color;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(this.oldX, this.oldY);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
}


var display = document.getElementById('display');
var ctx = display.getContext('2d');
var particles = [];
var width = display.width = window.innerWidth;
var height = display.height = window.innerHeight;
var mouse = { x: width * 0.5, y: height * 0.5 };

var DAMPING = 1;

for(var i = 0; i < 100; i ++){
    particles[i] = new Particle(Math.random()*width, Math.random()*height);
}

display.addEventListener('mousemove', onMouseMove);

function onMouseMove(e){
    mouse.x = e.clientX;
    mouse.y = e.clientY;
}

requestAnimationFrame(frame);

function frame(){
    requestAnimationFrame(frame);
    //DAMPING-=0.0001;
    ctx.clearRect(0,0,width,height);
    for(var i = 0; i < particles.length; i++){
        particles[i].attract(Math.random()*width, Math.random()*height);
        particles[i].integrate();
        particles[i].draw();
    }
}