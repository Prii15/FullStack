const personagens = [
    // Servamps
    { nome: "Sleepy Ash", genero: "Masculino", tipo: "Vampiro", filiacao: "Servamp", arco: "Principal" },
    { nome: "Old Child", genero: "Masculino", tipo: "Vampiro", filiacao: "Servamp", arco: "Secundário" },
    { nome: "Doubt-Doubt", genero: "Masculino", tipo: "Vampiro", filiacao: "Servamp", arco: "Secundário" },
    { nome: "The Mother", genero: "Feminino", tipo: "Vampiro", filiacao: "Servamp", arco: "Secundário" },
    { nome: "Lawless", genero: "Masculino", tipo: "Vampiro", filiacao: "Servamp", arco: "Secundário" },
    { nome: "World End", genero: "Masculino", tipo: "Vampiro", filiacao: "Servamp", arco: "Secundário" },
    { nome: "All of Love", genero: "Masculino", tipo: "Vampiro", filiacao: "Servamp", arco: "Secundário" },
    { nome: "Tsubaki", genero: "Masculino", tipo: "Vampiro", filiacao: "Servamp", arco: "Secundário" },

    // Eves
    { nome: "Mahiru Shirota", genero: "Masculino", tipo: "Humano", filiacao: "Eve", arco: "Principal" },
    { nome: "Misono Alicein", genero: "Masculino", tipo: "Humano", filiacao: "Eve", arco: "Principal" },
    { nome: "Mikuni Alicein", genero: "Masculino", tipo: "Humano", filiacao: "Eve", arco: "Secundário" },
    { nome: "Tetsu Sendagaya", genero: "Masculino", tipo: "Humano", filiacao: "Eve", arco: "Secundário" },
    { nome: "Licht Jekylland Todoroki", genero: "Masculino", tipo: "Humano", filiacao: "Eve", arco: "Secundário" },
    { nome: "Izuna Nobel", genero: "Feminino", tipo: "Humano", filiacao: "Eve", arco: "Secundário" },
    { nome: "Niccolo Carpediem", genero: "Masculino", tipo: "Humano", filiacao: "Eve", arco: "Secundário" },

    // Subclasses
    { nome: "Belkia", genero: "Masculino", tipo: "Vampiro", filiacao: "Subclass", arco: "Secundário" },
    { nome: "Gilberto Weasel", genero: "Masculino", tipo: "Vampiro", filiacao: "Subclass", arco: "Secundário" },
    { nome: "Guildenstern", genero: "Masculino", tipo: "Vampiro", filiacao: "Subclass", arco: "Secundário" },
    { nome: "Higan", genero: "Masculino", tipo: "Vampiro", filiacao: "Subclass", arco: "Secundário" },
    { nome: "Lilac", genero: "Masculino", tipo: "Vampiro", filiacao: "Subclass", arco: "Secundário" },
    { nome: "Marry", genero: "Feminino", tipo: "Vampiro", filiacao: "Subclass", arco: "Secundário" },
    { nome: "Otogiri", genero: "Feminino", tipo: "Vampiro", filiacao: "Subclass", arco: "Secundário" },
    { nome: "Rayscent Crazyrabbit", genero: "Masculino", tipo: "Vampiro", filiacao: "Subclass", arco: "Secundário" },
    { nome: "Sagami", genero: "Masculino", tipo: "Vampiro", filiacao: "Subclass", arco: "Secundário" },
    { nome: "Sakuya Watanuki", genero: "Masculino", tipo: "Vampiro", filiacao: "Subclass", arco: "Secundário" },
    { nome: "Shamrock", genero: "Masculino", tipo: "Vampiro", filiacao: "Subclass", arco: "Secundário" },
    { nome: "Yully", genero: "Feminino", tipo: "Vampiro", filiacao: "Subclass", arco: "Secundário" },

    // C3-members
    { nome: "Junichiro Kurumamori", genero: "Masculino", tipo: "Humano", filiacao: "C3", arco: "Secundário" },
    { nome: "Shifumi Kurumamori", genero: "Feminino", tipo: "Humano", filiacao: "C3", arco: "Secundário" },
    { nome: "Suuhei Tsuyuki", genero: "Masculino", tipo: "Humano", filiacao: "C3r", arco: "Secundário" },
    { nome: "Taishi Toma", genero: "Masculino", tipo: "Humano", filiacao: "C3", arco: "Secundário" },
    { nome: "Tsurugi Kamiya", genero: "Masculino", tipo: "Humano", filiacao: "C3", arco: "Secundário" },
    { nome: "Yoshimasa Tsuyuki", genero: "Masculino", tipo: "Humano", filiacao: "C3", arco: "Secundário" },
    { nome: "Yumikage Tsukimitsu", genero: "Masculino", tipo: "Humano", filiacao: "C3", arco: "Secundário" },
    { nome: "Iori Tsukimitsu", genero: "Masculino", tipo: "Humano", filiacao: "C3", arco: "Secundário" },
    { nome: "Toru Shirota", genero: "Masculino", tipo: "Humano", filiacao: "C3", arco: "Secundário" },

    // Other Characters
    { nome: "Gear", genero: "Masculino", tipo: "Lobisomem", filiacao: "Nenhuma", arco: "Secundário" },
    { nome: "Inner Kuro", genero: "Masculino", tipo: "Other", filiacao: "Servamp", arco: "Secundário" },
    { nome: "Cappuccino", genero: "Masculino", tipo: "Humano", filiacao: "Máfia", arco: "Secundário" },
    { nome: "Crantz Rosen", genero: "Masculino", tipo: "Humano", filiacao: "Nenhuma", arco: "Secundário" },
    { nome: "Eisuke Dodo", genero: "Masculino", tipo: "Humano", filiacao: "Nenhuma", arco: "Secundário" },
    { nome: "Johannes Mimir Faustus", genero: "Masculino", tipo: "Humano", filiacao: "Nenhuma", arco: "Secundário" },
    { nome: "Koyuki", genero: "Masculino", tipo: "Humano", filiacao: "Nenhuma", arco: "Secundário" },
    { nome: "Mikado Alicein", genero: "Masculino", tipo: "Humano", filiacao: "Nenhuma", arco: "Secundário" },
    { nome: "Miyako Tsukimitsu", genero: "Feminino", tipo: "Humano", filiacao: "Nenhuma", arco: "Secundário" },
    { nome: "Ophelia", genero: "Feminino", tipo: "Humano", filiacao: "Nenhuma", arco: "Secundário" },
    { nome: "Ryusei", genero: "Masculino", tipo: "Humano", filiacao: "Nenhuma", arco: "Secundário" },
    { nome: "Sensei", genero: "Masculino", tipo: "Other", filiacao: "Servamp", arco: "Secundário" },
    { nome: "Takuto Kurumamori", genero: "Masculino", tipo: "Humano", filiacao: "Nenhuma", arco: "Secundário" },
    { nome: "Tiramisu", genero: "Masculino", tipo: "Humano", filiacao: "Máfia", arco: "Secundário" },
];

let sorteado;
let personagemSorteado;

// Função que coloca um numero randomico para ser acertado
function rand(){    
    let index = Math.floor(Math.random()*personagens.length);
    console.log("Aleatorio = ", personagens[index].nome);
    sorteado = personagens[index];
    personagemSorteado = personagens[index].nome;
}

//Função que limpa todas as boxes
function limpaTudo(){
    document.getElementById("Result").innerHTML = "☆";
    document.getElementById("chute").value = "";
    document.getElementById("chute").style.setProperty("background-color", "white");
}

function limpa(){
    document.getElementById("Result").innerHTML = "☆";
    document.getElementById("chute").value = "";
    document.getElementById("chute").style.setProperty("background-color", "white");
}

function mostraTentativas(personagem){
    const tentativaContainer = document.getElementById("tentativas");

    const tentativa = document.createElement("div");
    tentativa.className = "tentativa"; // Classe para estilizar cada sugestão
    
    const nomePerosnagem = document.createElement("div");
    nomePerosnagem.className = "nome"; // Classe para estilizar cada sugestão
    nomePerosnagem.textContent = personagem.nome; // Mostra o nome do personagem

    // Muda a cor de fundo se o nome for igual ao do personagem sorteado
    if (personagem.nome == sorteado.nome) {
        nomePerosnagem.style.setProperty("background-color", "lightgreen");
        nomePerosnagem.style.backgroundColor = "lightgreen"; // Igual
    } 
    else {
        nomePerosnagem.style.backgroundColor = "lightcoral"; // Diferente
    }

    const generoPerosnagem = document.createElement("div");
    generoPerosnagem.className = "genero"; // Classe para estilizar cada sugestão
    generoPerosnagem.textContent = personagem.genero; // Mostra o nome do personagem

    // Muda a cor de fundo se o gênero for igual ao do personagem sorteado
    if (personagem.genero == sorteado.genero) {
        generoPerosnagem.style.backgroundColor = "lightgreen"; // Igual
    } 
    else {
        generoPerosnagem.style.backgroundColor = "lightcoral"; // Diferente
    }

    const tipoPerosnagem = document.createElement("div");
    tipoPerosnagem.className = "tipo"; // Classe para estilizar cada sugestão
    tipoPerosnagem.textContent = personagem.tipo; // Mostra o nome do personagem

    // Muda a cor de fundo se o tipo for igual ao do personagem sorteado
    if (personagem.tipo == sorteado.tipo) {
        tipoPerosnagem.style.backgroundColor = "lightgreen"; // Igual
    } 
    else {
        tipoPerosnagem.style.backgroundColor = "lightcoral"; // Diferente
    }

    const filiacaoPerosnagem = document.createElement("div");
    filiacaoPerosnagem.className = "filiacao"; // Classe para estilizar cada sugestão
    filiacaoPerosnagem.textContent = personagem.filiacao; // Mostra o nome do personagem

    // Muda a cor de fundo se a filiação for igual ao do personagem sorteado
    if (personagem.filiacao == sorteado.filiacao) {
        filiacaoPerosnagem.style.backgroundColor = "lightgreen"; // Igual
    } 
    else {
        filiacaoPerosnagem.style.backgroundColor = "lightcoral"; // Diferente
    }
    
    tentativa.appendChild(nomePerosnagem);
    tentativa.appendChild(generoPerosnagem);
    tentativa.appendChild(tipoPerosnagem);
    tentativa.appendChild(filiacaoPerosnagem);

    // Adiciona a sugestão ao container
    tentativaContainer.appendChild(tentativa);
}

// codigo principal
function ex(){
    let encontrado = false;
    let chute = document.getElementById("chute").value.trim();

    for(let i = 0; i < personagens.length; i++){
        if(chute.toLowerCase() === personagens[i].nome.toLowerCase()){
            encontrado = true;

            //se o numero chutado for igual o sorteado pela pagina, voce acerta
            if(chute === personagemSorteado){
                document.getElementById("Result").innerHTML = "Personagem certo! Parabéns!";
                document.getElementById("chute").style.setProperty("background-color", "rgb(46, 255, 31)");

                mostraTentativas(personagens[i]);

                break;
                //document.getElementById("tentativa").innerHTML += "\nNome: " + personagens[i].nome + " | Genero: " + personagens[i].genero + " | Tipo: " + personagens[i].tipo + " | Filiação: " + personagens[i].filiacao; 
            }

            else if(chute != personagemSorteado){
                document.getElementById("Result").innerHTML = "Personagem errado!";
                document.getElementById("chute").style.setProperty("background-color", "rgb(255, 20, 0)");
               
                mostraTentativas(personagens[i]);
                //document.getElementById("tentativa").innerHTML += "\nNome: " + personagens[i].nome + " | Genero: " + personagens[i].genero + " | Tipo: " + personagens[i].tipo + " | Filiação: " + personagens[i].filiacao;
            }

            
        }
    }

    if(!encontrado) {
        document.getElementById("Result").innerHTML = "Nome não está no banco de dados, tente novamente!";
    }
}

// Adiciona evento de clique ao campo de entrada
const chuteInput = document.getElementById("chute");

// Evento de clique para filtrar sugestões
chuteInput.addEventListener("click", function() {
    filterSuggestions();
});

// Evento de entrada para filtrar sugestões enquanto o usuário digita
chuteInput.addEventListener("input", filterSuggestions);

// Evento de blur para esconder as sugestões
chuteInput.addEventListener("blur", function() {
    // Diminui o tempo para garantir que o clique em uma sugestão seja registrado
    setTimeout(() => {
        document.getElementById("suggestions").innerHTML = ''; // Limpa as sugestões
    }, 200);
});
//Aceita a tecla enter para validação da tentativa

// Execute a function when the user presses a key on the keyboard
chuteInput.addEventListener("keydown", function(event) {
    // If the user presses the "Enter" key on the keyboard
      if (event.key === "Enter") {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          document.getElementById("valid").click();
      }
});

function filterSuggestions() {
    const input = document.getElementById("chute");
    const filter = input.value.toLowerCase();
    const suggestionsContainer = document.getElementById("suggestions");

    // Limpa as sugestões anteriores
    suggestionsContainer.innerHTML = "";

     // Se não houver texto no input, não mostra sugestões
    if (filter === "") {
        return; // Sai da função se não houver texto
    }


    // Filtra os personagens com base na entrada do usuário
    const filteredPersonagens = personagens.filter(personagem =>
        personagem.nome.toLowerCase().includes(filter)
    );

    // Adiciona as sugestões ao DOM
    filteredPersonagens.forEach(personagem => {
        const suggestionItem = document.createElement("div");
        suggestionItem.className = "suggestion"; // Classe para estilizar cada sugestão
        suggestionItem.textContent = personagem.nome; // Mostra o nome do personagem

        // Adiciona um evento de clique a cada sugestão
        suggestionItem.onclick = () => selectName(personagem); // Passa o objeto personagem
        
        // Adiciona a sugestão ao container
        suggestionsContainer.appendChild(suggestionItem);
    });
}

function selectName(personagem) {
    document.getElementById("chute").value = personagem.nome;
    document.getElementById("suggestions").innerHTML = ''; // Limpa as sugestões
}


//iniciar
window.onload = rand; // Isso garante que um personagem seja sorteado ao carregar a página.