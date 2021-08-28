var PLAY = 1;
var END = 0;
var gameState = PLAY;

var unicorn, unicornImage;
var ground, invisibleGround;

var coinGroup, coinImage;
var donutGroup, donut2, donut1,donut3,donut4;
var score = 0;
var life = 10 ;
var coinSound;
var gameOver, restart;

function preload() {
  unicornImage = loadImage("transparent-head-pink-whiskers-line-line-art-5e71363ac091a1.4724437815844777547888.png");

  coinImage = loadImage("heart.png");
  donut2 = loadImage("5a35ebfbed4315.7968703315134832599718.png");
  donut1 = loadImage("Doughnut (33).png");
  donut3=loadImage("candy.png");
  donut4=loadImage("cup-cake.png");

  gameOverImg = loadImage("PngItem_1457399.png");
  restartImg = loadImage("restart.png");

  coinSound = loadSound("coin.wav");
}

function setup() {
  createCanvas(600, 600);
  unicorn = createSprite(50, 200, 20, 50);
  unicorn.addImage("unicorn", unicornImage);
  unicorn.scale = 0.02;
 
  //unicorn.setCollider("rectangle",0,0,unicorn.width,unicorn.height);

  ground = createSprite(0, 590, 1200, 30);
  ground.shapeColor="green";
  ground.x = ground.width / 2;
  ground.velocityX = -(6 + 3 * score / 100);

  gameOver = createSprite(300,75);
  gameOver.addImage(gameOverImg);

  restart = createSprite(300, 140);
  restart.addImage(restartImg);

  gameOver.scale = 0.05;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;

  coinGroup = new Group();
  donutGroup = new Group();

  score = 0;
}

function draw() {
  background("blue");
  textSize(20);
  fill("yellow");
  text("Score= " + score, 500, 40);
  text("Lives= " + life, 500, 65);
  //text("life: "+ life , 500,60);
  unicorn.collide(ground);
  drawSprites();
  if (gameState === PLAY) {
    // score = score + Math.round(getFrameRate()/60);
    if (keyDown("space") && unicorn.y >= 139) {
      unicorn.velocityY = -12;
    }

    unicorn.velocityY = unicorn.velocityY + 0.8

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    spawnCoin();
    spawnDonut();
    //if (score >= 0) {
     // ground.velocityX = -6;
    //} else {
    //  ground.velocityX = -(6 + 3 * score / 100);
    //}

    
   

    if (coinGroup.isTouching(unicorn)) {
      coinGroup.destroyEach();
      coinSound.play();
      score = score + 1;
                 
    }
    if (score>0){
      text("YOU CAN DO!!",20,20);
     
  
}
if (donutGroup.isTouching(unicorn)) {
 
  life = life - 1;
  gameState = END;
}

  } else if (gameState === END) {

    restart.visible = true;


    //set velcity of each game object to 0
    ground.velocityX = 0;
    unicorn.velocityY = 0;
    donutGroup.setVelocityXEach(0);
    coinGroup.setVelocityXEach(0);



    //set lifetime of the game objects so that they are never destroyed
    donutGroup.setLifetimeEach(-1);
    coinGroup.setLifetimeEach(-1);
    if (life === 0) {
      text("better luck next time",20,20);
      gameOver.visible = true;
    }
    if (mousePressedOver(restart)) {
      if (life > 0) {

        reset();
      }
    }
  }
}

function spawnCoin() {
  //write code here to spawn the coin
  if (frameCount % 60 === 0) {
    var coin = createSprite(600, 520, 40, 10);
    coin.y = Math.round(random(80, 500));
    coin.addImage(coinImage);
    coin.scale = 0.07;
    coin.velocityX = -3;

    //assign lifetime to the variable
    coin.lifetime = 200;

    //adjust the depth
    coin.depth = unicorn.depth;
   unicorn.depth = unicorn.depth + 1;

    //add each coin to the group
    coinGroup.add(coin);
  }

}

function spawnDonut() {
  if (frameCount % 60 === 0) {
    var donut = createSprite(600, 565, 10, 40);
    //generate random donuts
    var rand = Math.round(random(1, 4));
    switch (rand) {
      case 1:
        donut.addImage(donut2);
        break;
      case 2:
        donut.addImage(donut1);
        break;
        case 3:
        donut.addImage(donut3);
        break;
case 4:
        donut.addImage(donut4);
        break;
    }

    donut.velocityX = -(6 + 3 * score / 100);

    //assign scale and lifetime to the donut           
    donut.scale = 0.07;
    donut.lifetime = 300;
    //add each donut to the group
    donutGroup.add(donut);
  }
}

function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;

  donutGroup.destroyEach();
  coinGroup.destroyEach();


  score = 0;

}