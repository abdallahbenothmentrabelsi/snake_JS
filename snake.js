const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
// creation de l'unité

const box = 32;


// charger les images 
const ground = new Image();
ground.src = "img/ground.png";


const foodImg = new Image();
foodImg.src = "img/food.png";
//charger les audio  
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();
dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
left.src = "audio/left.mp3";
right.src = "audio/right.mp3";
down.src = "audio/down.mp3";

let snake = [];
snake[0] = {
        x: 9 * box,
        y: 10 * box
    }
    // creation d'aliments
food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}


//creation du score 
let score = 0;

//conntrole le serpant
let d;
document.addEventListener("keydown", direction);

function direction(event) {
    if (event.keyCode == 37 && d != "RIGHT") {
        left.play();
        d = "LEFT";
    } else if (event.keyCode == 38 && d != "DOWN") {
        up.play();

        d = "UP";

    } else if (event.keyCode == 39 && d != "LEFT") {
        right.play();

        d = "RIGHT";

    } else if (event.keyCode == 40 && d != "UP") {
        down.play();

        d = "DOWN";

    }
}
//vérifier la collision
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            dead.play();
            return true;
        }
    }
    return false;
}

//creation d'arrier plan 

function draw() {
    ctx.drawImage(ground, 0, 0);
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStile = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    ctx.drawImage(foodImg, food.x, food.y);
    // l'encien position du tete
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;



    //  which direction 
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;


    // si le serpant mange le fruit 
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        eat.play();
        food = {
                x: Math.floor(Math.random() * 17 + 1) * box,
                y: Math.floor(Math.random() * 15 + 3) * box
            } //on n'enlève pas la queue
    } else { // retirer la queue
        snake.pop();
    }
    // ajout d'un nouveau head 
    let newHead = {
            x: snakeX,
            y: snakeY
        }
        // game over 
    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)) {
        dead.play();
        clearInterval(game);

    }





    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2 * box, 1.6 * box);

}
// appelle la fonction draw chaque 100ms
let game = setInterval(draw, 100);