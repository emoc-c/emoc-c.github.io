
class blocks {
  constructor(posspeed,possize){
    //id:0=normal
    //   1=assassin
    //   2=bait
    this.id=0;
    this.x=width;
    this.y=random(0,height);
    this.speed=posspeed;
    this.size=possize;
    this.thecolor=color(random(0,255),random(0,255),random(0,255));
  }
  move(){
    this.x-=this.speed;
    //assassin
    if(this.id==1){
     let ag=atan2(mouseY-this.y,mouseX-this.x);
     this.y+=this.speed*sin(ag);
     //bait
    }else if(this.id==2){
     let ag=atan2((mouseY+this.size+img.width*0.17)-this.y,mouseX-this.x);
     this.y+=this.speed*sin(ag);
      
    }
    //high speed
    else if(score>50) this.y+= 20*(noise(this.x/100)-0.5);
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
let high =0;
function preload(){
  img=loadImage('img/badguy2.png');
  high= getItem('highscore');
}
function setup(){
  cnv= createCanvas(windowWidth,windowHeight);
  cnv.parent('game');
  imageMode(CENTER);
  textAlign(CENTER,CENTER);
  textSize(50);
  //obstacle[0]= new blocks(1,100);
  //obstacle[1]= new blocks(10,100);
}

let button;
function draw(){
 
  background(0);
  if(!dead){ 
    play();
  }else{
    text("score :"+score,width/2,height/10);
    text("highscore :"+high,width/2,2*height/10);
    button.mousePressed(newgame);
    
  }
 
}

//push other blocks
function pushother(){
  for(let i=0;i<obstacle.length;i++){
    for(let j=0;j<obstacle.length;j++){
      if(i!=j && dist(obstacle[i].x,obstacle[i].y,obstacle[j].x,obstacle[j].y)<obstacle[i].size/2 + obstacle[j].size/2 && obstacle[i].x<obstacle[j].x){
        obstacle[i].speed=obstacle[j].speed;
      }
    }
  }
}

function endgame(){
  dead=true;
  addbutton();
  frame=0;
  if(score>high){
    high=score;
    storeItem('highscore',high);
  }

}
//detect collisions
function detect(){
  for(let i=0;i<obstacle.length;i++){
    if (obstacle[i].distance()<img.width*0.17){
      endgame();
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
    //add an assassin block
    if(random(0,100)<=(score*60)/100){
      if(random(0,1)>0.5) obstacle[obstacle.length-1].id=1
      else obstacle[obstacle.length-1].id=2;
    }
    score++;
  }
  pushother();
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
