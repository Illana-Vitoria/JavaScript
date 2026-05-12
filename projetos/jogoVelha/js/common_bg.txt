window.addEventListener("load", function () {

// fundo animado com partículas neon
(function () {
    const canvas = document.getElementById("bgCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width, height, particles;

    const colors = [
        "rgba(255, 0, 255, 0.8)",   // rosa neon
        "rgba(155, 89, 255, 0.8)",  // roxo neon
        "rgba(0, 234, 255, 0.85)"   // azul neon
    ];

    const numParticles = 180; // quantidade ideal para performance + beleza

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 0.2;
            this.vx = (Math.random() - 0.5) * 0.08;
            this.vy = (Math.random() - 0.5) * 0.08;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.alpha = Math.random() * 0.8 + 0.2;
            this.alphaChange = (Math.random() - 0.5) * 0.02;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.alpha += this.alphaChange;
            if (this.alpha <= 0.1 || this.alpha >= 1) {
                this.alphaChange *= -1;
            }
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        }
    }

    function setup() {
        resize();
        particles = [];
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }
        animate();
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        for (let p of particles) {
            p.update();
            p.draw();
        }
        requestAnimationFrame(animate);
    }

    setup();
})();

document.querySelectorAll(".btn-zoom").forEach(btn => {
    btn.addEventListener("click", function(e){
        const destino = this.getAttribute("href");
        e.preventDefault();
        document.body.classList.add("page-zoom");
        setTimeout(()=> window.location.href = destino, 350);
    });
});

});