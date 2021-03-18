
class spaceinvader {
  constructor(){
  this.x=random(width);
  this.y=random(height);
  this.speed=random(0.5,1.5);
  }
}
function preload(){
  img=loadImage('img/badguy2.png');
}
let army = [];
function setup(){
 cnv= createCanvas(windowWidth,windowHeight);
 cnv.parent('game');
 background(128);
  for(let i=0;i<10;i++){
    army[i]=new spaceinvader();
  }
  

}
function draw(){
  background(128);
  for(let i=0;i<army.length;i++){
    push();
    let indi=army[i];
    translate(indi.x,indi.y);
    let ag=atan2(mouseY-indi.y,mouseX-indi.x);
    //rotate(ag);
    scale(0.2);
    image(img,0,0);
    indi.x+=indi.speed*cos(ag);
    indi.y+=indi.speed*sin(ag);
    pop();
  }

}
