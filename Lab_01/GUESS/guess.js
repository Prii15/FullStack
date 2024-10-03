

// Função que coloca um numero randomico para ser acertado
function rand(){
    randomico = parseInt(Math.floor(Math.random()*100));
    console.log("Aleatorio = ", randomico);

    return randomico;
}

//Função que limpa todas as boxes
function limpaTudo(){
    document.getElementById("Result").innerHTML = "☆";
    document.getElementById("menor").innerHTML = "";
    document.getElementById("maior").innerHTML = "";
    document.getElementById("chute").value = "";
    document.getElementById("chute").style.setProperty("background-color", "white");
}

function limpa(){
    document.getElementById("Result").innerHTML = "☆";
    document.getElementById("chute").value = "";
    document.getElementById("chute").style.setProperty("background-color", "white");
}



// codigo principal
function ex(){
    let numero = parseInt(document.getElementById("chute").value);

    // se o numero digitado for maior que 99, pede para chutar de novo
    if(numero > 99){
        document.getElementById("Result").innerHTML = "Número digitado maior que 99, tente novamente!";
    }

    else{
        //se o numero chutado for igual o sorteado pela pagina, voce acerta
        if(numero === randomico){
            document.getElementById("Result").innerHTML = "Número igual! Parabéns!";
            document.getElementById("chute").style.setProperty("background-color", "rgb(46, 255, 31)");
        }
        
        //se o numero chutado for menor, voce erra e tenta de novo, com ele indo para a lista dos numeros menores que o certo
        else if(numero < randomico){
            document.getElementById("Result").innerHTML = "Número muito pequeno!";
            document.getElementById("chute").style.setProperty("background-color", "rgb(255, 20, 0)");
    
            document.getElementById("menor").innerHTML += numero + ", ";

            setTimeout(()=>limpa(), 2000)
            
        }
    
        //se o numero chutado for maior, voce erra e tenta de novo, com ele indo para a lista dos numeros maiores que o certo
        else if(numero > randomico){
            document.getElementById("Result").innerHTML = "Número muito grande!";
            document.getElementById("chute").style.setProperty("background-color", "rgb(255, 20, 0)");
    
            document.getElementById("maior").innerHTML += numero + ", ";

            setTimeout(()=>limpa(), 2000)
        }
    }
}


//Aceita a tecla enter para validação da tentativa

// Execute a function when the user presses a key on the keyboard
document.getElementById("chute").addEventListener("keydown", function(event) {
    // If the user presses the "Enter" key on the keyboard
      if (event.key === "Enter") {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          document.getElementById("valid").click();
      }
  
      if (event.key === "Backspace"){
          event.preventDefault();
          limpa();
      }
  });

//Iniciar
rand();