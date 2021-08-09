console.log("FLAPPY BIRD");

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const sprites = new Image();
sprites.src = "./assets/img/sprites.png";



function loop() {
    ctx.drawImage(
        sprites,
        0, 0, // SpriteY e SpriteY
        33, 24, // Tamanho do recorte na Sprite
        10, 50, // Local de desenho no Canvas
        34, 24, // Tamanho do Sprite
        );
        requestAnimationFrame(loop);
}

loop();