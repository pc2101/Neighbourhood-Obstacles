//creating players and obstacles
var player,path
var car,cycles, streetlights,watch
var houses, trees

//game states
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var life=1;
var distance;

function preload(){
  playerImg = loadAnimation("images/Jake1.png", "images/Jake2.png", "images/jake3.png", "images/jake4.PNG", "images/jake5.png");
  car1=loadImage("images/car1.png")
  car2=loadImage("images/car2.png")
  car3=loadImage("images/car3.png") 
  car4=loadImage ("images/car4.png")
  pathImg=loadImage("images/path.png")
  youwinImg=loadImage("images/you_win.jpeg")
  youloseImg=loadImage("images/you_lose.jpeg")
  restartImg=loadImage("images/restart.jpeg")
  bgMusic=loadSound("images/bgmusic.mp3")
  hitMusic=loadSound("images/obstouch.mp3")
}


function setup() {
  createCanvas(400, 600);

  // Moving background
  path = createSprite(200, 200);
  path.addImage(pathImg);
  path.velocityY = 4;
  path.scale=1.5

  player = createSprite(70,580,20,20);
  player.addAnimation("JakeRunning", playerImg);
  player.scale = 0.9

  restart = createSprite(190,450);
  restart.addImage(restartImg);
  restart.scale=0.1;
  
  edges = createEdgeSprites();
  
  carG = new Group();

  distance=0;

  player.setCollider("rectangle",0,0,50,player.height)
  player.debug=false

}

function draw() {
  
  if (gameState === PLAY) {
    background(0);
    bgMusic.play()
    restart.visible = false;
    distance = distance + Math.round(frameCount/60);
    path.velocityY= (4+distance/100);

    if (path.y > 700) {
      path.y = -10;
    }

    if (keyDown(LEFT_ARROW)) {
      player.velocityX = -5;
    }
   
    if (keyDown(RIGHT_ARROW)) {
      player.velocityX = 5;
    } 

    if (carG.isTouching(player)) {
      life = life-1;
      hitMusic.play();
    }
    
    if(life===0){
      gameState = END;
    }

    if(distance===1000){
      gameState = WIN;
    }
    
    createCars();
  }

  else if(gameState===END){
    background("red");
    bgMusic.stop()
    restart.visible = true;
    path.destroy();
    carG.destroyEach();
    player.destroy();
    var lose=createSprite(200,250);
    lose.addImage(youloseImg);
    lose.scale=0.3
    if(mousePressedOver(restart)) {
      reset();
    }
  }

  else if(gameState===WIN){
    background("green");
    bgMusic.stop()
    restart.visible = true;
    path.destroy();
    carG.destroyEach();
    player.destroy();
    var win=createSprite(200,250);
    win.addImage(youwinImg);
    win.scale=0.5;
    if(mousePressedOver(restart)) {
      reset();
    }
  }

  player.collide(edges);

  drawSprites()

  textSize(20);
  fill("yellow");
  text("Life: " + Math.round(life), 40, 30);
  text("Distance: "+distance,40,50);
  
}

function reset(){
  gameState = PLAY;
  restart.visible = false;

  life=1;
  distance=0;

  path = createSprite(200, 200);
  path.addImage(pathImg);
  path.velocityY = 4;
  path.scale=1.5

  player = createSprite(70,580,20,20);
  player.addAnimation("JakeRunning", playerImg);
  player.scale = 0.9

  restart = createSprite(190,450);
  restart.addImage(restartImg);
  restart.scale=0.1;
  
  edges = createEdgeSprites();
  
  carG = new Group();

}

function createCars (){
  if (World.frameCount % 70 == 0) {
    var car = createSprite(Math.round(random(50, 350), 40, 10, 10));
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: car.addImage(car1);
              break;
      case 2: car.addImage(car2);
              break;
      case 3: car.addImage(car3);
              break;
      case 4: car.addImage(car4);
              break;
      default: break;
    }
    car.scale = 0.2;
    car.velocityY = (6 + distance/100);
    car.lifetime = 150;
    carG.add(car);
  }
}