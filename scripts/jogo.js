console.log("FLAPPY BIRD");

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const soundHit = new Audio();
soundHit.src = "./assets/sound-effects/efeitos_hit.wav";
soundHit.volume = 0.2;

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
function createFloor() {

    const floor = {
        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura: 112,
        x: 0,
        y: canvas.height - 112,
    
        floorMoviments() {
            const floorMoviment = 1;
            const repeatIn = floor.largura / 2;
            const moviment = floor.x - floorMoviment;

            // console.log("[floor]", floor.x);
            // console.log("[repeatIn]", repeatIn);
            // console.log("[moviment]", moviment % repeatIn);
            floor.x = moviment % repeatIn;
        },

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
    return floor;
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

function toCollide(flappyBird, floor) {
    const flappyBirdDiameter = flappyBird.y + flappyBird.altura;
    const floorY = floor.y;

    if (flappyBirdDiameter >= floorY) {
        return true;
    }

    return false;
}

function createFlappyBird() {

    const flappyBird = {
        spriteX: 0, // SpriteX
        spriteY: 0, // SpriteY
        largura: 33, // Tamanho do Sprite
        altura: 24, // Tamanho do Sprite
        x: 10, // Local de desenho no Canvas
        y: 50, // Local de desenho no Canvas
        jumpValue: 4.6,
        toJump() {
            // Faz o Birdd subir
            console.log('pulando');
            flappyBird.speed = - flappyBird.jumpValue;
        },
        speed: 0,
        gravity: 0.20,
    
        draw() {
            ctx.drawImage(
                sprites,
                flappyBird.spriteX, flappyBird.spriteY, // SpriteX e SpriteY
                flappyBird.largura, flappyBird.altura, // Tamanho do recorte na Sprite
                flappyBird.x, flappyBird.y, // Local de desenho no Canvas
                flappyBird.largura, flappyBird.altura, // Tamanho do Sprite
                );
        },
    
        // resetPosition() {
        //     flappyBird.x = 10;
        //     flappyBird.y = 50;
        // },
    
        refresh() {
    
            if (toCollide(flappyBird, globals.floor)) {
                console.log("colidiu");
                soundHit.play();
                // flappyBird.resetPosition();
                
                setTimeout(() => {
                    screenChange(Telas.INICIO);
                    
                }, 500);
    
                return;
            }
    
            flappyBird.speed += flappyBird.gravity;
            flappyBird.y += flappyBird.speed;
        },
    }
    return flappyBird;
}

// 
// [Telas]
// 
const globals = {};

let screenOn = {};

function screenChange(newScreen) {
    screenOn = newScreen;

    if (screenOn.initializes) {
        screenOn.initializes();
    }
}

const Telas = {
    INICIO: {
        initializes() {
            globals.flappyBird = createFlappyBird();
            globals.floor = createFloor();
        },

        draw() {
            background.draw();
            globals.floor.draw();
            globals.flappyBird.draw();
            messageGetReady.draw();
        },

        refresh() {
            globals.floor.floorMoviments();
        },

        click() {
            screenChange(Telas.JOGO);
        }
        
    },

    JOGO: {
        draw() {
            background.draw();
            globals.floor.draw();
            globals.flappyBird.draw();

        },

        refresh() {
            globals.flappyBird.refresh();

        },

        click() {
            globals.flappyBird.toJump();
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
    // screenChange(Telas.JOGO);
});

screenChange(Telas.INICIO);
console.log("JOGO INICIADO!");
loopDraw();