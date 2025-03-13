// Particle animation on canvas
class PixelParticleAnimation {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas.getContext('2d');
      this.particles = [];
      this.mousePosition = { x: 0, y: 0 };
      this.isMouseMoving = false;
      this.lastMouseMoveTime = 0;
      this.mouseVelocity = { x: 0, y: 0 };
      this.lastMousePosition = { x: 0, y: 0 };
      
      // Configuration
      this.config = {
        particleCount: 150,
        particleSize: 3,
        particleColor: '#00ffaa',
        particleSecondaryColor: '#ff00aa',
        particleSpeed: 0.5,
        connectionDistance: 150,
        connectionOpacity: 0.15,
        mouseInfluenceRadius: 200,
        mouseInfluenceStrength: 0.1
      };
      
      this.init();
    }
    
    init() {
      // Set canvas size
      this.resizeCanvas();
      window.addEventListener('resize', this.throttle(this.resizeCanvas.bind(this), 200));
      
      // Mouse events
      window.addEventListener('mousemove', this.throttle(this.handleMouseMove.bind(this), 16));
      
      // Create particles
      this.createParticles();
      
      // Start animation
      this.animate();
      
      // Check mouse movement
      setInterval(() => {
        const currentTime = Date.now();
        if (currentTime - this.lastMouseMoveTime > 100) {
          this.isMouseMoving = false;
        }
      }, 100);
    }
    
    resizeCanvas() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      
      // Recreate particles when canvas is resized
      if (this.particles.length > 0) {
        this.particles = [];
        this.createParticles();
      }
    }
    
    createParticles() {
      for (let i = 0; i < this.config.particleCount; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          size: Math.random() * this.config.particleSize + 1,
          speedX: (Math.random() - 0.5) * this.config.particleSpeed,
          speedY: (Math.random() - 0.5) * this.config.particleSpeed,
          color: Math.random() > 0.5 ? this.config.particleColor : this.config.particleSecondaryColor
        });
      }
    }
    
    handleMouseMove(e) {
      const currentTime = Date.now();
      const dt = currentTime - this.lastMouseMoveTime;
      
      if (dt > 0) {
        this.mouseVelocity.x = (e.clientX - this.lastMousePosition.x) / dt;
        this.mouseVelocity.y = (e.clientY - this.lastMousePosition.y) / dt;
      }
      
      this.lastMousePosition.x = e.clientX;
      this.lastMousePosition.y = e.clientY;
      this.mousePosition.x = e.clientX;
      this.mousePosition.y = e.clientY;
      this.isMouseMoving = true;
      this.lastMouseMoveTime = currentTime;
    }
    
    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      // Update and draw particles
      this.updateParticles();
      this.drawParticles();
      this.drawConnections();
      
      requestAnimationFrame(this.animate.bind(this));
    }
    
    updateParticles() {
      for (let i = 0; i < this.particles.length; i++) {
        const particle = this.particles[i];
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Mouse influence
        if (this.isMouseMoving) {
          const dx = this.mousePosition.x - particle.x;
          const dy = this.mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < this.config.mouseInfluenceRadius) {
            const influence = (1 - distance / this.config.mouseInfluenceRadius) * this.config.mouseInfluenceStrength;
            particle.speedX += this.mouseVelocity.x * influence;
            particle.speedY += this.mouseVelocity.y * influence;
          }
        }
        
        // Apply friction
        particle.speedX *= 0.99;
        particle.speedY *= 0.99;
        
        // Boundary check
        if (particle.x < 0) {
          particle.x = 0;
          particle.speedX *= -1;
        } else if (particle.x > this.canvas.width) {
          particle.x = this.canvas.width;
          particle.speedX *= -1;
        }
        
        if (particle.y < 0) {
          particle.y = 0;
          particle.speedY *= -1;
        } else if (particle.y > this.canvas.height) {
          particle.y = this.canvas.height;
          particle.speedY *= -1;
        }
      }
    }
    
    drawParticles() {
      for (let i = 0; i < this.particles.length; i++) {
        const particle = this.particles[i];
        
        this.ctx.fillStyle = particle.color;
        this.ctx.fillRect(
          Math.floor(particle.x),
          Math.floor(particle.y),
          particle.size,
          particle.size
        );
      }
    }
    
    drawConnections() {
      for (let i = 0; i < this.particles.length; i++) {
        for (let j = i + 1; j < this.particles.length; j++) {
          const particle1 = this.particles[i];
          const particle2 = this.particles[j];
          
          const dx = particle1.x - particle2.x;
          const dy = particle1.y - particle2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < this.config.connectionDistance) {
            const opacity = (1 - distance / this.config.connectionDistance) * this.config.connectionOpacity;
            
            this.ctx.beginPath();
            this.ctx.strokeStyle = `rgba(0, 255, 170, ${opacity})`;
            this.ctx.moveTo(particle1.x, particle1.y);
            this.ctx.lineTo(particle2.x, particle2.y);
            this.ctx.stroke();
          }
        }
      }
    }
    
    // Utility functions
    throttle(callback, delay) {
      let lastCall = 0;
      return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
          lastCall = now;
          callback.apply(this, args);
        }
      };
    }
  }
  
  // Form handling
  class ContactForm {
    constructor() {
      this.form = document.querySelector('form');
      if (this.form) {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
      }
    }
    
    handleSubmit(e) {
      e.preventDefault();
      
      const nameInput = this.form.querySelector('#name');
      const emailInput = this.form.querySelector('#email');
      const messageInput = this.form.querySelector('#message');
      
      // Simple validation
      if (!nameInput.value || !emailInput.value || !messageInput.value) {
        alert('Please fill in all fields');
        return;
      }
      
      // Simulate form submission
      const submitButton = this.form.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      
      // Simulate API call
      setTimeout(() => {
        alert('Message sent successfully!');
        this.form.reset();
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }, 1500);
    }
  }
  
  // Smooth scrolling for navigation links
  class SmoothScroll {
    constructor() {
      this.links = document.querySelectorAll('a[href^="#"]');
      this.setupEventListeners();
    }
    
    setupEventListeners() {
      this.links.forEach(link => {
        link.addEventListener('click', this.handleClick.bind(this));
      });
    }
    
    handleClick(e) {
      e.preventDefault();
      
      const targetId = e.currentTarget.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Close mobile menu if open
        const nav = document.querySelector('nav');
        if (nav.classList.contains('active')) {
          nav.classList.remove('active');
        }
        
        // Scroll to target
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  }
  
  // Initialize everything when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle animation
    const particleAnimation = new PixelParticleAnimation('particle-canvas');
    
    // Initialize contact form
    const contactForm = new ContactForm();
    
    // Initialize smooth scrolling
    const smoothScroll = new SmoothScroll();
  });