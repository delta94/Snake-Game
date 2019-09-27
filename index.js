/* 

    left -> right
    top -> bottom 
    
*/

const cvs = document.getElementById("canvas");
const ctx = cvs.getContext('2d');

// Create the unit
const box = 32;

// Load Image
let ground = new Image();
ground.src="img/ground.png";

let foodImage = new Image();
foodImage.src = "img/food.png"

// Create Snake
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

// Create food
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

// Create the score 

let score = 0;

// Control the snake 

let d;

document.addEventListener('keydown', direction);

function direction(event) {
    let key = event.keyCode || event.which;
    if(key == 37 && d != "RIGHT") {
        d = "LEFT";
    } else if(key == 38 && d != "DOWN") {
        d = "UP"
    } else if(key == 39 && d != "LEFT") {
        d = "RIGHT"
    } else if(key == 40 && d != "UP") {
        d = "DOWN"
    }
}


// Draw

function draw() {
    ctx.drawImage(ground,0,0);

    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x,snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y, box, box)
    }

    ctx.drawImage(foodImage,food.x, food.y)

    // Old head position
    let snakeX = snake[0].x
    let snakeY = snake[0].y

    // Remove the tail
    snake.pop();

    // Which direction
    if(d == "LEFT") snakeX -= box; 
    if(d == "UP") snakeY -= box;
    if(d == "RIGHT") snakeX += box; 
    if(d == "DOWN") snakeY += box; 

    // Add new head

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box)

}

// Call draw function every 100ms 

let game = setInterval(draw, 100)