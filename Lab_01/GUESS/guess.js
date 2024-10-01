function rand(){
    randomico = parseInt(Math.floor(Math.random()*100));
    console.log("Aleatorio = ", randomico);

    document.getElementById("Result").innerHTML = "";
    document.getElementById("menor").innerHTML = "";
    document.getElementById("maior").innerHTML = "";
    document.getElementById("chute").value = "";
    document.getElementById("chute").style.setProperty("background-color", "white");

    return randomico;
}

rand();

function ex(){
    let numero = parseInt(document.getElementById("chute").value);

    if(numero > 99){
        document.getElementById("Result").innerHTML = "Número digitado maior que 99, tente novamente!";
    }

    else{
        if(numero === randomico){
            document.getElementById("Result").innerHTML = "Número igual! Parabéns!";
            document.getElementById("chute").style.setProperty("background-color", "green");
        }
        
        else if(numero < randomico){
            document.getElementById("Result").innerHTML = "Número muito pequenno!";
            document.getElementById("chute").style.setProperty("background-color", "red");
    
            document.getElementById("menor").innerHTML += numero + ", ";
        }
    
        else if(numero > randomico){
            document.getElementById("Result").innerHTML = "Número muito grande!";
            document.getElementById("chute").style.setProperty("background-color", "red");
    
            document.getElementById("maior").innerHTML += numero + ", ";
        }
    }

    
}
