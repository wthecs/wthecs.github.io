const recipeSteps = document.querySelectorAll('.clickable');
const docColumn = document.getElementById('doc-column');
const recipeColumn = document.getElementById('recipe-column');
const body = document.body;

const docs = {
    "1": `<div id="demo-docs" data-theme="light">

    <h1>Interactive Panel Demo with Sparkles & Clock</h1>
    <p class="lead">Example panels from the site, with code shown below each block.</p>


    <div class="panel-section">
        <h2>Simple Box</h2>
        <div class="example-box">This is a simple box.</div>
        <pre class="cmd">
.example-box {
    padding: 16px;
    background: #f3f6ff;
    border: 1px solid #dbe2ff;
    border-radius: 10px;
    margin: 12px 0;
}
        </pre>
        <p class="explanation">A simple div box with padding, border, rounded corners, and light background.</p>
    </div>


    <div class="panel-section">
        <h2>Glass Effect</h2>
        <div class="example-box glass">Glass style box</div>
        <pre class="cmd">
.glass {
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(12px) saturate(180%);
    -webkit-backdrop-filter: blur(12px) saturate(180%);
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.2);
}
        </pre>
        <p class="explanation">Semi-transparent background with blur effect for modern "glassmorphism" look.</p>
    </div>


    <div class="panel-section">
        <h2>Sparkle Background</h2>
        <div class="sparkle-box">
            <canvas id="sparkle-demo"></canvas>
            <div class="sparkle-content">Content over sparkles</div>
        </div>
        <pre class="cmd">
#sparkle-demo {
    position: absolute;
    top:0; left:0;
    width:100%; height:100%;
    pointer-events:none;
    z-index:1;
}
.sparkle-content {
    position: relative;
    z-index:2;
    padding:20px;
    color:white;
}
        </pre>
        <p class="explanation">Sparkles drawn with canvas behind content, using semi-transparent white lines for star effect.</p>
    </div>


    <div class="panel-section" style="text-align:center;">
        <h2>Backward Clock</h2>
        <div class="clock-box glass">
            <canvas id="backward-clock" width="200" height="200"></canvas>
            <div id="digital-time" style="margin-top:12px; font-family: monospace; font-weight:600; color:#fff;"></div>
        </div>
        <pre class="cmd">

.clock-box {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    display: block; 
    margin: 12px 0;
    position: relative;
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(12px) saturate(180%);
    -webkit-backdrop-filter: blur(12px) saturate(180%);
    border: 1px solid rgba(255,255,255,0.2);
}

.clock-box canvas {
    border-radius: 50%;
    display: block;
}


#digital-time {
    margin-top:12px;
    font-family: monospace;
    font-weight:600;
    color:#fff;
}
        </pre>
        <p class="explanation">Analog backward clock with soft glass effect and digital time display.</p>
    </div>

</div>

<style>
#demo-docs {
    font-family: Inter, sans-serif;
    max-width: 780px;
    margin: auto;
    padding: 20px;
    color: #0b1220;
}

.panel-section {
    margin-bottom: 40px;
}

.example-box {
    padding: 16px;
    background: #f3f6ff;
    border: 1px solid #dbe2ff;
    border-radius: 10px;
    margin: 12px 0;
}

.glass {
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(12px) saturate(180%);
    -webkit-backdrop-filter: blur(12px) saturate(180%);
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.2);
}

pre.cmd {
    background: rgba(11,18,32,0.85);
    color: #fff;
    padding: 12px;
    border-radius: 6px;
    text-align: left;
    overflow-x: auto;
    font-family: monospace;
    margin-top: 10px;
}

.explanation {
    font-size: 14px;
    margin-top: 6px;
    color: #374151;
}


.sparkle-box {
    position: relative;
    height: 150px;
    border-radius: 12px;
    overflow: hidden;
    background: #0b1220;
    margin: 12px 0;
}

.sparkle-content {
    position: relative;
    z-index: 2;
    padding: 20px;
    color: #fff;
    font-weight: 500;
    text-align: center;
}

#sparkle-demo {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    pointer-events: none;
    z-index: 1;
}


.clock-box {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
    margin: 12px auto;
    position: relative;
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(12px) saturate(180%);
    -webkit-backdrop-filter: blur(12px) saturate(180%);
    border: 1px solid rgba(255,255,255,0.2);
}

.clock-box canvas {
    border-radius: 50%;
}

#digital-time {
    margin-top:12px;
    font-family: monospace;
    font-weight:600;
    color:#fff;
}
</style>

<script>
function initSparkles() {
    const canvas = document.getElementById('sparkle-demo');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    function createParticles() {
        particles = [];
        for (let i = 0; i < 80; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 2 + 1,
                dx: (Math.random() - 0.5) * 0.5,
                dy: Math.random() * 0.8 + 0.2,
                alpha: Math.random() * 0.7 + 0.3
            });
        }
    }
    createParticles();

    function drawParticle(p) {
        ctx.fillStyle = "rgba(255,255,255," + p.alpha + ")";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            drawParticle(p);
            p.x += p.dx;
            p.y += p.dy;
            if (p.y > canvas.height) { p.y = 0; p.x = Math.random() * canvas.width; }
            if (p.x > canvas.width) p.x = 0;
            if (p.x < 0) p.x = canvas.width;
        });
        requestAnimationFrame(animate);
    }
    animate();
}

function initBackwardClock() {
    const clockCanvas = document.getElementById('backward-clock');
    const digitalTime = document.getElementById('digital-time');
    if (!clockCanvas) return;
    const ctx = clockCanvas.getContext('2d');
    const radius = clockCanvas.width / 2;
    ctx.translate(radius, radius);

    function drawClock() {
        const now = new Date();
        let hr = now.getHours() % 12;
        let min = now.getMinutes();
        let sec = now.getSeconds();

        ctx.clearRect(-radius, -radius, clockCanvas.width, clockCanvas.height);

       
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.beginPath();
        ctx.arc(0, 0, radius - 2, 0, Math.PI * 2);
        ctx.fill();

        
        ctx.save();
        ctx.rotate(-((hr + min/60) * Math.PI / 6));
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(0,-radius*0.5);
        ctx.stroke();
        ctx.restore();

        
        ctx.save();
        ctx.rotate(-((min + sec/60) * Math.PI / 30));
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(0,-radius*0.75);
        ctx.stroke();
        ctx.restore();

        
        ctx.save();
        ctx.rotate(-(sec * Math.PI / 30));
        ctx.strokeStyle = '#ff4b4b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(0,-radius*0.85);
        ctx.stroke();
        ctx.restore();

        
        if(digitalTime) digitalTime.textContent = now.toLocaleTimeString();

        requestAnimationFrame(drawClock);
    }
    drawClock();
}


initSparkles();
initBackwardClock();
</script>

`

};


function closeDocColumn() {
    docColumn.classList.remove('active');
    body.classList.remove('overlay-active');
    docColumn.dataset.current = "";
    recipeColumn.style.transform = `translateY(${window.scrollY * 0.15}px)`;
}


recipeSteps.forEach(step => {
    step.addEventListener('click', () => {
        const stepId = step.dataset.step;
        if (docColumn.classList.contains('active') && docColumn.dataset.current === stepId) {
            closeDocColumn();
        } else {
            docColumn.innerHTML = docs[stepId] || "<p>Did u understand, what u find rn? -1,0,1</p>";
            docColumn.classList.add('active');
            body.classList.add('overlay-active');
            docColumn.dataset.current = stepId;
            recipeColumn.style.transform = `translateY(${window.scrollY * 0.15}px)`;


            initDynamicBlocks(stepId);
        }
    });
});


document.addEventListener('keydown', e => {
    if (e.key === "Escape" && docColumn.classList.contains('active')) {
        closeDocColumn();
    }
});


window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    recipeColumn.style.transform = `translateY(${scrollY * 0.15}px)`;
});


function initDynamicBlocks(stepId) {
    if (stepId === "1") {
        initSparkles();
        initBackwardClock();
    }
}


function initSparkles() {
    const canvas = document.getElementById('sparkle-demo');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    function createParticles() {
        particles = [];
        for (let i = 0; i < 80; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 2 + 1,
                dx: (Math.random() - 0.5) * 0.5,
                dy: Math.random() * 0.8 + 0.2,
                alpha: Math.random() * 0.7 + 0.3
            });
        }
    }
    createParticles();

    function drawParticle(p) {
        ctx.fillStyle = "rgba(255,255,255," + p.alpha + ")";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            drawParticle(p);
            p.x += p.dx;
            p.y += p.dy;
            if (p.y > canvas.height) { p.y = 0; p.x = Math.random() * canvas.width; }
            if (p.x > canvas.width) p.x = 0;
            if (p.x < 0) p.x = canvas.width;
        });
        requestAnimationFrame(animate);
    }
    animate();
}


function initBackwardClock() {
    const clockCanvas = document.getElementById('backward-clock');
    const digitalTime = document.getElementById('digital-time');
    if (!clockCanvas) return;
    const clockCtx = clockCanvas.getContext('2d');
    const radius = clockCanvas.width / 2;
    clockCtx.translate(radius, radius);

    function drawClock() {
        const now = new Date();
        let hr = now.getHours() % 12;
        let min = now.getMinutes();
        let sec = now.getSeconds();

        clockCtx.clearRect(-radius, -radius, clockCanvas.width, clockCanvas.height);


        clockCtx.fillStyle = 'rgba(255,255,255,0.05)';
        clockCtx.beginPath();
        clockCtx.arc(0, 0, radius - 2, 0, Math.PI * 2);
        clockCtx.fill();


        clockCtx.save();
        clockCtx.rotate(-((hr + min / 60) * Math.PI / 6));
        clockCtx.strokeStyle = '#fff';
        clockCtx.lineWidth = 4;
        clockCtx.beginPath();
        clockCtx.moveTo(0, 0);
        clockCtx.lineTo(0, -radius * 0.5);
        clockCtx.stroke();
        clockCtx.restore();


        clockCtx.save();
        clockCtx.rotate(-((min + sec / 60) * Math.PI / 30));
        clockCtx.strokeStyle = '#fff';
        clockCtx.lineWidth = 3;
        clockCtx.beginPath();
        clockCtx.moveTo(0, 0);
        clockCtx.lineTo(0, -radius * 0.75);
        clockCtx.stroke();
        clockCtx.restore();


        clockCtx.save();
        clockCtx.rotate(-(sec * Math.PI / 30));
        clockCtx.strokeStyle = '#ff4b4b';
        clockCtx.lineWidth = 2;
        clockCtx.beginPath();
        clockCtx.moveTo(0, 0);
        clockCtx.lineTo(0, -radius * 0.85);
        clockCtx.stroke();
        clockCtx.restore();


        if (digitalTime) {
            digitalTime.textContent = now.toLocaleTimeString();
        }

        requestAnimationFrame(drawClock);
    }

    drawClock();
}
