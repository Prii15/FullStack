let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

// retângulos 
ctx.beginPath();
ctx.lineWidth = 2;
ctx.strokeStyle = 'red';
ctx.fillStyle = 'blue';
ctx.strokeRect(10,10,50,50);
ctx.fillRect(10,10,50,50);
ctx.closePath();

// linhas
ctx.beginPath();
ctx.lineWidth = 2;
ctx.strokeStyle = 'red';
ctx.fillStyle = 'yellow';
ctx.moveTo(100,0);
ctx.lineTo(200,100);
ctx.lineTo(200,200);
ctx.lineTo(100,200);
ctx.lineTo(100,0);
ctx.fill();
ctx.stroke();
ctx.closePath();

// arcos
ctx.beginPath();
ctx.lineWidth = 10;
ctx.strokeStyle = 'red';
ctx.fillStyle = 'blue';
ctx.arc(200,200,50,1.5*Math.PI,2.5*Math.PI);
ctx.stroke();
ctx.fill();
ctx.closePath();

// texto
ctx.beginPath();
ctx.lineWidth = 10;
ctx.strokeStyle = 'red';
ctx.fillStyle = 'blue';
ctx.font = "90px Arial"
ctx.strokeText("Olá",200,350)
ctx.fillText("Olá",195,345);
ctx.closePath();


//Exercício 01
let canvas1 = document.getElementById('ex01');
let ctx1 = canvas1.getContext('2d');

// retângulos 
ctx1.beginPath();
ctx1.lineWidth = 2;
ctx1.strokeStyle = 'red';
ctx1.fillStyle = 'red';
ctx1.strokeRect(0,0,50,50);
ctx1.fillRect(0,0,50,50);

ctx1.strokeStyle = 'blue';
ctx1.fillStyle = 'blue';
ctx1.strokeRect(350,0,350,50);
ctx1.fillRect(350,0,350,50);

ctx1.strokeStyle = 'yellow';
ctx1.fillStyle = 'yellow';
ctx1.strokeRect(0,350,50,350);
ctx1.fillRect(0,350,50,350);

ctx1.strokeStyle = 'green';
ctx1.fillStyle = 'green';
ctx1.strokeRect(350,350,400,400);
ctx1.fillRect(350,350,400,400);
ctx1.closePath();

// linhas
ctx1.beginPath();
ctx1.lineWidth = 2;
ctx1.strokeStyle = 'red';
ctx1.moveTo(0,0);
ctx1.lineTo(400,400);
ctx1.stroke();
ctx1.closePath();

ctx1.beginPath();
ctx1.lineWidth = 2;
ctx1.strokeStyle = 'blue';
ctx1.moveTo(0,400);
ctx1.lineTo(400,0);
ctx1.stroke();
ctx1.closePath();

ctx1.beginPath();
ctx1.lineWidth = 2;
ctx1.strokeStyle = 'green';
ctx1.moveTo(0,200);
ctx1.lineTo(400,200);
ctx1.stroke();
ctx1.closePath();

// arcos
ctx1.beginPath();
ctx1.lineWidth = 2;
ctx1.strokeStyle = 'green';
ctx1.arc(200,200,50,2*Math.PI,Math.PI);
ctx1.stroke();
ctx1.closePath();

ctx1.beginPath();
ctx1.lineWidth = 2;
ctx1.strokeStyle = 'green';
ctx1.fillStyle = 'yellow';
ctx1.arc(50,150,20,0,2*Math.PI);
ctx1.moveTo(350,150);
ctx1.arc(350,150,20,0,2*Math.PI);
ctx1.stroke();
ctx1.fill();
ctx1.closePath();

// texto
ctx1.beginPath();
ctx1.lineWidth = 1;
ctx1.strokeStyle = 'black';
ctx1.fillStyle = 'black';
ctx1.font = "20px Arial"
ctx1.strokeText("Desenvolvimento Web",100,100)
ctx1.fillText("Desenvolvimento Web",100,100);
ctx1.closePath();


//Exercício 02
let canvas2 = document.getElementById('ex02');
let ctx2 = canvas2.getContext('2d');

//chao
ctx2.beginPath();
ctx2.lineWidth = 2;
ctx2.strokeStyle = 'gray';
ctx2.fillStyle = 'gray';
ctx2.strokeRect(0,300,400,300);
ctx2.fillRect(0,300,400,300);
ctx2.closePath();

//casinha
ctx2.beginPath();
ctx2.lineWidth = 1;
ctx2.strokeStyle = '#86471a';
ctx2.fillStyle = '#86471a';
ctx2.strokeRect(150,200,100,100);
ctx2.fillRect(150,200,100,100);
ctx2.closePath();

//sol
ctx2.beginPath();
ctx2.lineWidth = 2;
ctx2.strokeStyle = 'yellow';
ctx2.fillStyle = 'yellow';
ctx2.arc(300,100,50,0,2*Math.PI);
ctx2.stroke();
ctx2.fill();
ctx2.closePath();

