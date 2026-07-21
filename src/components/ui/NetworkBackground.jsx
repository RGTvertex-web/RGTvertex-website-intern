import { useEffect, useRef } from "react";

export default function NetworkBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let traces = [];
    let width = 0;
    let height = 0;
    let isInactive = false;
    
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    class Trace {
      constructor(w, h) {
        this.w = w;
        this.h = h;
        this.reset(true);
      }

      reset(randomizeLife = false) {
        this.x = Math.random() * this.w;
        this.y = Math.random() * this.h;
        this.history = [{ x: this.x, y: this.y }];
        this.maxLength = Math.floor(Math.random() * 30) + 15;
        this.angle = Math.floor(Math.random() * 8) * (Math.PI / 4);
        this.speed = Math.random() * 1.5 + 0.8;
        this.life = randomizeLife ? Math.floor(Math.random() * 100) : 0;
        this.maxLife = Math.random() * 300 + 150;
        this.opacity = Math.random() * 0.2 + 0.15; // 0.15 - 0.35
        this.timeSinceTurn = 0;
      }

      update() {
        this.life++;
        this.timeSinceTurn++;
        
        if (this.life > this.maxLife) {
          this.reset();
          return;
        }

        // Only allow 45 or 90 deg turns, and only after moving a bit
        if (this.timeSinceTurn > 20 && Math.random() < 0.02) {
          const turns = [-Math.PI / 2, -Math.PI / 4, Math.PI / 4, Math.PI / 2];
          this.angle += turns[Math.floor(Math.random() * turns.length)];
          this.timeSinceTurn = 0;
        }

        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        this.history.push({ x: this.x, y: this.y });
        if (this.history.length > this.maxLength) {
          this.history.shift();
        }
      }

      draw(ctx) {
        if (this.history.length < 2) return;
        
        let alpha = this.opacity;
        if (this.life < 30) alpha *= (this.life / 30);
        if (this.life > this.maxLife - 30) alpha *= ((this.maxLife - this.life) / 30);

        ctx.beginPath();
        ctx.moveTo(this.history[0].x, this.history[0].y);
        for (let i = 1; i < this.history.length; i++) {
          ctx.lineTo(this.history[i].x, this.history[i].y);
        }
        
        ctx.strokeStyle = `rgba(17, 17, 17, ${alpha})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        const head = this.history[this.history.length - 1];
        ctx.beginPath();
        ctx.arc(head.x, head.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(17, 17, 17, ${alpha * 1.5})`;
        ctx.fill();
      }
    }

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      initTraces();
    };

    const initTraces = () => {
      traces = [];
      const numTraces = Math.min(Math.floor((width * height) / 12000), 80);
      for (let i = 0; i < numTraces; i++) {
        const t = new Trace(width, height);
        if (isReducedMotion) {
          // Fast-forward so they have lines drawn on first frame
          for (let k = 0; k < 25; k++) t.update();
        }
        traces.push(t);
      }
    };

    const draw = () => {
      if (isInactive && !isReducedMotion) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      
      ctx.clearRect(0, 0, width, height);
      
      if (!isReducedMotion) {
        traces.forEach(t => {
          t.update();
          t.draw(ctx);
        });
      } else {
        traces.forEach(t => t.draw(ctx));
      }
      
      if (!isReducedMotion) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    const handleVisibilityChange = () => {
      isInactive = document.hidden;
    };

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none opacity-[0.85] transition-opacity duration-1000"
    />
  );
}
