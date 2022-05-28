var BackgroundImg, Background;
var MonsterImg, monster, monsterGroup;
var climberImg, climber, climbersGroup;
var girl, girlImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  BackgroundImg = loadImage("Background.jpg");
  MonsterImg = loadImage("Monster.jpg");
  climberImg = loadImage("climber.png");
  girlImg = loadImage("Scared Girl.jpg");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  Background = createSprite(300,300);
  Background.addImage("Background",BackgroundImg);
  Background.velocityY = 1;
  
  MonsterGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  girl = createSprite(200,200,50,50);
  girl.scale = 0.3;
  girl.addImage("girl", girlImg);
}

function draw(){
  background(0);
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      girl.x = girl.x - 3;
    }
    
    if(keyDown("right_arrow")){
      girl.x = girl.x + 3;
    }
    
    if(keyDown("space")){
      girl.velocityY = -10;
    }
    
    girl.velocityY = girl.velocityY + 0.8
    
    if(Background.y > 400){
      Background.y = 300
    }
    spawnMonster();

    
    //climbersGroup.collide(ghost);
    if(climbersGroup.isTouching(girl)){
      girl.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(girl) || girl.y > 600){
      girl.destroy();
      gameState = "end"
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }

}

function spawnMonster() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    var Monster = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
   Monster.x = Math.round(random(120,400));
    climber.x = Monster.x;
    invisibleBlock.x = Monster.x;
    
    Monster.addImage(MonsterImg);
    climber.addImage(climberImg);
    
    Monster.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    girl.depth = girl.depth;
    girl.depth +=1;
   
    //assign lifetime to the variable
    Monster.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //add each door to the group
    MonsterGroup.add(Monster);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}
