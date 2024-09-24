console.log("Olá");
//window.alert("oi");

//o prompt é como o imput, pega informação e da para salvar em variavel (let nomedavar)
// let nome = prompt("Qual seu nome?");
// console.log(nome);

//Exercicio 01
//Desenvolver um algoritmo em JavaScript que exiba os números ímpares de 1 a 100
console.log("Exercicio 01");
for(let i=0; i<100; i++){
    if(i%2 === 1){
        console.log(i);
    }
}
//poderia começar de 1 e incrementar de 2 em 2

//Exercicio 02
//Faça um programa para imprimir os múltiplos de 5, no intervalo de 1 até 500
console.log("Exercicio 02");
for(let i=0; i<=500; i++){
    if(i%5 === 0){
        console.log(i);
    }
}

//Exercicio 03
//Faça um programa em JavaScript que leia um número inteiro positivo e mostre todos os números a partir dele até zero (decrescente).  
console.log("Exercicio 03")

let num1 = prompt("Digite um numero inteiro positivo: ");
for(let i=num1; i>=0; i--){
    console.log(i);
    
}

//Exercicio 04
//Desenvolver um algoritmo em JavaScript que exibe o resultado do fatorial de um número inteiro informado pelo usuário
console.log("Exercicio 04")

let num2 = prompt("Digite um numero inteiro positivo: ");
fatorial = 1;

if(num2 != 0){
    for(let i=num2; i>0; i--){
        fatorial = fatorial*i;
        
    }
    console.log(fatorial);
}

else{
    console.log(fatorial);
}

//Exercicio 05
//Foi realizada uma pesquisa entre os habitantes de uma dada região. Foram recolhidos os dados de idade, sexo (M/F) e salário. Construa um programa em JavaScript que informe:
// a média de salário do grupo; 
// maior e menor idade do grupo; 
// quantidade de mulheres com salário até R$5000,00. 
// Encerre a entrada de dados quando for digitada uma idade negativa.
console.log("Exercicio 05")

let quantF = 0;
let mediaSalario = 0;
let menorId = 1000;
let maiorId = 0;

while(true){
    
    let idade = prompt("Digite a idade da pessoa: ");

    if(idade = 0){
        break;
    }

    let sexo = prompt("Digite o sexo (M/F): ");
    let salario = prompt("Digite o salário: ");

    if(sexo == "F" && salario<=5000){
        quantF++;
    }

    mediaSalario = mediaSalario + salario;

    if(menorId > idade){
        menorId = idade;
    }

    if(maiorId < idade){
        maiorId = idade;
    }

    console.log("Média salarial do grupo: ", mediaSalario);
    console.log("Maior idade do grupo: ", maiorId);
    console.log("Menor idade do grupo: ", menorId);
    console.log("Quantidade de mulheres com salário até R$5000,00: ", quantF);
}

