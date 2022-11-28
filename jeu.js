var canvas = document.getElementById('pong');
document.addEventListener("keydown", Start, false);

h3 = document.querySelector('h3');
p = document.querySelector('p');

var ctx = canvas.getContext('2d');
var x = 40;
var Paddle1X = 5;
var Paddle2X = canvas.width-15;
var Paddle1Y = canvas.height/2-30;
var Paddle2Y = canvas.height/2-30;
var ballRadius = 10;
var ballX = canvas.width/2 +7.5;
var ballY = canvas.height/2-5;
var ballSpeedX = 1.5;
var ballSpeedY = 1;
var upPressed = false;
var downPressed = false;
var nombreDeCoups =0;
var frame = 10;

var alreadyStart= false;
var start;
var changeDirection = true;
var score1 = 0;
var score2 = 0;

var impactSound = new Audio('./music/impact.mp3');
impactSound.volume = 0.2;

var keys=[];


function Start(e) {
    if (e.keyCode == 32 && alreadyStart == false)  { 
        clearInterval(start);
        alreadyStart = true;
        score1= 0;
        score2= 0; 
        ballSpeedX = 1.5;
        ballSpeedY =  1;
        start = setInterval(draw, frame); 
        h3.style.display = "none";
    }
}

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});
  
  
if (canvas.getContext) {
    function drawPaddle1(){
        ctx.beginPath();
        ctx.rect(Paddle1X, Paddle1Y, 10, 50);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
    
    function drawPaddle2(){
        ctx.beginPath();
        ctx.rect(Paddle2X, Paddle2Y, 10, 50);
        ctx.fillStyle = "#DC143C";

        ctx.fill();
        ctx.closePath();
    }

    function drawSquareLimitation(){
        for (var i = 0.3; i < 14; i++) {
            ctx.beginPath();
            ctx.rect(canvas.width/2+5, i*18, 5, 5);
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.closePath();
        }
    }
    function drawBall(){
        ctx.beginPath();
        ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }

    function drawPlayer1Win(){
        ctx.font = "bold 16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Player 1 win ", 20,canvas.height-10);
    }

    function drawPlayer2Win(){
        ctx.font = "bold 16px Arial";
        ctx.fillStyle = "#DC143C";
        ctx.fillText("Player 2 win ", 20,canvas.height-10);
    }
    function drawScore1(){
        ctx.font = "bold 16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Score: "+score1, 20, 20);
    }

    function drawScore2(){
        ctx.font = "bold 16px Arial";
        ctx.fillStyle = "#DC143C";
        ctx.fillText("Score: "+score2, canvas.width-85, 20);
    }

    function ballCollisionP1(padX, padY){
        if(ballX + ballSpeedX-ballRadius > padX && ballX + ballSpeedX-ballRadius < padX + 10 && ballX + ballSpeedX > padX && ballY + ballSpeedY > padY && ballY + ballSpeedY < padY + 50){ 
          ballSpeedX = -ballSpeedX * 1.1;
          let round = Math.round(ballSpeedX * 100) / 100;
          ballSpeedX = round;
          nombreDeCoups++;
          impactSound.play();
            }
    }

    function ballCollisionP1Limit(padX, padY){
        if(ballX + ballSpeedX-ballRadius > padX && ballX + ballSpeedX-ballRadius < padX + 10 && ballX + ballSpeedX > padX && ballY + ballSpeedY > padY && ballY + ballSpeedY < padY + 50){ 
          ballSpeedX = -ballSpeedX;
          let round = Math.round(ballSpeedX * 100) / 100;
          ballSpeedX = round;
          nombreDeCoups++;
          impactSound.play();
            }
    }
  
    function ballCollisionP2(padX, padY){
        if(ballX + ballSpeedX+ballRadius > padX && ballX + ballSpeedX+ballRadius < padX + 10 && ballX + ballSpeedX < padX && ballY + ballSpeedY > padY && ballY + ballSpeedY < padY + 50){
                ballSpeedX = -ballSpeedX * 1.1;
                let round = Math.round(ballSpeedX * 100) / 100;
                ballSpeedX = round;
                nombreDeCoups++;
                impactSound.play();
        }
    } 
    
    function ballCollisionP2Limit(padX, padY){
        if(ballX + ballSpeedX+ballRadius > padX && ballX + ballSpeedX+ballRadius < padX + 10 && ballX + ballSpeedX < padX && ballY + ballSpeedY > padY && ballY + ballSpeedY < padY + 50){
                ballSpeedX = -ballSpeedX;
                let round = Math.round(ballSpeedX * 100) / 100;
                ballSpeedX = round;
                nombreDeCoups++;
                impactSound.play();
        }
    }

    function draw(){  
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPaddle1();
        drawPaddle2();   
        drawSquareLimitation();
        drawScore1();
        drawScore2(); 
        drawBall();
        p.innerHTML = "Number of hits : " + nombreDeCoups;
        if(nombreDeCoups <=13){
            ballCollisionP1(Paddle1X, Paddle1Y);
        }
        else if(nombreDeCoups >13){
            ballCollisionP1Limit(Paddle1X, Paddle1Y);
        }
        if(nombreDeCoups <=13){
        ballCollisionP2(Paddle2X, Paddle2Y);
        }
        else if(nombreDeCoups >13){
            ballCollisionP2Limit(Paddle2X, Paddle2Y);
        }
        if(changeDirection==true){
       
        ballX = ballX + ballSpeedX;
        ballY = ballY + ballSpeedY ;       
        }
        
        
        if (keys[38]) {
            Paddle2Y-=5;
        }
        if (keys[40]) {
            Paddle2Y+=5;
        }
        if (keys[90]) {
            Paddle1Y-=5;
        }
        if (keys[83]) {
            Paddle1Y+=5;  
        }
        
        if (Paddle1Y>canvas.height-50) {
            Paddle1Y=canvas.height-50;
        }
        if (Paddle2Y>canvas.height-50) {
            Paddle2Y=canvas.height-50;
        }
        if(Paddle1Y<0){
            Paddle1Y=0;
        }
        if(Paddle2Y<0){
            Paddle2Y=0;
        }
        
        if (ballY+ ballSpeedY > canvas.height-ballRadius || ballY+ ballSpeedY < ballRadius) {
            ballSpeedY = -ballSpeedY;
        }
        if (ballX+ ballSpeedX > canvas.width+20) {
            nombreDeCoups = 0;
            score1++;
            clearInterval(start);
            ballX =  canvas.width/2 +7.5;
            ballY = canvas.height/2;
            ballSpeedX = +1.5;
            start = setInterval(draw, 10);
        }
        if ( ballX+ ballSpeedX < -20){
            nombreDeCoups = 0;
            score2++;
            clearInterval(start);
            ballX = canvas.width/2 +7.5;
            ballY =  canvas.height/2-5;
            ballSpeedX = -1.5;
            start = setInterval(draw, 10);
        }

      
        function gameOver(){
           ballSpeedX = 0;
           ballSpeedY = 0;
           alreadyStart = false;
           Paddle1Y = canvas.height/2-30;
           Paddle2Y = canvas.height/2-30;
           h3.style.display = "block";
           h3.innerHTML = "Press Space to restart the game";
        }
        if(score1 ==3){
           drawPlayer1Win();
           gameOver();
          
        }
        else if(score2 == 3){
            gameOver();
            drawPlayer2Win();
        }
    }
    draw();

} else {
    console.log("Script doesn't work");
}