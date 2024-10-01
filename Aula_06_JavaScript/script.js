let nome = "Priscila" //prompt("Insira o seu nome: ");
let idade = 21 //parseInt(prompt("Insira a sua idade: "));
let ano_atual = 2024;

let ano_nascimento = ano_atual - idade;

let resposta = "Olá " + nome + "! Seu ano de nascimento é " + ano_nascimento;
document.getElementById("R1").innerHTML = resposta;


function exibeMensagem(texto){
    alert(texto);
}

// exibeMensagem("Olá");
// exibeMensagem("Oi"); 

function soma(a, b){
    return a + b;
}

function mult(a, b){
    return a * b;
}

let c = soma(4, 5);
console.log("Resultado da soma = ", c);
console.log("Resultado da soma = ", soma(6, 2));

function ex2(){
    let numero = parseInt(document.getElementById("ex2_n1").value);
    //let resposta = numero * 3;
    let resposta = mult(numero, 3);
    document.getElementById("R2").innerHTML = resposta;
}

function ex3(){
    let numero1 = parseInt(document.getElementById("ex3_n1").value);
    let numero2 = parseInt(document.getElementById("ex3_n2").value);

    let resposta3 = soma(numero1, numero2);
    document.getElementById("R3").innerHTML = resposta3;
    document.getElementById("R3_imput").value = resposta3;
}

function ex4(){
    let numero1 = parseInt(document.getElementById("ex4_n1").value);
    let numero2 = parseInt(document.getElementById("ex4_n2").value);

    if(numero1 < 0 || numero2 < 0){
        let resposta = soma(numero1, numero2);
        let operacao = "soma";

        document.getElementById("operacao").innerHTML = operacao;
        document.getElementById("R4").innerHTML = resposta;
    }

    else{
        let resposta = mult(numero1, numero2);
        let operacao = "multiplicação";

        document.getElementById("operacao").innerHTML = operacao;
        document.getElementById("R4").innerHTML = resposta;
    }
    
}


// function e1{
//     let randomico = Math.floor(Math.random()*10);
//     console.log("Aleatorio = ", randomico);
//     document.getElementById("R3").innerHTML = resposta;
// }
