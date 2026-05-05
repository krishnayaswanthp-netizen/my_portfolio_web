class ClickSpark {
  constructor(options = {}) {
    // Default config matching the React Component props
    this.sparkColor = options.sparkColor || '#fff';
    this.sparkSize = options.sparkSize || 10;
    this.sparkRadius = options.sparkRadius || 15;
    this.sparkCount = options.sparkCount || 8;
    this.duration = options.duration || 400;
    this.easing = options.easing || 'ease-out';
    this.extraScale = options.extraScale || 1.0;
    
    this.sparks = [];
    this.startTime = null;
    this.animationId = null;
    
    this.init();
  }

  init() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    
    // Position the canvas to overlay the entire screen
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100vw';
    this.canvas.style.height = '100vh';
    this.canvas.style.pointerEvents = 'none'; // Ensure clicks pass through
    this.canvas.style.zIndex = '9999';
    
    document.body.appendChild(this.canvas);
    
    this.resizeCanvas = this.resizeCanvas.bind(this);
    window.addEventListener('resize', this.resizeCanvas);
    this.resizeCanvas();
    
    this.handleClick = this.handleClick.bind(this);
    document.addEventListener('click', this.handleClick);
    
    this.draw = this.draw.bind(this);
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  easeFunc(t) {
    switch (this.easing) {
      case 'linear':
        return t;
      case 'ease-in':
        return t * t;
      case 'ease-in-out':
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      default: // ease-out
        return t * (2 - t);
    }
  }

  draw(timestamp) {
    if (!this.startTime) {
      this.startTime = timestamp;
    }
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.sparks = this.sparks.filter(spark => {
      const elapsed = timestamp - spark.startTime;
      if (elapsed >= this.duration) {
        return false;
      }
      
      const progress = elapsed / this.duration;
      const eased = this.easeFunc(progress);
      
      const distance = eased * this.sparkRadius * this.extraScale;
      const lineLength = this.sparkSize * (1 - eased);
      
      const x1 = spark.x + distance * Math.cos(spark.angle);
      const y1 = spark.y + distance * Math.sin(spark.angle);
      const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
      const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);
      
      this.ctx.strokeStyle = this.sparkColor;
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
      
      return true;
    });
    
    if (this.sparks.length > 0) {
      this.animationId = requestAnimationFrame(this.draw);
    } else {
      this.startTime = null;
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  handleClick(e) {
    const x = e.clientX;
    const y = e.clientY;
    
    const now = performance.now();
    const newSparks = Array.from({ length: this.sparkCount }, (_, i) => ({
      x,
      y,
      angle: (2 * Math.PI * i) / this.sparkCount,
      startTime: now
    }));
    
    this.sparks.push(...newSparks);
    
    if (!this.animationId) {
      this.animationId = requestAnimationFrame(this.draw);
    }
  }
}

export function initClickSpark(options = {}) {
  return new ClickSpark(options);
}
