const canvas = document.getElementById('sparkle');
const ctx = canvas.getContext('2d');


const SNOW_CHARS = ["❄", "❅", "✻", "✼", "❇"];

let flakes = [];

const isMobile = window.innerWidth < 768;
const COUNT = isMobile ? 40 : 100;


function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();


function createFlakes() {
    for (let i = 0; i < COUNT; i++) {
        flakes.push({
            char: SNOW_CHARS[Math.floor(Math.random() * SNOW_CHARS.length)],
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 18 + 10,
            dx: (Math.random() - 0.5) * 0.5,
            dy: Math.random() * 1 + 0.8,
            alpha: Math.random() * 0.6 + 0.4,
            rotate: Math.random() * 360,
            rotateSpeed: Math.random() * 0.5 - 0.25
        });
    }
}
createFlakes();


function drawFlake(f) {
    ctx.save();
    ctx.font = `${f.size}px Arial`;
    ctx.fillStyle = `rgba(255,255,255,${f.alpha})`;
    ctx.translate(f.x, f.y);
    ctx.rotate((f.rotate * Math.PI) / 180);
    ctx.fillText(f.char, 0, 0);
    ctx.restore();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    flakes.forEach(f => {
        drawFlake(f);

        f.x += f.dx;
        f.y += f.dy;
        f.rotate += f.rotateSpeed;

        if (f.y > canvas.height + 20) {
            f.y = -20;
            f.x = Math.random() * canvas.width;
        }
        if (f.x < -20) f.x = canvas.width + 20;
        if (f.x > canvas.width + 20) f.x = -20;
    });

    requestAnimationFrame(animate);
}
animate();
