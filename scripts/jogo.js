console.log("FLAPPY BIRD");

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const sprites = new Image();
sprites.src = "./assets/img/sprites.png";

// [Fundo]
const background = {
    spriteX: 390,
    spriteY: 0,
    largura: 276,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    
    draw() {

        ctx.fillStyle = "#70c5ce";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(
            sprites,
            background.spriteX, background.spriteY, // SpriteX e SpriteY
            background.largura, background.altura, // Tamanho do recorte na Sprite
            background.x, background.y, // Local de desenho no Canvas
            background.largura, background.altura, // Tamanho do Sprite
            );

            ctx.drawImage(
                sprites,
                background.spriteX, background.spriteY, // SpriteX e SpriteY
                background.largura, background.altura, // Tamanho do recorte na Sprite
                (background.x + background.largura), background.y, // Local de desenho no Canvas
                background.largura, background.altura, // Tamanho do Sprite
                );
    }
}

// [Chao]
const floor = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,

    draw() {
        ctx.drawImage(
            sprites,
            floor.spriteX, floor.spriteY, // SpriteX e SpriteY
            floor.largura, floor.altura, // Tamanho do recorte na Sprite
            floor.x, floor.y, // Local de desenho no Canvas
            floor.largura, floor.altura, // Tamanho do Sprite
            );

            ctx.drawImage(
                sprites,
                floor.spriteX, floor.spriteY, // SpriteX e SpriteY
                floor.largura, floor.altura, // Tamanho do recorte na Sprite
                (floor.x + floor.largura), floor.y, // Local de desenho no Canvas
                floor.largura, floor.altura, // Tamanho do Sprite
                );
    }
}

const messageGetReady = {
    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,

    draw() {
        ctx.drawImage(
            sprites,
            messageGetReady.spriteX, messageGetReady.spriteY, // SpriteX e SpriteY
            messageGetReady.largura, messageGetReady.altura, // Tamanho do recorte na Sprite
            messageGetReady.x, messageGetReady.y, // Local de desenho no Canvas
            messageGetReady.largura, messageGetReady.altura, // Tamanho do Sprite
            );
    }
}

// [Bird]
const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    velocidade: 0,
    gravidade: 0.20,

    draw() {
        ctx.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY, // SpriteX e SpriteY
            flappyBird.largura, flappyBird.altura, // Tamanho do recorte na Sprite
            flappyBird.x, flappyBird.y, // Local de desenho no Canvas
            flappyBird.largura, flappyBird.altura, // Tamanho do Sprite
            );
    },

    refresh() {
        flappyBird.velocidade += flappyBird.gravidade;
        flappyBird.y += flappyBird.velocidade;
    }

}

// 
// [Telas]
// 

let screenOn = {};

function screenChange(newScreen) {
    screenOn = newScreen;
}

const Telas = {
    INICIO: {
        draw() {
            background.draw();
            messageGetReady.draw();
            floor.draw();
            flappyBird.draw();
        },

        refresh() {

        },

        click() {
            screenChange(Telas.JOGO);
        }
        
    },

    JOGO: {
        draw() {
            background.draw();
            floor.draw();
            flappyBird.draw();

        },

        refresh() {
            flappyBird.refresh();

        }

    }
}

function loopDraw() {

    screenOn.draw();
    screenOn.refresh();
    
    requestAnimationFrame(loopDraw);
}

window.addEventListener("click", () => {
    if (screenOn.click) {
        screenOn.click();
    }
    console.log("JOGO INICIADO!");
    // screenChange(Telas.JOGO);
});

screenChange(Telas.INICIO);
loopDraw();