let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let naruto = {
    x: 10,
    y: 10,
    largura: 100,
    altura: 100,
    img: new Image(),
    desenhe: function(){
        this.img.src = "naruto.png";
        ctx.beginPath();
        ctx.drawImage(this.img, this.x, this.y, this.largura, this.altura);
        ctx.closePath();
    }
}

//animação
function animacao(){
    ctx.clearRect(0, 0, 300, 300);

    naruto.desenhe();

    requestAnimationFrame(animacao);
}

animacao();

document.addEventListener("mousemove", function(evento) {
    let rect = canvas.getBoundingClientRect();
    let x = evento.clientX - rect.left;
    let y = evento.clientY - rect.top;

    console.log("x", x ,"e y:", y);

    // Centraliza a imagem em relação ao mouse
    naruto.x = x - naruto.largura / 2;
    naruto.y = y - naruto.altura / 2;

    // Mantém a imagem dentro dos limites do canvas
    naruto.x = Math.max(0, Math.min(naruto.x, canvas.width - naruto.largura));
    naruto.y = Math.max(0, Math.min(naruto.y, canvas.height - naruto.altura));

});