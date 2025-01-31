// SOM DO JOGO
const button = document.getElementById('musicButton'); // Botão para deixar com ou sem som
const icon = document.getElementById('buttonIcon');
const music = document.getElementById('background-music');
let isPlaying = false;

//Sons de movimentação
const jumpSound = new Audio('music/hornet_small_jump.wav');
const dashSound = new Audio('music/hornet_dash.wav');
const attackYellSound = new Audio('music/Hornet_Fight_Yell_06.wav');
const attackSound = new Audio('music/hornet_needle_thow.wav');
const stunSound = new Audio('music/Hornet_Fight_Stun_03.wav');
const deathSound = new Audio('music/Hornet_Fight_Death_01.wav');
const enemieDamageSound = new Audio('music/enemy_damage.wav');
const enemieDamageTimeSound = new Audio('music/enemy_damage_over_time.wav');
const enemie1Sound = new Audio('music/fly_flying.wav');
const enemie2Sound = new Audio('music/spitter_fly_loop.wav');

// Alternar play/pause com o botão
// Controla o volume dos sons do jogo (sem som/com som)
button.addEventListener('click', () => {
    if (isPlaying) {
        music.pause();
        volume = 0;
        icon.src = 'imagens/soundOff.png';
    } 
    else {
        music.play();
        volume = 1;
        icon.src = 'imagens/soundOn.png'; 
    }
    
    jumpSound.volume = volume;
    dashSound.volume = volume;
    attackYellSound.volume = volume;
    attackSound.volume = volume;
    stunSound.volume = volume;
    deathSound.volume = volume;
    enemieDamageSound.volume = volume;
    enemieDamageTimeSound.volume = volume;
    enemie1Sound.volume = volume;
    enemie2Sound.volume = volume;

    isPlaying = !isPlaying; // Alterna o estado
});

//INICIA CANVAS E VARIAVEIS
//Prepara o canvas para receber os elementos
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Inicializa as variaveis
let vertPosition = 30; // Posição vertical do jogador
let horiPosition = 50; // Posição horizontal do jogador

let gravity = 1; // Aceleração da gravidade
let jumpStrength = 15; // Força do pulo
let vertVelocity = 0; // Velocidade vertical do jogador
let horiVelocity = 0; // Velocidade horizontal do jogador
let persoHealth = 5; // Vida inicial do jogador
const attackRadius = 100; // Raio do ataque em area

let platforms = []; // Armazena plataformas
let villains = []; // Armazena viloes

let enemiesDefeated = 0; // Variável para contar os inimigos derrotados
let defeatedRecord = 0; // Armazena record de inimigos derrotados
let isGameOver = false; // Estado do jogo
let gameLoopRunning = false; // Estado do game loop

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

    // Se o loop ja iniciou, não inicia novamente
    // Evita que o gameloop seja chamado cada vez que da replay no jogo
    if(!gameLoopRunning){
        gameLoopRunning = true;
        gameLoop();
    }
    
}

// FIM DE JOGO
// Função para terminar o jogo
function showEnd() {
    villains.forEach(villain =>{
        // Para o som dos vilões
        villain.sound.pause();
    })

    // Atualiza o texto do final
    document.getElementById('pontos').innerHTML = `Você derrotou ${enemiesDefeated} inimigos!`;
    document.getElementById('record').innerHTML = `Seu record de inimigos derrotados é ${defeatedRecord}!`;

    gameState = 'end';
    menuStart.style.display = 'none';
    menuFim.style.display = 'block';
    canvas.style.display = 'none';
}

// Botões das telas de menu inicial e final
document.getElementById('buttonPlay').addEventListener('click', startGame);
document.getElementById('buttonRestart').addEventListener('click', startGame);
document.getElementById('buttonMenu').addEventListener('click', showMenu);


//PERSONAGEM JOGAVEL
// Sprite do personagem
const playerImage = new Image();
playerImage.src = 'sprites/hornet_stop.png';
// Sprite do personagem no dash
const dashImage = new Image();
dashImage.src = 'sprites/hornet_dash.png';  

// Personagem
let hornet = {
    x: horiPosition, // Posição horizontal
    y: vertPosition, // Posição vertical
    width: 60, // Largura
    height: 80, // Altura
    health: persoHealth, // Vida
    img: playerImage, // Coloca a imagem
    facingRight: true, // Perosnagem jogavel está olhando para a direita?
    isInCollision: false, // Perosnagem jogavel esta colidindo com inimigo?
    canTakeDamage: true, // Personagem jogavel pode tomar dano?
    onPlatform: false, // Personagem jogavel esta na plataforma?
    isJumping: false, // Personagem jogavel esta pulando?
    isAreaAttack: false, // Personagem jogavel esta dando ataque em area?
    isDashing: false, // Personagem jogavel esta dando dash?

    // Função para o personagem tomar dano
    takeDamage: function(){
        this.canTakeDamage = false;
        if (persoHealth > 0) {
            persoHealth -= 1; // Reduz a saúde em 1 ponto
            this.health = persoHealth;

            stunSound.play();

            // Personagem morre
            if (persoHealth === 0) {
                deathSound.play();
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

// Hitbox da personagem para colisão com as plataformas
// Serve para ela não se teleportar quando a cabeça bate na plataforma
// Ela so sobe na plataforma quando os pés batem na plataforma
let hornetPlatformHitbox = {
    x: horiPosition,
    y: vertPosition,
    width: 60,            
    height: 20            
};

// Função para criar e desenhar o personagem
function drawPlayer() {
    ctx.save(); // Salva o estado atual do contexto

    // Variaveis para saber qual que é a imagem a ser usada (dash ou normal)
    const currentImage = hornet.isDashing ? dashImage : hornet.img;
    const currentHeight = hornet.isDashing ? 60 : hornet.height;
    const currentWidth = hornet.isDashing ? 140 : hornet.width;

    // Inverte a imagem se o personagem estiver se movendo para a esquerda
    if (hornet.facingRight) {
        ctx.scale(-1, 1); // Inverte a imagem horizontalmente
        ctx.drawImage(
            currentImage,
            -hornet.x - hornet.width, // Ajusta a posição x ao inverter
            canvas.height - hornet.y - hornet.height, // Corrigido para posição correta
            currentWidth,
            currentHeight
        );
    } else {
        ctx.drawImage(
            currentImage,
            hornet.x,
            canvas.height - hornet.y - hornet.height, // Corrigido para posição correta
            currentWidth,
            currentHeight
        );
    }

    ctx.restore(); // Restaura o estado anterior do contexto
}

// Vida do player
const lifeImage = new Image();
lifeImage.src = 'sprites/hp.png';

function drawPlayerHealth() {
    for (let i = 0; i < hornet.health; i++) {
        ctx.drawImage(
            lifeImage,
            100 + i * (25 + 5), // Posição horizontal
            30, // Posição vertical
            25, // Largura
            30 // Altura
        );
    }
}

// Função de pulo
function jump() {
    // Se personagem estiver pulando ou dando dash não pode pular
    if (hornet.isJumping || hornet.isDashing) return;

    hornet.isJumping = true;
    hornet.onPlatform = false;
    vertVelocity = jumpStrength;
    
    jumpSound.play();
}

// Função para mover o jogador
function move(direction) {
    if (direction === 'left' && hornet.x > 0) {
        horiVelocity = -5; // Move para a esquerda
        hornet.facingRight = false; // Atualiza a direção
    } 
    
    else if (direction === 'right' && hornet.x < canvas.width - hornet.width) {
        horiVelocity = 5; // Move para a direita
        hornet.facingRight = true; // Atualiza a direção
    }
}

// Função para dash (ataque rápido para frente)
// Não toma dano enquanto no dash
function dash(){
    hornet.isDashing = true;
    hornet.canTakeDamage = false;

    dashSound.play();

    // Faz ela se mover mais rápido na direção correta
    if(hornet.facingRight === true){
        horiVelocity = 10;
    }
    else{
        horiVelocity = -10;
    }

    // Verifica se teve colisão com vilão para dar dano neles
    checkVillainCollision();
    
    // Restaura a velocidade após o tempo de duração do dash
    setTimeout(() => {
        horiVelocity = 0; // Restaura a velocidade original
        hornet.isDashing = false; // Desativa o dash
        hornet.canTakeDamage = true;
        dashSound.pause();
        dashSound.currentTime = 0;
    }, 350);


}

// Ataque em área
function areaAttack() {
    // Impede vários ataques simultâneos
    if(hornet.isAreaAttack) return;
    hornet.isAreaAttack = true;

    attackYellSound.play();
    attackSound.play();

    // Dano contínuo para os inimigos a cada intervalo
    const damageInterval = setInterval(() => {
        villains.forEach(villain => {
            const distance = Math.sqrt(
                (hornet.x - villain.x) ** 2 +
                (hornet.y - villain.y) ** 2
            );

            // Verifica se o vilão está dentro do raio de ataque
            if (distance <= attackRadius) {
                villain.health -= 40; // Dano ao vilão
                enemieDamageTimeSound.play();

                // Remove o vilão se a saúde chegar a zero
                checkEnemieDeath(villain);
            }
        });
    }, 500); // Dano a cada 500 ms enquanto a área de ataque está ativa

    // Para o dano após 1,5 segundos
    setTimeout(() => {
        clearInterval(damageInterval);
        hornet.isAreaAttack = false;
    }, 1500);
}

// Sprites para o ataque em area
const attackAreaImage = new Image();
attackAreaImage.src = 'sprites/hornet_areaAttack_sprites.png';

// Variáveis de controle de animação
let attackFrame = 0; // Frame atual
let totalAttackFrames = 9; // Total de frames no sprite sheet
let attackFrameWidth = 427; // Largura de cada frame individual
let attackFrameHeight = 446; // Largura de cada frame individual


// Função para desenhar o ataque
function drawAttackArea() {
    // Reseta a animação para o frame inicial para o próximo ataque
    if(!hornet.isAreaAttack){
        attackFrame = 0;
    }

    // Calcula a posição para o quadro atual do sprite sheet
    let posx = attackFrame * attackFrameWidth+2;
    let posy = 2

    //posição para desenhar em relação ao personagem
    let x = hornet.x + hornet.width / 2 - attackRadius; // Calcula a posição X
    let y = canvas.height - hornet.y - hornet.height / 2 - attackRadius; // Calcula a posição Y

    ctx.save();
    ctx.drawImage(
        attackAreaImage,   // Imagem do sprite sheet
        posx, posy,        // Posição de corte no sprite sheet
        attackFrameWidth-7, attackFrameHeight-4, // Tamanho do quadro individual
        x, y,              // Posição de desenho no canvas
        attackRadius * 2, attackRadius * 2 // Tamanho do quadro no canvas
    );
    ctx.restore();

    // Avança para o próximo quadro em um loop
    attackFrame++;
    if (attackFrame >= totalAttackFrames) {
        attackFrame = 0; // Reinicia os frames
    }
}

// Imagem do contador de inimigos derrotados
const counterBackground = new Image();
counterBackground.src = 'imagens/recepAlma.png';

// Função que escreve na tela a quantidade de inimigos derrotados
function drawEnemiesDefeated() {
    // Desenha o fundo do contador
    ctx.drawImage(counterBackground, 0, 10, 100, 70);
    
    ctx.fillStyle = 'white'; // Cor do texto
    ctx.font = '25px Hollow Knight'; // Estilo da fonte
    ctx.fillText(`${enemiesDefeated}`, 30, 60);
}

//PLATAFORMAS PISAVEIS
// Imagem das plataformas
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

// Desenha as plataformas na tela do canvas
function drawPlatforms() {
    platforms.forEach(platform => {
        ctx.drawImage(
            platform.img,
            platform.x, // Pos em x
            canvas.height - platform.y, // Pos em y
            platform.width, // Largura da plataforma
            platform.height // Altura da plataforma
        );
    });
}

//VILOES
// Função para criar vilões aleatoriamente entre 2 tipos
function createVillain() {
    // Define se é o vilao 1 ou 2
    const  whichVillain = Math.floor(Math.random() * 2) + 1;
    // Variaveis para a posição do inimigo
    let villainX, villainY;

    do {
        // Gera uma posição aleatória para o vilão
        villainX = Math.random() * canvas.width;
        villainY = Math.random() * (canvas.height - 100);
    } while (Math.abs(villainX - hornet.x) < 60 && Math.abs(villainY - hornet.y) < 80); 
    // Recalcula a posição enquanto estiver a 50px da personagem jogavel
    // Garante que os inimigos nao vao surgir em cima dela


    // Cria a variavel do vilao com suas caracteristicas em uma pos aleatoria
    const newVillain = {
        x: villainX,
        y: villainY,
        width: 50,
        height: 65,
        speed: Math.random() * 2 + 1, // Velocidade aleatória
        maxHealth: whichVillain*100, // Vilao do tipo 2 tem mais vida que tipo 1
        health: whichVillain*100, // Essa é a vida que vai variar
        img: new Image(),
        sound: whichVillain == 1 ? enemie1Sound : enemie2Sound, // Cada vilao tem um tipo de barulho
        facingRight: true
    };
    
    // Carrega a imagem do vilão certo
    newVillain.img.src = 'sprites/enemie' + (whichVillain) + '.png';

    // Inicia o som do vilão
    newVillain.sound.loop = true;
    newVillain.sound.play();

    villains.push(newVillain); // Adiciona o novo vilão à lista
}

// Função para adicionar vilões progressivamente
function spawnVillains() {
    let spawnInterval = setInterval(() => {
        if (!isGameOver) {
            createVillain(); // Cria um novo vilão
        } else {
            clearInterval(spawnInterval); // Para de gerar vilões se o jogo terminar
        }
    }, 5000); // Tempo em milissegundos entre cada vilão
}

//move os viloes
function moveVillains() {
    villains.forEach(villain => {
        // Mover para cima e para baixo
        // Para a função senoidal ficar suave, usa-se a progressao da data atual
        villain.y += Math.sin(Date.now() / 1000) * villain.speed

        // Limita a altura para que não saia da tela
        if (villain.y < 0){
            villain.y = 0;
        }
        if (villain.y > canvas.height - villain.height){
            villain.y = canvas.height - villain.height;
        } 
    
        // Movimentação lateral
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

        // Para desenhar a barra de vida dos viloes com tamanho fixo
        const healthBarWidth = villain.width; // Largura fixa
        const healthBarHeight = 5;  // Altura da barra
    
        // Ela vai diminuindo conforme vilao toma dano
        const healthPercentage = villain.health / villain.maxHealth;
        const currentHealthBarWidth = healthBarWidth * healthPercentage;
    
        ctx.fillStyle = 'green';
        ctx.fillRect(villain.x, canvas.height - villain.y - villain.height - 10, currentHealthBarWidth, healthBarHeight);
    
    });
}

// Verifica se o inimigo morreu
function checkEnemieDeath(villain){
    // Remove o vilão se a saúde chegar a zero
    if (villain.health <= 0) {
        enemiesDefeated++;
        
        // Ganha uma vida a cada 5 inimigos derrotados
        // O max de vida possivel de ter durante o jogo é 10
        if(enemiesDefeated % 5 === 0 && hornet.health < 10){
            hornet.health++;
        }

        // Para o som do vilão
        villain.sound.pause();

        // Atualiza o record de inimigos derrotados
        if(enemiesDefeated > defeatedRecord){
            defeatedRecord = enemiesDefeated;
        }
        
        // Remove o inimigo morto da lista de inimigos
        villains = villains.filter(v => v !== villain);
    }
}

//COLISAO DE OBJETOS
// Função generica de virificar colisao entre 2 objetos
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
                    hornet.canTakeDamage = true;
                }, 5000);
            }

            hornet.isInCollision = true; // Marca como em colisão

            // Quando ela da dash ela não toma dano, mas da dano ao inimigo
            if(hornet.isDashing){
                villain.health -= 66; // Dano ao vilão
                enemieDamageSound.play();
                checkEnemieDeath(villain);
            }
        }
        else {
            hornet.isInCollision = false; // Reseta quando não está mais em colisão
        }
    });
}

//colisao perosnagem - plataforma
// Serve para o personagem ficar acima da plataforma, ou seja, ser capaz de pisar
function checkPlatformCollision(){
    hornet.onPlatform = false; // Reseta o estado de estar na plataforma
    platforms.forEach(platform => {
        if (colidiu(hornetPlatformHitbox, platform)){
            hornet.onPlatform = true;
            vertPosition = platform.y + platform.height - 10; // Coloca o personagem em cima da plataforma
            vertVelocity = 0; // Reseta a velocidade ao pousar
            hornet.isJumping = false; // Permite novo pulo
        }
    });
}


//FUNÇÃO QUE ATUALIZA O JOGO
// É a função que chama as outras, faz as verificações, é a principal
function update() {
    // Se o jogo acaba, para
    if (isGameOver) return;

    // Durante o ataque em area, ela nao pode se mover
    if(!hornet.isAreaAttack){
        // Atualiza a posição horizontal
        horiPosition += horiVelocity;
        hornet.x = horiPosition; // Atualiza a posição do personagem
        hornetPlatformHitbox.x = horiPosition; // Atualiza a posição da hitbox junto

        // Durante o dash ela não sofre açao da gravidade e nem pode pular
        if(!hornet.isDashing){
            // Aplica a gravidade
            vertVelocity -= gravity; // Acelera para baixo
            vertPosition += vertVelocity; // Atualiza a posição vertical
            hornet.y = vertPosition; // Atualiza a posição vertical do personagem
            hornetPlatformHitbox.y = vertPosition; // Atualiza a posição da hitbox junto

            // Ve se esta em cima de plataforma ou se colidiu com vilao
            checkVillainCollision();
            checkPlatformCollision();

            // Se não estiver em uma plataforma, continua a aplicar a gravidade
            // Serve para ela cair
            if (!hornet.onPlatform) {
                hornet.y = vertPosition; // Atualiza a posição vertical do personagem
                hornetPlatformHitbox.y = vertPosition; // Atualiza a posição da hitbox junto
                hornet.isJumping = true;
            }
        }
    }

    
    villains = villains.filter(villain => villain.health > 0);

    // Verifica se o jogador caiu abaixo do chão
    if (hornet.y < 0) {
        deathSound.play();
        isGameOver = true; // O jogo termina
        showEnd();
    }

    moveVillains(); // Atualiza vilões
    render(); // Atualiza a tela
}


// Função para reiniciar o jogo
function resetGame() {
    vertPosition = 30; // Ajuste a posição vertical inicial
    horiPosition = 50; // Posição horizontal do jogado

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
    
        if (hornet.isAreaAttack) {
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
    else if (event.key === "x" || event.key === "X") {
        event.preventDefault(); 
        dash();
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