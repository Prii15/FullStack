function retangulo(x, y, largura, altura, cor_linha, cor_preenchimento){
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = cor_linha;
    ctx.fillStyle = cor_preenchimento;
    ctx.strokeRect(x,y,largura,altura); 
    ctx.fillRect(x,y,largura,altura);
    ctx.closePath();
}

//passar uma lista
function linhas(start_x, start_y, finish_x, finish_y, cor_linha, cor_preenchimento){
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = cor_linha;
    ctx.fillStyle = cor_preenchimento;
    ctx.moveTo(start_x, start_y);
    ctx.lineTo(finish_x, finish_y);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

function arcos(center_x, center_y, raio, start_ang, finish_ang, cor_linha, cor_preenchimento){
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = cor_linha;
    ctx.fillStyle = cor_preenchimento;
    ctx.arc(center_x, center_y, raio, start_ang*Math.PI,finish_ang*Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}

function texto(text, text_x, text_y, preenc_x, preenc_y, font, cor_linha, cor_preenchimento){
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = cor_linha;
    ctx.fillStyle = cor_preenchimento;
    ctx.font = "Arial"
    ctx.font = font;
    ctx.strokeText(text, text_x, text_y)
    ctx.fillText(text, preenc_x,preenc_y);
    ctx.closePath();
}

function desLinhas(){
    retangulo(0, 0, 50, 50, "blue", "blue");
    retangulo(250, 0, 50, 50, "red", "red");

    retangulo(0, 120, 30, 60, "aqua", "aqua");
    retangulo(270, 135, 30, 30, "aqua", "aqua");

    retangulo(0, 240, 30, 60, "yellow", "yellow");
    retangulo(30, 270, 30, 30, "yellow", "yellow");

    retangulo(270, 240, 30, 60, "black", "black");
    retangulo(240, 270, 30, 30, "black", "black");

    linhas(0, 150, 300, 150, "green", "transparent")

}

function desCasa(){

}

const slider = document.getElementById('slider');
const canvas1 = document.getElementById('casa');
const canvas2 = document.getElementById('linhas');


slider.addEventListener('input', () => {
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
});

// Inicialmente, mostre o canvas "casa"
canvas1.style.display = 'none';
canvas2.style.display = 'block';
ctx = canvas2.getContext('2d');
desLinhas();








