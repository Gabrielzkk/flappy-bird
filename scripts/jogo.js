console.log("FLAPPY BIRD");

const canvas = document.getElementsById("canvas");
const ctx = canvas.getContext("2d");

const sprites = new Image();
sprites.src = "./assets/img/sprites.png";



    function loop() {
        ctx.drawImage(
            sprites,
            0, 0,
            34, 24,
            0, 0,
            34, 24,
            );
    }

    requestAnimationFrame(loop);