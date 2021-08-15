console.log("FLAPPY BIRD");

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const soundHit = new Audio();
soundHit.src = "./assets/sound-effects/efeitos_hit.wav";
soundHit.volume = 0.2;

const sprites = new Image();
sprites.src = "./assets/img/sprites.png";

let frames = 0;

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

// [Canos]
function createPipes() {
    const pipes = {
        
        largura: 52, // Tamanho do Sprite
        altura: 400, // Tamanho do Sprite 
        floor: { 
            spriteX: 0, // SpriteX
            spriteY: 169, // SpriteY
        },
        heaven: { 
            spriteX: 52,
            spriteY: 169,
        },
        space: 80,

        draw() {
            pipes.pairs.forEach((pair) => {

                const yRandom = pair.y;
                const spaceAmongPipes = 160;

                // [Cano do céu]
                const heavenPipeX = pair.x;
                const heavenPipeY = yRandom;
                ctx.drawImage(
                    sprites,
                    pipes.heaven.spriteX, pipes.heaven.spriteY,
                    pipes.largura, pipes.altura,
                    heavenPipeX, heavenPipeY,
                    pipes.largura, pipes.altura,
                    );
    
                // [Cano do chão]
                const floorPipeX = pair.x;
                const floorPipeY = pipes.altura + spaceAmongPipes + yRandom;
                ctx.drawImage(
                    sprites,
                    pipes.floor.spriteX, pipes.floor.spriteY,
                    pipes.largura, pipes.altura,
                    floorPipeX, floorPipeY,
                    pipes.largura, pipes.altura,
                    );

                    pair.heavenPipe = {
                        x: heavenPipeX,
                        y: pipes.altura + heavenPipeY,
                    }
                    pair.floorPipe = {
                        x: floorPipeX,
                        y: floorPipeY,
                    }
            });
        },

        thereIsCollisionToFlappy(pair) {

            const flappyHead = globals.flappyBird.y;
            const flappyFoot = globals.flappyBird.y + globals.flappyBird.altura;

            if ((globals.flappyBird.x + globals.flappyBird.largura) >= pair.x) {
                if (flappyHead <= pair.heavenPipe.y) {
                    return true;
                }

                if (flappyFoot >= pair.floorPipe.y) {
                    return true;
                }
            }
            return false;
        },

        pairs: [],
        refresh() {

            const spent100Frames = frames % 100 === 0;

            if (spent100Frames) {
                pipes.pairs.push({
                    x: canvas.width,
                    y: -150 * (Math.random() + 1),
                });
            }

            pipes.pairs.forEach((pair) => {
                pair.x = pair.x - 2;

                if (pipes.thereIsCollisionToFlappy(pair)) {
                    soundHit.play();
                    screenChange(Telas.INICIO);
                }

                if (pair.x + pipes.largura <= 0) {
                    pipes.pairs.shift();
                }
            });

        },


    };

    return pipes;
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
        jumpValue: 4.4,
        moviment: [
            { spriteX: 0, spriteY: 0 }, // asa para cima
            { spriteX: 0, spriteY: 26 }, // asa no meio
            { spriteX: 0, spriteY: 52 }, // asa para baixo
            { spriteX: 0, spriteY: 26 }, // asa no meio
        ],
        toJump() {
            // Faz o Bird subir
            flappyBird.speed = - flappyBird.jumpValue;
        },
        speed: 0,
        gravity: 0.20,
        currentFrame: 0,
        refreshCurrentFrame() {

            const framesInterval = 10;
            const spentInterval = frames % framesInterval === 0;
            // console.log(spentInterval);

            if (spentInterval) {

                const baseIncrement = 1;
                const increment = baseIncrement + flappyBird.currentFrame;
                const baseRepetition = flappyBird.moviment.length;
                flappyBird.currentFrame = increment % baseRepetition;
            }
            
            // console.log("[Incremento]", increment);
            // console.log("[Base de repetição]", baseRepetition);
            // console.log("[Frame]", increment + baseRepetition);

        },

        draw() {

            flappyBird.refreshCurrentFrame();
            const { spriteX, spriteY, } = flappyBird.moviment[flappyBird.currentFrame];

            ctx.drawImage(
                sprites,
                spriteX, spriteY, // SpriteX e SpriteY
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
            globals.pipes = createPipes();
        },

        draw() {
            background.draw();
            globals.flappyBird.draw();
            messageGetReady.draw();
            globals.floor.draw();
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
            globals.flappyBird.draw();
            globals.pipes.draw();
            globals.floor.draw();
        },

        refresh() {
            globals.pipes.refresh();
            globals.floor.floorMoviments();
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

    frames = frames + 1;
    
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