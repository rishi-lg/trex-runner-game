var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var clouds
var obstacleImage1
var obstacleImage2
var obstacleImage3
var obstacleImage4
var obstacleImage5
var obstacleImage6
var score;
var gameState = "play"
var obstaclesGroup
var cloudsGroup
var score = 0
var gameOverImage, restartImg
var gameOver, restart
var dieSound
var checkpointSound
var jumpSound

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");
  cloudsImage = loadImage("cloud.png")
  groundImage = loadImage("ground2.png");
  obstacleImage1 = loadImage("obstacle1.png")
  obstacleImage2 = loadImage("obstacle2.png")
  obstacleImage3 = loadImage("obstacle3.png")
  obstacleImage4 = loadImage("obstacle4.png")
  obstacleImage5 = loadImage("obstacle5.png")
  obstacleImage6 = loadImage("obstacle6.png")
  gameOverImage = loadImage("gameOver.png")
  restartImg = loadImage("restart.png")
  dieSound = loadSound("die.mp3")
  checkpointSound = loadSound("checkpoint.mp3")
  jumpSound = loadSound("jump.mp3")


}

function setup() {

  createCanvas(windowWidth, windowHeight)

  //create a trex sprite
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided)

  trex.scale = 0.5;
  trex.debug = false
  obstaclesGroup = new Group()
  cloudsGroup = new Group()
  //create a ground sprite
  ground = createSprite(width/2, height/2, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  ground.velocityX = -4;

  //creating invisible ground
  invisibleGround = createSprite(width/2, height/2 + 10, width, 10);
  invisibleGround.visible = false;

  //creating gameOver and restart
  gameOver = createSprite(300, 100, 50, 20 )
gameOver.addImage(gameOverImage)
gameOver.visible = false
  restart = createSprite(300, 150, 20, 20)
  restart.addImage(restartImg)
  restart.scale = 0.5
  restart.visible = false

  //generate random numbers
  var rand = Math.round(random(1, 100))
  console.log(rand)

}

function draw() {
  //set background color
  background(180);
  trex.setCollider("rectangle", 0, 0, 90, 90)
  //console.log(trex.y)
  if (trex.isTouching(obstaclesGroup)) {
    gameState = "end"
    dieSound.play()
    dieSound.loop = false
  }
  text("SCORE " + score, 530, 20)

  //stop trex from falling down
  trex.collide(invisibleGround);

  if (gameState == 'play') {
    //Spawn Clouds
    spawnClouds()
    spawnObstacles()

    // jump when the space key is pressed
    if (touches.length>0 || keyDown("space") && trex.y >= 161.5) {
      trex.velocityY = -10;
      jumpSound.play()
      touches = []
    }
    //adding gravity
    trex.velocityY = trex.velocityY + 0.5
    score = score + 1
   
    if(score % 1000 == 0){
    checkpointSound.play()


    }



    //making the background infinite

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
  }


  if (gameState == "end") {
    ground.velocityX = 0;
    cloudsGroup.setVelocityXEach(0)
    obstaclesGroup.setVelocityXEach(0)
    trex.changeAnimation("collided", trex_collided)
gameOver.visible = true
restart.visible = true
if(mousePressedOver(restart)){

reset()
}
  }
  drawSprites();
}

//function to spawn the clouds
function spawnClouds() {
  // write your code here 
  if (World.frameCount % 60 == 0) {
    var clouds = createSprite(width, 30, 20, 10)
    clouds.addImage(cloudsImage)
    clouds.scale = 0.5
    clouds.velocityX = -5
    clouds.lifetime = width/5
    cloudsGroup.add(clouds)

  }
}

function spawnObstacles() {
  if (World.frameCount % 60 == 0) {

    var obstacle = createSprite(width, invisibleGround.y - 20, 10, 20)
    var rand = Math.round(random(1, 6))
    switch (rand) {
      case 1: obstacle.addImage(obstacleImage1)
        break
      case 2: obstacle.addImage(obstacleImage2)
        break
      case 3: obstacle.addImage(obstacleImage3)
        break
      case 4: obstacle.addImage(obstacleImage4)
        break
      case 5: obstacle.addImage(obstacleImage5)
        break
      case 6: obstacle.addImage(obstacleImage6)
        break
    }



    obstacle.velocityX = -5
    obstacle.lifetime = width/5
    obstacle.scale = 0.5

    obstaclesGroup.add(obstacle)


  }
}

function reset() {
gameState = "play"
gameOver.visible = false
restart.visible = false
trex.changeAnimation("running")
score = 0


}










