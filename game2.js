
class blocks {
  constructor(posspeed,possize){
    this.x=width;
    this.y=random(0,height);
    this.speed=posspeed;
    this.size=possize;
    this.thecolor=color(random(0,255),random(0,255),random(0,255));
  }
  move(){
    this.x-=this.speed;
    if(score>50) this.y+= 20*(noise(this.x/100)-0.5);
    fill(this.thecolor);
    circle(this.x,this.y,this.size);
    fill(255);
  }
  distance(){
    return dist(mouseX,mouseY,this.x,this.y);
    
  }
}


let dead=false;
let frame=0;
let cnv;
let img;
let score=0;
let obstacle=[];
function preload(){
  img=loadImage('img/badguy2.png');
}
function setup(){
  cnv= createCanvas(windowWidth,windowHeight);
  cnv.parent('game');
  imageMode(CENTER);
  textAlign(CENTER,CENTER);
  textSize(50);
  obstacle[0]= new blocks(1,100);
  obstacle[1]= new blocks(10,100);
}

let button;
function draw(){
 
  background(0);
  if(!dead){ 
    play();
  }else{
    text("score :"+score,width/2,height/10);
    button.mousePressed(newgame);
    
  }
 
}

//detect collisions
function detect(){
  for(let i=0;i<obstacle.length;i++){
    if (obstacle[i].distance()<img.width*0.17){
      dead=true;
      addbutton();
      frame=0;
    }
  }
}


//detect if its out of the screen
function out(){
  for(let i=0;i<obstacle.length;i++){
    if (obstacle[i].x<0){
      obstacle.splice(i,1);
    }
  }

}

function play(){
  
  frame+=1;
 //add blocks
  if(frame%(50-int(frame/100))==0){
    obstacle[obstacle.length]= new blocks(random(1,15+int(frame/100)),random(10,200));
    score++;
  }
  
  
  //move blocks
  for(let i=0;i<obstacle.length;i++){
    obstacle[i].move();
  }
  //circle(mouseX,mouseY,img.width*0.17);
  //draw the player
  push();
  translate(mouseX,mouseY);
  scale(0.2);
  image(img,0,0);
  pop();
  
  //score
  text("score :"+score,width/2,height/10);
  
  //tests
  detect();
  out();
}

function addbutton(){
   button = createButton('Try again');
   button.size(200,200);
   button.style('background-color',color(88,224,68));
   button.style('font-size','50px');
   button.position(width/2-button.width/2,height/2-button.height/2);
}
function newgame(){
  dead=false;
  score=0;
  obstacle=[];
  button.remove();
}
