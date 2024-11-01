const personagens = [
    // Servamps
    { nome: "Sleepy Ash", genero: "Masculino", tipo: "Vampiro", filiacao: "Servamp", arco: "Principal", arcoNum: 1, altura: 1.77 },
    { nome: "Old Child", genero: "Masculino", tipo: "Vampiro", filiacao: "Servamp", arco: "Secundário", arcoNum: 2, altura: 0.80 },
    { nome: "Doubt-Doubt", genero: "Masculino", tipo: "Vampiro", filiacao: "Servamp", arco: "Secundário", arcoNum: 2, altura: 2.50 },
    { nome: "The Mother", genero: "Feminino", tipo: "Vampiro", filiacao: "Servamp", arco: "Secundário", arcoNum: 2, altura: 1.74 },
    { nome: "Lawless", genero: "Masculino", tipo: "Vampiro", filiacao: "Servamp", arco: "Secundário", arcoNum: 2, altura: 1.76 },
    { nome: "World End", genero: "Masculino", tipo: "Vampiro", filiacao: "Servamp", arco: "Secundário", arcoNum: 2, altura: 1.80 },
    { nome: "All of Love", genero: "Masculino", tipo: "Vampiro", filiacao: "Servamp", arco: "Secundário", arcoNum: 2, altura: 1.91 },
    { nome: "Tsubaki", genero: "Masculino", tipo: "Vampiro", filiacao: "Servamp", arco: "Secundário", arcoNum: 2, altura: 1.68 },

    // Eves
    { nome: "Mahiru Shirota", genero: "Masculino", tipo: "Humano", filiacao: "Eve", arco: "Principal", arcoNum: 1, altura: 1.65 },
    { nome: "Misono Alicein", genero: "Masculino", tipo: "Humano", filiacao: "Eve", arco: "Principal", arcoNum: 1, altura: 1.56 },
    { nome: "Mikuni Alicein", genero: "Masculino", tipo: "Humano", filiacao: "Eve", arco: "Secundário", arcoNum: 2, altura: 1.74 },
    { nome: "Tetsu Sendagaya", genero: "Masculino", tipo: "Humano", filiacao: "Eve", arco: "Secundário", arcoNum: 2, altura: 1.89 },
    { nome: "Licht Jekylland Todoroki", genero: "Masculino", tipo: "Humano", filiacao: "Eve", arco: "Secundário", arcoNum: 2, altura: 1.75 },
    { nome: "Izuna Nobel", genero: "Feminino", tipo: "Humano", filiacao: "Eve", arco: "Secundário", arcoNum: 2, altura: 1.64 },
    { nome: "Niccolo Carpediem", genero: "Masculino", tipo: "Humano", filiacao: "Eve", arco: "Secundário", arcoNum: 2, altura: 1.78 },

    // Subclasses
    { nome: "Belkia", genero: "Masculino", tipo: "Vampiro", filiacao: "Subclass", arco: "Secundário", arcoNum: 2, altura: 1.84 },
    { nome: "Gilberto Weasel", genero: "Masculino", tipo: "Vampiro", filiacao: "Subclass", arco: "Secundário", arcoNum: 2, altura: 1.67 },
    { nome: "Guildenstern", genero: "Masculino", tipo: "Vampiro", filiacao: "Subclass", arco: "Secundário", arcoNum: 2, altura: 1.84 },
    { nome: "Higan", genero: "Masculino", tipo: "Vampiro", filiacao: "Subclass", arco: "Secundário", arcoNum: 2, altura: 1.95 },
    { nome: "Lilac", genero: "Masculino", tipo: "Vampiro", filiacao: "Subclass", arco: "Secundário", arcoNum: 2, altura: 1.60 },
    { nome: "Marry", genero: "Feminino", tipo: "Vampiro", filiacao: "Subclass", arco: "Secundário", arcoNum: 2, altura: 1.02 },
    { nome: "Otogiri", genero: "Feminino", tipo: "Vampiro", filiacao: "Subclass", arco: "Secundário", arcoNum: 2, altura: 1.58 },
    { nome: "Rayscent Crazyrabbit", genero: "Masculino", tipo: "Vampiro", filiacao: "Subclass", arco: "Secundário", arcoNum: 2, altura: 1.79 },
    { nome: "Sakuya Watanuki", genero: "Masculino", tipo: "Vampiro", filiacao: "Subclass", arco: "Secundário", arcoNum: 2, altura: 1.73 },
    { nome: "Shamrock", genero: "Masculino", tipo: "Vampiro", filiacao: "Subclass", arco: "Secundário", arcoNum: 2, altura: 1.89 },
    { nome: "Yully", genero: "Feminino", tipo: "Vampiro", filiacao: "Subclass", arco: "Secundário", arcoNum: 2, altura: 1.02 },

    // C3-members
    { nome: "Junichiro Kurumamori", genero: "Masculino", tipo: "Humano", filiacao: "C3", arco: "Secundário", arcoNum: 2, altura: 1.85 },
    { nome: "Suuhei Tsuyuki", genero: "Masculino", tipo: "Humano", filiacao: "C3", arco: "Secundário", arcoNum: 2, altura: 1.78 },
    { nome: "Taishi Toma", genero: "Masculino", tipo: "Humano", filiacao: "C3", arco: "Secundário", arcoNum: 2, altura: 1.92 },
    { nome: "Tsurugi Kamiya", genero: "Masculino", tipo: "Humano", filiacao: "C3", arco: "Secundário", arcoNum: 2, altura: 1.70 },
    { nome: "Yoshimasa Tsuyuki", genero: "Masculino", tipo: "Humano", filiacao: "C3", arco: "Secundário", arcoNum: 2, altura: 1.78 },
    { nome: "Yumikage Tsukimitsu", genero: "Masculino", tipo: "Humano", filiacao: "C3", arco: "Secundário", arcoNum: 2, altura: 1.79 },
    { nome: "Iori Tsukimitsu", genero: "Masculino", tipo: "Humano", filiacao: "C3", arco: "Secundário", arcoNum: 2, altura: 1.81 },
    { nome: "Toru Shirota", genero: "Masculino", tipo: "Humano", filiacao: "C3", arco: "Secundário", arcoNum: 2, altura: 1.80 },

    // Other Characters
    { nome: "Gear", genero: "Masculino", tipo: "Lobisomem", filiacao: "Nenhuma", arco: "Secundário", arcoNum: 2, altura: 1.61 },
    { nome: "Inner Kuro", genero: "Masculino", tipo: "Other", filiacao: "Servamp", arco: "Secundário", arcoNum: 2, altura: 1.77 },
    { nome: "Cappuccino", genero: "Masculino", tipo: "Humano", filiacao: "Máfia", arco: "Secundário", arcoNum: 2, altura: 1.73 },
    { nome: "Crantz Rosen", genero: "Masculino", tipo: "Humano", filiacao: "Nenhuma", arco: "Secundário", arcoNum: 2, altura: 1.83 },
    { nome: "Eisuke Dodo", genero: "Masculino", tipo: "Humano", filiacao: "Nenhuma", arco: "Secundário", arcoNum: 2, altura: 1.75},
    { nome: "Johannes Mimir Faustus", genero: "Masculino", tipo: "Humano", filiacao: "Nenhuma", arco: "Secundário", arcoNum: 2, altura: 2.11},
    { nome: "Koyuki", genero: "Masculino", tipo: "Humano", filiacao: "Nenhuma", arco: "Secundário", arcoNum: 2, altura: 1.78},
    { nome: "Mikado Alicein", genero: "Masculino", tipo: "Humano", filiacao: "Nenhuma", arco: "Secundário", arcoNum: 2, altura: 1.75},
    { nome: "Miyako Tsukimitsu", genero: "Feminino", tipo: "Humano", filiacao: "Nenhuma", arco: "Secundário", arcoNum: 2, altura: 1.83},
    { nome: "Ophelia", genero: "Feminino", tipo: "Humano", filiacao: "Nenhuma", arco: "Secundário", arcoNum: 2, altura: 1.65},
    { nome: "Ryusei", genero: "Masculino", tipo: "Humano", filiacao: "Nenhuma", arco: "Secundário", arcoNum: 2, altura: 1.61},
    { nome: "Sensei", genero: "Masculino", tipo: "Other", filiacao: "Servamp", arco: "Secundário", arcoNum: 2, altura: "??"},
    { nome: "Takuto Kurumamori", genero: "Masculino", tipo: "Humano", filiacao: "Nenhuma", arco: "Secundário", arcoNum: 2, altura: 1.0},
    { nome: "Tiramisu", genero: "Masculino", tipo: "Humano", filiacao: "Máfia", arco: "Secundário", arcoNum: 2, altura: 1.70},
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

    // Colocar imagem nas caracteristicas
    // const img = document.createElement("img");
    // img.src = personagem.imagem; // Define a URL da imagem
    // img.alt = personagem.nome; // Texto alternativo para a imagem
    // img.style.width = "50px"; // Ajuste o tamanho da imagem conforme necessário
    // img.style.height = "50px";

    // const imgPerosnagem = document.createElement("div");
    // imgPerosnagem.className = "nome"; // Classe para estilizar cada sugestão
    // imgPerosnagem.textContent = personagem.imagem; // Mostra o nome do personagem
    
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
    
    const alturaPersonagem = document.createElement("div");
    alturaPersonagem.className = "altura"; // Classe para estilizar cada sugestão
    alturaPersonagem.textContent = personagem.altura; // Mostra o nome do personagem

    // Muda a cor de fundo se a filiação for igual ao do personagem sorteado
    if (personagem.altura == sorteado.altura) {
        alturaPersonagem.style.backgroundColor = "lightgreen"; // Igual
    } 
    else if (personagem.altura > sorteado.altura) {
        alturaPersonagem.style.backgroundColor = "lightaqua"; // Diferente
    }

    else {
        alturaPersonagem.style.backgroundColor = "lightblue"; // Diferente
    }

    tentativa.appendChild(nomePerosnagem);
    tentativa.appendChild(generoPerosnagem);
    tentativa.appendChild(tipoPerosnagem);
    tentativa.appendChild(filiacaoPerosnagem);
    tentativa.appendChild(alturaPersonagem);

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