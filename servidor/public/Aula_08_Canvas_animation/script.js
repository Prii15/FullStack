let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let ball = {
    x: 10,
    y: 10,
    raio: 50,
    img: new Image(),
    desenhe: function(){
        this.img.src = "ball.png";
        ctx.beginPath();
        ctx.drawImage(this.img, this.x, this.y, 2*this.raio, 2*this.raio);
        ctx.closePath();
    }
}

let retangulo_1 = {
    x: 10,
    y: 10,
    largura: 50,
    altura: 50,
    cor: "red",

    desenhe: function(){
        ctx.beginPath();
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
        ctx.closePath();
    }
}

let retangulo_2 = {
    x: 340,
    y: 340,
    largura: 50,
    altura: 50,
    cor: "blue",

    desenhe: function(){
        ctx.beginPath();
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
        ctx.closePath();
    }
}

//animação
function animacao(){
    ctx.clearRect(0, 0, 400, 400);

    // if(retangulo_1.x < 350){
    //     retangulo_1.x += 1;
    // }

    // if(retangulo_2.x > 0){
    //     retangulo_2.x -= 1;
    // }

    retangulo_1.desenhe();
    retangulo_2.desenhe();
    ball.desenhe();

    requestAnimationFrame(animacao);
}

animacao();

document.addEventListener("keydown", function(evento){
    let tecla = evento.key;
    console.log("Tecla pressionada: ", tecla);

    let vel = 5;

    if(tecla == "ArrowUp"){
        retangulo_1.y -= vel;
    }

    if(tecla == "ArrowDown"){
        retangulo_1.y += vel;
    }

    if(tecla == "ArrowLeft"){
        retangulo_1.x -= vel;
    }

    if(tecla == "ArrowRight"){
        retangulo_1.x += vel;
    }
})

document.addEventListener("mousemove", function(evento){
    let rect = canvas.getBoundingClientRect();
    let x = evento.clientX - rect.left;
    let y = evento.clientY - rect.top;

    console.log("x", x ,"e y:", y);

    retangulo_2.x = x;
    retangulo_2.y = y;
})