
var player
var meteor
var gameOver
var playerImage
var meteorImage
var star
var explosion

function preload() {
    playerImage = loadImage('assets/player.png')
    meteorImage = loadImage('assets/meteor.png')
    starImage = loadImage('assets/star.png')
    //  play sound
    explosion = new Audio('assets/explosion.wav')
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
    gameOver = false
}

function draw() {
        if (gameOver) {
            gameEnd()
        } else {
        background(0, 0, 100)
        drawSprites()
        
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
            meteor.position.y = 0
            meteor.position.x = random(5, width - 5)
        }

        if (player.overlap(meteor)) {
            explosion.play()
            gameOver = true
        }
    }
}

function gameEnd() {
    background(0)
    textAlign(CENTER)
    fill(255)
    text('game over!', width / 2, height / 2)
    text('click anywhere to restart the game', width / 2, (3 * height) / 4)
}

function mouseClicked() {
    if (gameOver) {
        gameOver = false
        resetScreen()
    }
}

function resetScreen() {
    player.position.x = width / 2
    player.position.y = height - (playerImage.height / 2)
    meteor.position.x = width / 2
    meteor.position.y = 0
}