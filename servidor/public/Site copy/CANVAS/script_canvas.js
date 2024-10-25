function retangulo(x, y, largura, altura, cor_linha, cor_preenchimento){
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = cor_linha;
    ctx.fillStyle = cor_preenchimento;
    ctx.strokeRect(x,y,largura,altura); 
    ctx.fillRect(x,y,largura,altura);
    ctx.closePath();
}

//passar uma lista
function linhas(start_x, start_y, pontos, cor_linha, cor_preenchimento){
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = cor_linha;
    ctx.fillStyle = cor_preenchimento;
    ctx.moveTo(start_x, start_y);

    //desenha as linhas para cada ponto
    for (let i = 0; i < pontos.length; i++) {
        ctx.lineTo(pontos[i][0], pontos[i][1]); // Acessa o ponto como [x, y]
    }

    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

function arcos(center_x, center_y, raio, start_ang, finish_ang, cor_linha, cor_preenchimento){
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = cor_linha;
    ctx.fillStyle = cor_preenchimento;
    ctx.arc(center_x, center_y, raio, start_ang*Math.PI,finish_ang*Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}

function texto(text, text_x, text_y, preenc_x, preenc_y, font, cor_linha, cor_preenchimento){
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = cor_linha;
    ctx.fillStyle = cor_preenchimento;
    ctx.font = font;
    ctx.textAlign = "center";
    ctx.strokeText(text, text_x, text_y)
    ctx.fillText(text, preenc_x,preenc_y);
    ctx.closePath();
}

//desenho das linhas, arcos e quadrados
function desLinhas(){
    //quadrados dos cantos de cima
    retangulo(0, 0, 50, 50, "blue", "blue");
    retangulo(250, 0, 50, 50, "red", "red");

    //retangulos aqua
    retangulo(0, 120, 30, 60, "aqua", "aqua");
    retangulo(270, 135, 30, 30, "aqua", "aqua");

    //L amarelo
    retangulo(0, 240, 30, 60, "yellow", "yellow");
    retangulo(30, 270, 30, 30, "yellow", "yellow");

    //L preto
    retangulo(270, 240, 30, 60, "black", "black");
    retangulo(240, 270, 30, 30, "black", "black");

    //quadrado vermelho do meio
    retangulo(110, 150, 40, 40, "red", "red");

    //linhas retas
    linhas(0, 150, [[300, 150]], "green", "transparent")
    linhas(0, 0, [[150, 150]], "blue", "transparent")
    linhas(150, 150, [[150, 300]], "blue", "transparent")
    linhas(300, 0, [[150, 150]], "red", "transparent")

    //circulos amarelos
    arcos(70, 220, 15, 0, 2, "green", "yellow");
    arcos(220, 220, 15, 0, 2, "green", "yellow");
    //circulo aqua
    arcos(150, 115, 15, 0, 2, "blue", "aqua");

    //arcos de baixo
    arcos(150, 300, 40, 1, 2, "green", "aqua");
    arcos(150, 300, 60, 1.5, 2, "green", "transparent");
    arcos(150, 300, 80, 1, 1.5, "green", "transparent");
    
    //arcos de cima
    arcos(150, 150, 60, 1, 2, "green", "transparent");
    arcos(150, 150, 80, 1, 1.25, "green", "transparent");
    arcos(150, 150, 80, 1.75, 2, "green", "transparent");

    //escrito
    texto("Canvas", 150, 45, 150, 45, "20px Arial", "transparent", "black");
}

//desenho da casa
function desCasa(){
    //chao
    retangulo(0, 300, 400, 100, "gray", "gray");

    //casinha
    retangulo(150, 200, 100, 100, "#86471a", "#86471a");
    //telhado
    linhas(150, 200, [[200, 150], [250, 200], [150, 200]], "#f5694d", "#f5694d");
    //porta
    retangulo(190, 250, 20, 50, "#624423", "#624423");
    //janelas
    retangulo(160, 220, 30, 30, "#47bdfd", "#47bdfd");
    retangulo(210, 220, 30, 30, "#47bdfd", "#47bdfd");

    //arvores
    retangulo(50, 250, 20, 50, "#86471a", "#86471a");
    arcos(60, 235, 30, 0, 2, "#318a26", "#318a26");

    retangulo(350, 300, 20, 50, "#86471a", "#86471a");
    arcos(360, 285, 30, 0, 2, "#318a26", "#318a26");

    //cachoeira
    arcos(0, 300, 50, 1, 2, "#458efc", "#458efc");
    retangulo(0, 300, 50, 100, "#458efc", "#458efc");
    retangulo(50, 350, 100, 50, "#458efc", "#458efc");
    arcos(150, 400, 50, 1, 2, "#458efc", "#458efc");

    //sol
    arcos(300, 100, 50, 0, 2, "#fcff2d", "#fcff2d");
}

const slider = document.getElementById('slider');
const canvas1 = document.getElementById('casa');
const canvas2 = document.getElementById('linhas');


function changeSlider(){
    if (slider.value == 0) {
        canvas1.style.display = 'none'; // Oculta canvas "casa"
        canvas2.style.display = 'block'; // Mostra canvas "linhas"
        ctx = canvas2.getContext('2d');

        //codigo do desenho
        desLinhas();
    } 
    
    else {
        canvas1.style.display = 'block'; // Mostra canvas "casa"
        canvas2.style.display = 'none'; // Oculta canvas "linhas"
        ctx = canvas1.getContext('2d');

        //codigo do desenho
        desCasa();
    }
}

slider.addEventListener('input', () => {
    changeSlider();
});

// Inicialmente, mostre o canvas "casa"
canvas1.style.display = 'none';
canvas2.style.display = 'block';
ctx = canvas2.getContext('2d');
desLinhas();








