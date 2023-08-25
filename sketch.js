var splashimg
var gameState = "wait"
var playbutton, soundonbutton, obstacle, soundoffbutton, ground, level1bg, player, playeridle, playerrun, playerjump,sugar
var health = 0
var maxHealth = 400
var playerimg1
var score1 = 0
var spike
var spike1 ,collectibleGroup
var  health = 0


function preload() {
    splashimg = loadImage("Rumble_runner.gif")
    bgSound = loadSound("bgMusic.mp3")

    level1bg = loadImage("bg.png")
    playeridle = loadImage("russel-sound-main/player/run.png")

    er1 = loadImage("er1.png")
    er2 = loadImage("er2.png")
    er3 = loadImage("er3.png")
    sugar = loadImage("russel-sound-main/Sugar.png")
    
    playerwalkimg=loadAnimation("russel-sound-main/PlayerWalk3.png","russel-sound-main/playerwalk1.png",
    "russel-sound-main/playerwalk2.png","russel-sound-main/PlayerWalk3.png","russel-sound-main/playerwalk1.png",
    "russel-sound-main/playerwalk2.png","russel-sound-main/PlayerWalk3.png","russel-sound-main/playerwalk1.png",
    "russel-sound-main/playerwalk2.png","russel-sound-main/PlayerWalk3.png","russel-sound-main/playerwalk1.png",
    "russel-sound-main/playerwalk2.png","russel-sound-main/PlayerWalk3.png","russel-sound-main/playerwalk1.png",
    "russel-sound-main/playerwalk2.png","russel-sound-main/PlayerWalk3.png","russel-sound-main/playerwalk1.png",
    "russel-sound-main/playerwalk2.png")

}

function setup() {
    createCanvas(windowWidth, windowHeight)

    playbutton = createImg("play.png")
    playbutton.position(width / 2 - 150, height - height / 5)
    playbutton.size(150, 150)



    soundonbutton = createImg("soundon.png")
    soundonbutton.position(playbutton.x + 150, playbutton.y + 15)
    soundonbutton.size(150, 115)
    soundonbutton.mouseClicked(mute)
    // soundonbutton.hide()


    soundoffbutton = createImg("sounoff.png")
    soundoffbutton.position(playbutton.x + 150, playbutton.y + 10)
    soundoffbutton.size(120, 125)
    soundoffbutton.hide()
    soundoffbutton.mouseClicked(mute)





    ground = createSprite(width / 1.5, height / 2)
    ground.addImage(level1bg)
    ground.visible = false
    // ground.scale=2.8

    player = createSprite(width / 1.5, height / 2)
    // player.addImage(playeridle)
    player.addAnimation("walk",playerwalkimg)
    player.scale = 2
    player.visible = false

collectibleGroup=new Group()



}
function draw() {

    if (gameState === "wait") {
        // if (!bgSound.isPlaying) {
        //     bgSound.play()
        // }
        background(splashimg)
    }


    playbutton.mousePressed(() => {
        gameState = "level1"
        playbutton.hide()
    })

    if (gameState == "level1") {
        // background(level1bg)
        image(level1bg, 0, 0, width * 4, height)
        playbutton.hide()
        soundoffbutton.hide()
        soundonbutton.hide()

        player.visible = true
        camera.x = player.x
        camera.y = player.y
        if (keyDown("RIGHT_ARROW")) {
            player.x += 4
        }

        if (keyDown("LEFT_ARROW")) {
            player.x -= 2
        }
        obstacles()

        // if (keyDown("UP_ARROW")) {
        //     player.y -= 2
        // }

        // if (keyDown("DOWN_ARROW")) {
        //     player.y += 2
        // }

    }
    drawSprites()

    if (gameState == "level1") {
        textSize(50)
        fill("cyan")
        stroke("blue")
        strokeWeight(4)
        text("LEVEL 1", player.x - 100, 50)
         text("Health : "+health, player.x + 200, 50)
        // healthlevel1()




        for(i=0;i<collectibleGroup.length;i++){
    if(collectibleGroup.get(i).isTouching(player)){
       health +=10
       collectibleGroup.get(i).destroy()
    }}

    
if(health>=50){
    level1Won()
    collectibleGroup.destroyEach()
}

    }

}


function mute() {
    if (bgSound.isPlaying()) {
        bgSound.stop();
        soundoffbutton.show();
        soundonbutton.hide();
        console.log("mute")
    }
    else {
        soundonbutton.show()
        soundoffbutton.hide();
        bgSound.play();
        console.log("unmute")
    }
}

function healthlevel1() {

    stroke("gold");
    strokeWeight(7);
    noFill();
    rect(player.x + 200, 10, 200, 20);

    noStroke();
    fill("red");
    rect(player + 200, 10, map(health, 0, maxHealth, 0, 200), 20);
}


function obstacles() {
    if (frameCount % 200  == 0) {
        rand = Math.round(random(height / 4, height - 100))
        obstacle = createSprite(player.x+width/2, player.y)
        obstacle.velocityX = -2
        obstacle.addImage(sugar)
        collectibleGroup.add(obstacle)
    }
}

// //level 1 won function
function level1Won() {

    swal(
        {

            title: `You have collected enough Items !!!`,
            text: "Got the KEY!!!",
            imageUrl: "assets/key.gif",
            imageSize: "250x250",
            confirmButtonText: "LEVEL 2",
            confirmButtonColor: "cyan"
        },
        function (isConfirm) {
            if (isConfirm) {
                gameState = "wait"
            }
        }
    )
}
