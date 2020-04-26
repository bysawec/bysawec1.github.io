const  canvas = document.getElementById("game");
const ctx = canvas.getContext('2d');

const ground = new Image();
ground.src = 'img/border.png'

const foodImg = new Image();
foodImg.src = 'img/food4.png'

const headImg = new Image()
headImg.src = 'img/vova.png'
let box = 32;

let score = 0;
let gg = "game over"
function checker () {
if (score > 27) {
    clearInterval(game)
    clearInterval(checks)
    }
}
let checks = setInterval(checker, 10)
let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
};


let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box,
};




document.addEventListener("keydown", direction);

let dir;

function direction(event) {
    if(event.keyCode == 37 && dir != "right")
        dir = "left";
    else if (event.keyCode == 38 && dir != "down")
    dir = "up";
    else  if(event.keyCode == 39 && dir != "left")
    dir = "right";
    else if(event.keyCode == 40 && dir != "up")
    dir = "down";
    else if(event.keyCode == 66)
    game = setInterval(render,  Math.random() * 85);


}

function eatTail (head, arr) {
    for (let i = 0; i < arr.length; i++){
        if(head.x == arr[i].x && head.y == arr[i].y)
        end()
    }

};
function dif() {
    if (score > 10){
    clearInterval(game)
    clearInterval(game2)
    game = setInterval(render, 40 )
    };
};

function render () {
    if (score < -49){
        
    }
    if (score > 0 && sessionStorage.getItem('score') < score ){
        sessionStorage.setItem('score', score)
        }
    if (sessionStorage.getItem('score') > 10){
        foodImg.src = "img/food2.png"
    }
    if (sessionStorage.getItem('score') > 15){
        foodImg.src = "img/food5.png"
    }
    if (sessionStorage.getItem('score') > 20){
        foodImg.src = "img/food.png"
    }
    if (sessionStorage.getItem('score') > 25) {
        foodImg.src = "img/food.png"
    }

    ctx.drawImage(ground, 0, 0);

    ctx.drawImage(foodImg, food.x, food.y)

    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i % 2 == 0 ? "orange" : "red"
        ctx.arc(100, 75, 50, 0, 2 * Math.PI); // ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fillRect(snake[i].x, snake[i].y, 30, 30)
    }

    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 2.5, box  * 1.7)

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX === food.x && snakeY == food.y){
        score++;
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box,
        };
      } else {
          snake.pop()
      }

      if(snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17)
      score++;

        if (snakeX < box + 1 && dir == "left"){
            snakeX = box * 18;
            score -= 1;
        }
        else if (snakeX > box * 16 && dir == "right") {
            snakeX = box - 32;
            score -=1;
        }
        else if (snakeY > box * 16 && dir == "down") {
            snakeY = box * 2;
        }
        else if (snakeY < box * 4 && dir == "up") {
            snakeY = box * 18; 
        }

    if (dir == "left") snakeX -= box;
    if (dir == "right") snakeX += box;
    if (dir == "up") snakeY -= box;
    if (dir == "down") snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newHead, snake)
    snake.unshift(newHead);
    ctx.drawImage(headImg, newHead.x, newHead.y)
}



function end(){
    ctx.fillStyle = "black";
    ctx.font = "77px Arial";
    ctx.fillText(gg, box * 4 , box  * 8)
    score = 0
    clearInterval(game);
}

function render2() {
    if (score > 10){
        dif()
    }
}
var game2 = setInterval(render2, 10)
var game = setInterval(render, 50);

