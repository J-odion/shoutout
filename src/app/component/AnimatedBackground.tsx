'use client';

import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const hearts: { x: number; y: number; size: number; speed: number }[] = [];

    function createHeart() {
      return {
        x: Math.random() * canvas.width,
        y: -20,
        size: Math.random() * 20 + 10,
        speed: Math.random() * 2 + 1,
      };
    }

    for (let i = 0; i < 50; i++) {
      hearts.push(createHeart());
    }

    function drawHeart(x: number, y: number, size: number) {
      ctx.beginPath();
      ctx.moveTo(x, y + size / 4);
      ctx.quadraticCurveTo(x, y, x + size / 4, y);
      ctx.quadraticCurveTo(x + size / 2, y, x + size / 2, y + size / 4);
      ctx.quadraticCurveTo(x + size / 2, y, x + size * 3 / 4, y);
      ctx.quadraticCurveTo(x + size, y, x + size, y + size / 4);
      ctx.quadraticCurveTo(x + size, y + size / 2, x + size * 3 / 4, y + size * 3 / 4);
      ctx.lineTo(x + size / 2, y + size);
      ctx.lineTo(x + size / 4, y + size * 3 / 4);
      ctx.quadraticCurveTo(x, y + size / 2, x, y + size / 4);
      ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
      ctx.fill();
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      hearts.forEach((heart, index) => {
        heart.y += heart.speed;
        drawHeart(heart.x, heart.y, heart.size);

        if (heart.y > canvas.height) {
          hearts[index] = createHeart();
        }
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default AnimatedBackground;