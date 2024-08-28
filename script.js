
var player
var enemy
var gameOver

function setup() {
    createCanvas(250, 250)
    player = createSprite(width / 2, height - 25, 50, 50)
    enemy = createSprite(width / 2, 0, 10, 30)
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
        if (player.position.x <= 25) {
            player.position.x = 25
        } else if (player.position.x >= width - 25) {
            player.position.x = width - 25
        }

        enemy.position.y += 10

        if (enemy.position.y > height) {
            enemy.position.y = 0
            enemy.position.x = random(5, width - 5)
        }

        if (player.overlap(enemy)) {
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
    player.position.y = height - 25
    enemy.position.x = width / 2
    enemy.position.y = 0
}