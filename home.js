let slide1 = document.getElementById(`game`);
let context = slide1.getContext(`2d`);
//canvas.height/width properties
context.canvas.height = 500;
context.canvas.width = 800;

//fillStyle property
context.fillStyle = `#ffff00`; //setting paint bucket
//fillRect() method
context.fillRect(0, 0, 800, 500); // x-position , y-position , width , height

//path
//strokeStyle
context.fillStyle = `#104030`;
context.strokeStyle = `#ff0000`;
context.lineWidth = 5;//width of line
context.lineJoin = `round`;
context.beginPath();
context.moveTo(400, 250); //x-coordinate , y-co-ordinate
context.lineTo(500, 350);
context.lineTo(300, 350);
context.closePath();
//to show line 
context.stroke();
//to fill the rectangle
context.fill();
// add a square

context.fillStyle = `#00ffff`;
context.beginPath();
context.rect(10, 10, 250, 250);
context.fill();
context.stroke();

context.beginPath();
context.moveTo(0, 500);
context.bezierCurveTo(150, 300, 300, 150, 400, 250); // starting-x starting-y inflation-x inflation-y ending-x ending-y
context.stroke();

//circle
context.beginPath();
context.arc(700, 30, 20, 30, Math.PI * 2, true);
context.fill();
context.stroke();