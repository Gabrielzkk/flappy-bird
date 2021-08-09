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

    refreshDrop() {
        flappyBird.velocidade += flappyBird.gravidade;
        flappyBird.y += flappyBird.velocidade;
    }

}

function loopDraw() {

    flappyBird.refreshDrop();

    background.draw();
    floor.draw();
    flappyBird.draw();
    requestAnimationFrame(loopDraw);
}

loopDraw();