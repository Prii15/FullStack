// SOM DO JOGO
const button = document.getElementById('musicButton');
const icon = document.getElementById('buttonIcon');
const music = document.getElementById('background-music');
let isPlaying = false;

// Alternar play/pause com o botão
button.addEventListener('click', () => {
    if (isPlaying) {
        music.pause();
        icon.src = 'imagens/soundOff.png'; 
    } else {
        music.play();
        icon.src = 'imagens/soundOn.png'; 
    }
    isPlaying = !isPlaying; // Alterna o estado
});

//INICIA CANVAS E VARIAVEIS
//Prepara o canvas para receber os elementos
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Inicializa as variaveis
let vertPosition = 30; // Ajuste a posição vertical inicial
let horiPosition = 50; // Posição horizontal do jogador

let onPlatform = false; // Personagem jogavel esta na plataforma?
let isJumping = false; // Personagem jogavel esta pulando?
let isAreaAtack = false; // Personagem jogavel esta dando ataue em area?

let gravity = 1; // Aceleração da gravidade
let jumpStrength = 15; // Força do pulo
let vertVelocity = 0; // Velocidade vertical do jogador
let horiVelocity = 0; // Velocidade horizontal do jogador
let persoHealth = 5; // Vida max
const attackRadius = 100; // Raio do ataque em area

let platforms = []; // Armazena plataformas
let villains = []; // Armazena viloes

let enemiesDefeated = 0; // Variável para contar os inimigos derrotados
let defeatedRecord = 0; // Armazena record de inimigos derrotados
let isGameOver = false; // Estado do jogo
let gameLoopRunning = false;

//INICIALIZA MENU DO JOGO
const menuStart = document.getElementById('menuJogo');
const menuFim = document.getElementById('fim');
let gameState = 'menu'; // Estado inicial do jogo


// Função para mostrar o menu
function showMenu(){
    gameState = 'menu';
    menuStart.style.display = 'block';
    menuFim.style.display = 'none';
    canvas.style.display = 'none';
}

// Função para iniciar o jogo
function startGame() {
    gameState = 'game';
    menuStart.style.display = 'none';
    menuFim.style.display = 'none';
    canvas.style.display = 'block';
    
    resetGame();

    createPlatforms();
    spawnVillains();

    if(!gameLoopRunning){
        gameLoopRunning = true;
        gameLoop();
    }
    
}

// FIM DE JOGO
// Função para terminar o jogo
function showEnd() {
    // Atualiza o texto do final
    document.getElementById('pontos').innerHTML = `Você derrotou ${enemiesDefeated} inimigos!`;
    document.getElementById('record').innerHTML = `Seu record de inimigos derrotados é ${defeatedRecord}!`;

    gameState = 'end';
    menuStart.style.display = 'none';
    menuFim.style.display = 'block';
    canvas.style.display = 'none';
    // Aqui você pode adicionar lógica para reiniciar o jogo, se necessário
}

document.getElementById('buttonPlay').addEventListener('click', startGame);
document.getElementById('buttonRestart').addEventListener('click', startGame);
document.getElementById('buttonMenu').addEventListener('click', showMenu);

//PERSONAGEM JOGAVEL
// Carregando o sprite do personagem
const playerImage = new Image();
playerImage.src = 'sprites/hornet_stop.png';

let hornet = {
    x: horiPosition,
    y: vertPosition,
    width: 60,
    height: 80,
    health: persoHealth,
    img: playerImage, // Use a imagem já carregada
    facingRight: true, // Nova propriedade para controlar a direção
    isInCollision: false,
    canTakeDamage: true,

    takeDamage: function(){
        this.canTakeDamage = false;
        if (persoHealth > 0) {
            persoHealth -= 1; // Reduz a saúde em 1 ponto
            this.health = persoHealth;
            console.log("Hornet recebeu dano! Vida restante: " + this.health);

            // Personagem morre
            if (persoHealth === 0) {
                isGameOver = true; // Define o estado de fim de jogo

                showEnd();
            }
        }

        // Reabilita a possibilidade de receber dano após 2 segundos
        setTimeout(() => {
            this.canTakeDamage = true;
        }, 2000);
    }
};

// Função para criar e desenhar o personagem
function drawPlayer() {
    ctx.save(); // Salva o estado atual do contexto

    // Inverte a imagem se o personagem estiver se movendo para a esquerda
    if (hornet.facingRight) {
        ctx.scale(-1, 1); // Inverte a imagem horizontalmente
        ctx.drawImage(
            hornet.img,
            -hornet.x - hornet.width, // Ajusta a posição x ao inverter
            canvas.height - hornet.y - hornet.height, // Corrigido para posição correta
            hornet.width,
            hornet.height
        );
    } else {
        ctx.drawImage(
            hornet.img,
            hornet.x,
            canvas.height - hornet.y - hornet.height, // Corrigido para posição correta
            hornet.width,
            hornet.height
        );
    }

    ctx.restore(); // Restaura o estado anterior do contexto
}

// Vida do player
const lifeImage = new Image();
lifeImage.src = 'sprites/hp.png';

function drawPlayerHealth() {
    const lifeWidth = 25; // Largura da imagem da vida
    const lifeHeight = 30; // Altura da imagem da vida

    for (let i = 0; i < hornet.health; i++) {
        ctx.drawImage(
            lifeImage,
            100 + i * (lifeWidth + 5), // Posição horizontal
            30, // Posição vertical
            lifeWidth,
            lifeHeight
        );
    }
}

// Função de pulo
function jump() {
    if (isJumping) return;
    isJumping = true;
    onPlatform = false;
    vertVelocity = jumpStrength; // Define a velocidade inicial do pulo
}

// Função para mover o jogador
function move(direction) {

    if (direction === 'left' && horiPosition > 0) {
        horiVelocity = -5; // Move para a esquerda
        hornet.facingRight = false; // Atualiza a direção
    } else if (direction === 'right' && horiPosition < canvas.width - hornet.width) {
        horiVelocity = 5; // Move para a direita
        hornet.facingRight = true; // Atualiza a direção
    }
    
}

function areaAttack() {
    isAreaAtack = true;

    // Dano contínuo a cada intervalo
    const damageInterval = setInterval(() => {
        villains.forEach(villain => {
            const distance = Math.sqrt(
                (hornet.x - villain.x) ** 2 +
                (hornet.y - villain.y) ** 2
            );

            // Verifica se o vilão está dentro do raio de ataque
            if (distance <= attackRadius) {
                villain.health -= 30; // Dano ao vilão

                // Remove o vilão se a saúde chegar a zero
                if (villain.health <= 0) {
                    enemiesDefeated++;

                    if(enemiesDefeated > defeatedRecord){
                        defeatedRecord = enemiesDefeated;
                    }
                    
                    villains = villains.filter(v => v !== villain);
                }
            }
        });
    }, 500); // Dano a cada 500 ms enquanto a área de ataque está ativa

    // Para o dano após 2 segundos
    setTimeout(() => {
        clearInterval(damageInterval);
        isAreaAtack = false;
        console.log('Ataque em área desativado');
    }, 2000);
}

const counterBackground = new Image();
counterBackground.src = 'imagens/recepAlma.png'; // Caminho para a sua imagem


function drawEnemiesDefeated() {
    // Desenha o fundo do contador
    ctx.drawImage(counterBackground, 0, 10, 100, 70); // Ajuste a posição e tamanho conforme necessário
    
    ctx.fillStyle = 'white'; // Cor do texto
    ctx.font = '25px Hollow Knight'; // Estilo da fonte
    ctx.fillText(`${enemiesDefeated}`, 30, 60); // Ajuste a posição do texto
}



// Ataque em area
const attackAreaImage = new Image();
attackAreaImage.src = 'sprites/hornet_areaAttack.png';

function drawAttackArea() {
    const x = hornet.x + hornet.width / 2 - attackRadius; // Calcula a posição X
    const y = canvas.height - hornet.y - hornet.height / 2 - attackRadius; // Calcula a posição Y

    ctx.save(); 
    ctx.drawImage(attackAreaImage, x, y, attackRadius * 2, attackRadius * 2); // Desenha a imagem
    ctx.restore();
}

//PLATAFORMAS PISAVEIS
const platformImage = new Image();
platformImage.src = 'sprites/plataforma.png';

// Cria plataformas
function createPlatforms() {
    platforms.push({ x: 150, y: 100, width: 200, height: 10, img: platformImage });
    platforms.push({ x: 350, y: 200, width: 150, height: 10, img: platformImage });
    platforms.push({ x: 50, y: 300, width: 200, height: 10, img: platformImage });
    platforms.push({ x: 0, y: 10, width: 900, height: 10, img: platformImage });
    platforms.push({ x: 1000, y: 10, width: 500, height: 10, img: platformImage });
    platforms.push({ x: 800, y: 400, width: 150, height: 10, img: platformImage });
    platforms.push({ x: 625, y: 300, width: 100, height: 10, img: platformImage });
    platforms.push({ x: 1000, y: 150, width: 100, height: 10, img: platformImage });
    platforms.push({ x: 750, y: 100, width: 100, height: 10, img: platformImage });
    platforms.push({ x: 800, y: 250, width: 100, height: 10, img: platformImage });
}

function drawPlatforms() {
    platforms.forEach(platform => {
        ctx.drawImage(
            platform.img,
            platform.x,
            canvas.height - platform.y, // Ajuste para a posição correta
            platform.width, // Largura da plataforma
            platform.height // Altura da plataforma
        );
    });
}

//VILOES
function createVillain() {
    // Define as propriedades do novo vilão
    const  whichVillain = Math.floor(Math.random() * 2) + 1;

    const newVillain = {
        x: Math.random() * canvas.width, // Posição aleatória
        y: Math.random() * (canvas.height - 100), // Posição aleatória
        width: 50,
        height: 65,
        speed: Math.random() * 2 + 1, // Velocidade aleatória
        health: whichVillain*100,
        img: new Image(),
        facingRight: true // Propriedade para direção
    };
    
    // Carrega a imagem do vilão (substitua pelo caminho correto)
    newVillain.img.src = 'sprites/enemie' + (whichVillain) + '.png'; // Exemplo com duas imagens

    villains.push(newVillain); // Adiciona o novo vilão à lista
}

// Função para adicionar vilões progressivamente
function spawnVillains() {
    let spawnInterval = setInterval(() => {
        if (!isGameOver) {
            createVillain(); // Cria um novo vilão
            console.log("Novo vilão apareceu! Total de vilões: " + villains.length);
        } else {
            clearInterval(spawnInterval); // Para de gerar vilões se o jogo terminar
        }
    }, 5000); // Tempo em milissegundos entre cada vilão (5 segundos neste caso)
}

//move os viloes
function moveVillains() {
    villains.forEach(villain => {

        // Mover para cima e para baixo
        villain.y += Math.sin(Date.now() / 1000) * villain.speed; // Movimento sinusoidal

        // Limitar a altura para que não saia da tela
        if (villain.y < 0) villain.y = 0;
        if (villain.y > canvas.height - villain.height) villain.y = canvas.height - villain.height;
    
        // Exemplo de movimento simples para esquerda e direita
        if (villain.x < canvas.width - villain.width && villain.facingRight) {
            villain.x += villain.speed;
        } else {
            villain.facingRight = false;
            villain.x -= villain.speed;
        }

        // Inverte a direção quando chega nas bordas
        if (villain.x <= 0) {
            villain.facingRight = true; // Vira para a direita
        }
        
    });
}

// Desenha os vilões
function drawVillains() {
    villains.forEach(villain => {
        ctx.save(); // Salva o estado do contexto
        ctx.translate(villain.x + villain.width / 2, canvas.height - villain.y - villain.height / 2); // Move o contexto para o vilão

        if (villain.facingRight) {
            ctx.scale(-1, 1); // Inverte horizontalmente
        }

        ctx.drawImage(villain.img, -villain.width / 2, -villain.height / 2, villain.width, villain.height);
        ctx.restore(); // Restaura o estado anterior do contexto

        // Desenhar vida
        ctx.fillStyle = 'green';
        ctx.fillRect(villain.x, canvas.height - villain.y - villain.height - 10, villain.width * (villain.health / 100), 5);
    });
}

//COLISAO DE OBJETOS
function colidiu(obj1, obj2) {
    return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
    );
}

//colisao personagem - vilao
function checkVillainCollision() {
    villains.forEach(villain => {
        if (colidiu(hornet, villain)) {
            if (!hornet.isInCollision && hornet.canTakeDamage) { // Só toma dano se não estiver em colisão
                hornet.takeDamage(); // Dano ao jogador
                

                // Reabilita a possibilidade de receber dano após 2 segundos
                setTimeout(() => {
                    this.canTakeDamage = true;
                }, 5000);
            }
            hornet.isInCollision = true; // Marca como em colisão
            
        }
        else {
            hornet.isInCollision = false; // Reseta quando não está mais em colisão
        }
    });
}

//colisao perosnagem - plataforma
function checkPlatformCollision(){
    onPlatform = false; // Reseta o estado de estar na plataforma
    platforms.forEach(platform => {
        if (colidiu(hornet, platform)) {
            onPlatform = true;
            vertPosition = platform.y + platform.height - 10; // Coloca o personagem em cima da plataforma
            vertVelocity = 0; // Reseta a velocidade ao pousar
            isJumping = false; // Permite novo pulo
        }
    });
}


//FUNÇÃO QUE ATUALIZA O JOGO
function update() {
    if (isGameOver) return;

    if(!isAreaAtack){
        // Atualiza a posição horizontal
        horiPosition += horiVelocity;
        hornet.x = horiPosition; // Atualiza a posição do personagem

        // Aplica a gravidade
        vertVelocity -= gravity; // Acelera para baixo
        vertPosition += vertVelocity; // Atualiza a posição vertical
        hornet.y = vertPosition; // Atualiza a posição vertical do personagem

        checkVillainCollision();
        checkPlatformCollision();
        //villainAttack(); // Verifica ataques

        // Se não estiver em uma plataforma, continua a aplicar a gravidade
        if (!onPlatform) {
            hornet.y = vertPosition; // Atualiza a posição vertical do personagem
            isJumping = true;
        }
    }

    villains = villains.filter(villain => villain.health > 0);

    // Verifica se o jogador caiu abaixo do chão
    if (vertPosition < -50) {
        isGameOver = true; // O jogo termina
        showEnd();
    }

    moveVillains(); // Atualiza vilões
    render(); // Atualiza a tela
}


// Função para reiniciar o jogo
function resetGame() {
    vertPosition = 30; // Ajuste a posição vertical inicial
    horiPosition = 50; // Posição horizontal do jogador

    onPlatform = false;
    isJumping = false;
    isAreaAtack = false;

    vertVelocity = 0; // Velocidade vertical do jogador
    horiVelocity = 0; // Velocidade horizontal do jogador
    persoHealth = 5;
    hornet.health = persoHealth;

    villains = []; // Armazena viloes

    enemiesDefeated = 0; // Variável para contar os inimigos derrotados
    isGameOver = false;
}

// Renderiza o jogo
function render() {
    if(gameState === 'game'){
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa a tela
        drawPlatforms(); // Desenha as plataformas
        drawPlayerHealth(); // Desenha a vida da Hornet
        drawPlayer(); // Desenha o jogador
    
        if (isAreaAtack) {
            drawAttackArea(); // Desenha a área de ataque apenas se estiver ativa
        }
    
        drawVillains(); // Desenha os inimigos
        drawEnemiesDefeated(); // Desenha a contagem de inimigos derrotados
    }
    
}

//CONTROLES DO JOGO
// Inicia o pulo e o movimento ao pressionar as teclas
document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowUp') {
        event.preventDefault(); 
        jump();
    } 
    else if (event.code === 'ArrowLeft') {
        move('left');
    } 
    else if (event.code === 'ArrowRight') {
        move('right');
    } 
    else if (event.code === 'ArrowDown') {
        event.preventDefault(); 
    }
    else if (event.code === 'Space') {
        event.preventDefault(); 
        areaAttack();
    }
});

document.addEventListener('keyup', (event) => {
    if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
        horiVelocity = 0; // Para o movimento horizontal
    }
});

function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

showMenu();