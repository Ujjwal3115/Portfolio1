window.addEventListener('load', () => {
    const canvas = document.getElementById('aurora-canvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let time = 0;

    function createAuroraGradient(x, y, time) {
        const gradient = ctx.createLinearGradient(x, 0, x, canvas.height);
        const alpha = 0.3 + Math.sin(time * 0.001) * 0.1;
        gradient.addColorStop(0, `rgba(0, 216, 255, 0)`);
        gradient.addColorStop(0.3, `rgba(0, 216, 255, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(0, 255, 153, ${alpha * 0.8})`);
        gradient.addColorStop(0.7, `rgba(0, 216, 255, ${alpha * 0.4})`);
        gradient.addColorStop(1, `rgba(0, 216, 255, 0)`);
        return gradient;
    }

    function drawAurora(time) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'screen';

        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.moveTo(0, canvas.height);

            for (let x = 0; x <= canvas.width; x += 5) {
                const wave1 = Math.sin(x * 0.003 + time * 0.001 + i) * 200;
                const wave2 = Math.sin(x * 0.005 - time * 0.002 + i) * 150;
                const y = canvas.height - 300 + wave1 + wave2;
                
                ctx.lineTo(x, y);
            }

            ctx.lineTo(canvas.width, canvas.height);
            ctx.closePath();

            const gradient = createAuroraGradient(0, 0, time + i * 1000);
            ctx.fillStyle = gradient;
            ctx.fill();
        }
    }

    function animate(timestamp) {
        time = timestamp;
        drawAurora(time);
        requestAnimationFrame(animate);
    }

    animate(0);
});