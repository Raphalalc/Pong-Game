var canvas = document.getElementById('tutorial');
document.addEventListener("keydown", Start, false);
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
var keys=[];

function Start(e) {
    if (e.keyCode == 32) { 
        setInterval(draw, 10);
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
    function ballCollisionP1(padX, padY){
        if(ballX + ballSpeedX-ballRadius < padX + 10 && ballX + ballSpeedX > padX && ballY + ballSpeedY > padY && ballY + ballSpeedY < padY + 50){ 
          ballSpeedX = -ballSpeedX * 1.05;
          console.log(ballSpeedX);
          nombreDeCoups++;
          console.log("nombre de coups " + nombreDeCoups);
            }
    }

    function ballCollisionP1Limit(padX, padY){
        if((ballX + ballSpeedX- ballRadius < padX + 10 && ballX + ballSpeedX > padX && ballY + ballSpeedY > padY && ballY + ballSpeedY < padY + 50)){ 
          ballSpeedX = -ballSpeedX;
          console.log(ballSpeedX);
          nombreDeCoups++;
          console.log("nombre de coups " + nombreDeCoups);
            }
    }
  
    function ballCollisionP2(padX, padY){
        if(ballX + ballSpeedX + ballRadius> padX && ballX + ballSpeedX < padX + 10 && ballY + ballSpeedY > padY && ballY + ballSpeedY < padY + 50){
                ballSpeedX = -ballSpeedX * 1.05;
                console.log(ballSpeedX);
                nombreDeCoups++;
                console.log("nombre de coups "+nombreDeCoups);
        }
    }
    
    function ballCollisionP2Limit(padX, padY){
        if(ballX + ballSpeedX + ballRadius> padX && ballX + ballSpeedX < padX + 10 && ballY + ballSpeedY > padY && ballY + ballSpeedY < padY + 50){
                ballSpeedX = -ballSpeedX;
                console.log(ballSpeedX);
                nombreDeCoups++;
                console.log("nombre de coups "+nombreDeCoups);
        }
    }

    function draw(){  
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPaddle1();
        drawPaddle2();   
        drawSquareLimitation();
        drawBall();
        
        if(nombreDeCoups <=20){
            ballCollisionP1(Paddle1X, Paddle1Y);
        }
        else if(nombreDeCoups >20){
            ballCollisionP1Limit(Paddle1X, Paddle1Y);
        }
        if(nombreDeCoups <=20){
        ballCollisionP2(Paddle2X, Paddle2Y);
        }
        else if(nombreDeCoups >20){
            ballCollisionP2Limit(Paddle2X, Paddle2Y);
        }

        
        ballX+=ballSpeedX;
        ballY+=ballSpeedY;  
        
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
        if (ballX+ ballSpeedX > canvas.width+20 || ballX+ ballSpeedX < -20) {
            clearInterval(draw);
        }
    }
   

    draw();



} else {
    console.log("ça marche pas");
}