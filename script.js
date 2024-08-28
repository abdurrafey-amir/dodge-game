
var player
var meteor
var gameOver
var playerImage
var meteorImage
var star
var explosion
var score
var backgroundMusic
var scoreSound
var lives
var heart
var heart1
var heart2
var heart3
var heart4
var heart5
var dieSound

function preload() {
    playerImage = loadImage('assets/player.png')
    meteorImage = loadImage('assets/meteor.png')
    starImage = loadImage('assets/star.png')
   
    // sounds
    explosion = new Audio('assets/audio/explosion.wav')
    backgroundMusic = new Audio('assets/audio/bgmusic.wav')
    scoreSound = new Audio('assets/audio/score.mp3')
    dieSound = new Audio('assets/audio/die.mp3')

    // lives 
    heart = loadImage('assets/heart.png')
    // heart1_image = loadImage('assets/heart.png')
    // heart2_image = loadImage('assets/heart.png')
    // heart3_image = loadImage('assets/heart.png')
    // heart4_image = loadImage('assets/heart.png')
    // heart5_image = loadImage('assets/heart.png')
}

function setup() {
    createCanvas(1200, 500)
    
    // stars
    for (var i = 0; i < 20; i++) {
        star = createSprite(random(0, width), random(0, height), 0, 0)
        star.addImage(starImage)
    }
    
    player = createSprite(width / 2, height - (playerImage.height / 2), 0, 0)
    player.addImage(playerImage)
    meteor = createSprite(width / 2, 0, 0, 0)
    meteor.addImage(meteorImage)
    meteor.rotationSpeed = 4
    score = 0
    lives = 6
    gameOver = false

    // lives
    heart1 = createSprite(50, 50, 0, 0)
    heart1.addImage(heart)
    heart2 = createSprite(100, 50, 0, 0)
    heart2.addImage(heart)
    heart3 = createSprite(150, 50, 0, 0)
    heart3.addImage(heart)
    heart4 = createSprite(200, 50, 0, 0)
    heart4.addImage(heart)
    heart5 = createSprite(250, 50, 0, 0)
    heart5.addImage(heart)
}

function draw() {
        if (gameOver) {
            gameEnd()
        } else {
        backgroundMusic.play()
        background(0, 0, 100)
        fill('#F6683B')
        textSize(20)
        text('score: ' + score, width - 100, 50)

        drawSprites()


        // lives
        lives_remove()

        // if (lives = 6) {
        //     heart1.visible = true
        //     heart2.visible = true
        //     heart3.visible = true
        //     heart4.visible = true
        //     heart5.visible = true
        // } else if (lives = 4) {
        //     heart1.visible = true
        //     heart2.visible = true
        //     heart3.visible = true
        //     heart4.visible = true
        //     heart5.visible = false
        // }
        
        // motion
        if (keyDown(RIGHT_ARROW)) {
            player.position.x += 25
        } else if (keyDown(LEFT_ARROW)) {
            player.position.x -= 25
        }

        // boundaries
        if (player.position.x >= width - (playerImage.width / 2)) {
            player.position.x = width - (playerImage.width / 2)
        } else if (player.position.x <= playerImage.width / 2) {
            player.position.x = playerImage.width / 2
        }

        meteor.position.y += 10

        if (meteor.position.y > height) {
            scoreSound.play()
            score++
            meteor.position.y = 0
            meteor.position.x = random(5, width - 5)
        }

        if (player.overlap(meteor)) {
            explosion.play()
            dieSound.play()
            lives -= 1
            resetScreen()
            console.log(lives)
            if (lives <= 0) {
                gameOver = true
            }
        }
    }
}

function gameEnd() {
    backgroundMusic.pause()
    background(0)
    textAlign(CENTER)
    fill('#F6683B')
    textSize(50)
    text('Game Over!', width / 2, height / 2)
    textSize(25)
    text('Your Score: ' + score, width / 2, (2 * height) / 3)
    text('Click anywhere to restart the game', width / 2, (3 * height) / 4)
}

function mouseClicked() {
    if (gameOver) {
        gameOver = false
        reset()
    }
}

function reset() {
    score = 0
    lives = 6
    player.position.x = width / 2
    player.position.y = height - (playerImage.height / 2)
    meteor.position.x = random(5, width - 5)
    meteor.position.y = 0
    lives_show()
}

function resetScreen() {
    player.position.x = width / 2
    player.position.y = height - (playerImage.height / 2)
    meteor.position.x = random(5, width - 5)
    meteor.position.y = 0
}

function lives_show() {
    heart1 = createSprite(50, 50, 0, 0)
    heart1.addImage(heart)
    heart2 = createSprite(100, 50, 0, 0)
    heart2.addImage(heart)
    heart3 = createSprite(150, 50, 0, 0)
    heart3.addImage(heart)
    heart4 = createSprite(200, 50, 0, 0)
    heart4.addImage(heart)
    heart5 = createSprite(250, 50, 0, 0)
    heart5.addImage(heart)
}

function lives_remove() {
    if (lives < 6) {
        heart5.remove()
    }
    if (lives < 5) {
        heart4.remove()
    }
    if (lives < 4) {
        heart3.remove()
    }
    if (lives < 3) {
        heart2.remove()
    }
    if (lives < 2) {
        heart1.remove()
    }
}