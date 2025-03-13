// Project Carousel Web Component
class ProjectCarousel extends HTMLElement {
    constructor() {
      super();
      this.projects = [
        {
          title: 'Cyberpunk City',
          description: 'A futuristic cityscape with neon lights and cyberpunk aesthetics.',
          image: '/placeholder.svg?height=400&width=600',
          tags: ['Environment', 'Cyberpunk', 'Animation']
        },
        {
          title: 'Fantasy RPG Characters',
          description: 'A collection of fantasy RPG character sprites for indie game development.',
          image: '/placeholder.svg?height=400&width=600',
          tags: ['Characters', 'RPG', 'Game Assets']
        },
        {
          title: 'Retro Arcade Game',
          description: 'Complete pixel art package for a retro-style arcade game.',
          image: '/placeholder.svg?height=400&width=600',
          tags: ['Game Assets', 'Retro', 'UI Design']
        }
      ];
      this.currentIndex = 0;
    }
  
    connectedCallback() {
      this.render();
      this.setupEventListeners();
    }
  
    render() {
      this.innerHTML = `
        <div class="carousel">
          <div class="carousel-container">
            ${this.projects.map((project, index) => `
              <div class="carousel-item ${index === this.currentIndex ? 'active' : ''}">
                <div class="project-card pixel-border">
                  <div class="project-image" style="background-image: url('${project.image}')"></div>
                  <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">
                      ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                    </div>
                    <a href="#" class="btn secondary">View Details</a>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
          <button class="carousel-control prev" aria-label="Previous project">
            <div class="arrow-left"></div>
          </button>
          <button class="carousel-control next" aria-label="Next project">
            <div class="arrow-right"></div>
          </button>
          <div class="carousel-indicators">
            ${this.projects.map((_, index) => `
              <button class="indicator ${index === this.currentIndex ? 'active' : ''}" data-index="${index}" aria-label="Go to project ${index + 1}"></button>
            `).join('')}
          </div>
        </div>
      `;
  
      // Add styles
      const style = document.createElement('style');
      style.textContent = `
        .carousel {
          width: 100%;
          position: relative;
          overflow: hidden;
          margin: 0 auto;
        }
        
        .carousel-container {
          display: flex;
          transition: transform 0.5s steps(10);
          height: 550px;
        }
        
        .carousel-item {
          min-width: 100%;
          opacity: 0;
          transition: opacity 0.5s steps(5);
          display: none;
        }
        
        .carousel-item.active {
          opacity: 1;
          display: block;
        }
        
        .project-card {
          background-color: var(--bg-primary);
          overflow: hidden;
          box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.5);
          height: 100%;
          display: flex;
          flex-direction: column;
          border: 4px solid var(--accent-primary);
          position: relative;
        }
        
        .project-card::after {
          content: '';
          position: absolute;
          top: 4px;
          left: 4px;
          right: 4px;
          bottom: 4px;
          border: 2px solid var(--accent-secondary);
          pointer-events: none;
          z-index: 1;
        }
        
        .project-image {
          height: 300px;
          background-size: cover;
          background-position: center;
          border-bottom: 4px solid var(--accent-primary);
          image-rendering: pixelated;
        }
        
        .project-content {
          padding: 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .project-content h3 {
          margin-bottom: 1rem;
          font-size: 1.2rem;
          color: var(--accent-primary);
          text-shadow: 2px 2px 0 var(--bg-primary);
        }
        
        .project-content p {
          margin-bottom: 1.5rem;
          color: var(--text-secondary);
          flex: 1;
          font-size: 0.7rem;
          line-height: 1.8;
        }
        
        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
          margin-bottom: 1.5rem;
        }
        
        .project-tag {
          background-color: rgba(0, 240, 255, 0.1);
          color: var(--accent-primary);
          padding: 0.5rem;
          font-size: 0.6rem;
          font-family: 'Press Start 2P', monospace;
          border: 2px solid var(--accent-primary);
        }
        
        .carousel-control {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          background-color: var(--bg-primary);
          border: 4px solid var(--accent-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: all 0.3s steps(5);
        }
        
        .carousel-control:hover {
          background-color: var(--accent-primary);
        }
        
        .carousel-control:active {
          transform: translateY(-50%) scale(0.9);
        }
        
        .carousel-control.prev {
          left: 20px;
        }
        
        .carousel-control.next {
          right: 20px;
        }
        
        .arrow-left, .arrow-right {
          width: 0;
          height: 0;
          border-style: solid;
        }
        
        .arrow-left {
          border-width: 8px 12px 8px 0;
          border-color: transparent var(--text-primary) transparent transparent;
        }
        
        .arrow-right {
          border-width: 8px 0 8px 12px;
          border-color: transparent transparent transparent var(--text-primary);
        }
        
        .carousel-indicators {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
        }
        
        .indicator {
          width: 16px;
          height: 16px;
          background-color: transparent;
          border: 3px solid rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: all 0.3s steps(5);
        }
        
        .indicator.active {
          background-color: var(--accent-primary);
          border-color: var(--accent-primary);
          box-shadow: 0 0 10px var(--accent-primary);
        }
        
        @media (max-width: 768px) {
          .carousel-container {
            height: 650px;
          }
          
          .project-card {
            height: auto;
          }
          
          .project-image {
            height: 200px;
          }
        }
      `;
      this.appendChild(style);
    }
  
    setupEventListeners() {
      const prevButton = this.querySelector('.prev');
      const nextButton = this.querySelector('.next');
      const indicators = this.querySelectorAll('.indicator');
  
      prevButton.addEventListener('click', () => this.navigate(-1));
      nextButton.addEventListener('click', () => this.navigate(1));
  
      indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
          const index = parseInt(indicator.dataset.index);
          this.goToSlide(index);
        });
      });
    }
  
    navigate(direction) {
      this.currentIndex = (this.currentIndex + direction + this.projects.length) % this.projects.length;
      this.goToSlide(this.currentIndex);
    }
  
    goToSlide(index) {
      const items = this.querySelectorAll('.carousel-item');
      const indicators = this.querySelectorAll('.indicator');
  
      // Update active class for items
      items.forEach((item, i) => {
        if (i === index) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
  
      // Update active class for indicators
      indicators.forEach((indicator, i) => {
        if (i === index) {
          indicator.classList.add('active');
        } else {
          indicator.classList.remove('active');
        }
      });
  
      this.currentIndex = index;
    }
  }
  
  // Art Gallery Web Component
  class ArtGallery extends HTMLElement {
    constructor() {
      super();
      this.artworks = [
        { image: '/placeholder.svg?height=300&width=300', title: 'Pixel Portrait' },
        { image: '/placeholder.svg?height=300&width=300', title: 'Landscape Scene' },
        { image: '/placeholder.svg?height=300&width=300', title: 'Character Sprite' },
        { image: '/placeholder.svg?height=300&width=300', title: 'UI Elements' },
        { image: '/placeholder.svg?height=300&width=300', title: 'Animation Frames' },
        { image: '/placeholder.svg?height=300&width=300', title: 'Game Assets' }
      ];
      this.currentIndex = 0;
      this.itemsPerView = 3;
    }
  
    connectedCallback() {
      this.render();
      this.setupEventListeners();
      this.updateItemsPerView();
      window.addEventListener('resize', () => this.updateItemsPerView());
    }
  
    updateItemsPerView() {
      if (window.innerWidth < 768) {
        this.itemsPerView = 1;
      } else if (window.innerWidth < 1024) {
        this.itemsPerView = 2;
      } else {
        this.itemsPerView = 3;
      }
      this.goToSlide(0);
    }
  
    render() {
      this.innerHTML = `
        <div class="gallery-carousel">
          <div class="gallery-container">
            ${this.artworks.map((artwork, index) => `
              <div class="gallery-item">
                <div class="artwork pixel-border">
                  <div class="artwork-image" style="background-image: url('${artwork.image}')"></div>
                  <div class="artwork-overlay">
                    <h4>${artwork.title}</h4>
                    <button class="view-btn">View Full Size</button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
          <button class="gallery-control prev" aria-label="Previous artworks">
            <div class="arrow-left"></div>
          </button>
          <button class="gallery-control next" aria-label="Next artworks">
            <div class="arrow-right"></div>
          </button>
        </div>
      `;
  
      // Add styles
      const style = document.createElement('style');
      style.textContent = `
        .gallery-carousel {
          width: 100%;
          position: relative;
          overflow: hidden;
          margin: 0 auto;
        }
        
        .gallery-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          transition: transform 0.5s steps(10);
        }
        
        .gallery-item {
          opacity: 1;
          transition: opacity 0.5s steps(5);
        }
        
        .artwork {
          position: relative;
          overflow: hidden;
          aspect-ratio: 1;
          cursor: pointer;
          border: 4px solid var(--accent-tertiary);
          box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.5);
        }
        
        .artwork::after {
          content: '';
          position: absolute;
          top: 4px;
          left: 4px;
          right: 4px;
          bottom: 4px;
          border: 2px solid var(--accent-quaternary);
          pointer-events: none;
          z-index: 2;
        }
        
        .artwork-image {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          transition: transform 0.5s steps(5);
          image-rendering: pixelated;
        }
        
        .artwork-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(10, 10, 15, 0.7);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transition: opacity 0.3s steps(5);
          padding: 1rem;
          z-index: 1;
        }
        
        .artwork:hover .artwork-image {
          transform: scale(1.1);
        }
        
        .artwork:hover .artwork-overlay {
          opacity: 1;
        }
        
        .artwork-overlay h4 {
          color: var(--text-primary);
          margin-bottom: 1.5rem;
          text-align: center;
          font-size: 0.8rem;
          text-shadow: 2px 2px 0 var(--bg-primary);
        }
        
        .view-btn {
          background-color: var(--accent-tertiary);
          color: var(--bg-primary);
          border: none;
          padding: 0.8rem;
          cursor: pointer;
          font-family: 'Press Start 2P', monospace;
          transition: all 0.3s steps(5);
          font-size: 0.6rem;
          box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.5);
        }
        
        .view-btn:hover {
          background-color: var(--accent-quaternary);
        }
        
        .view-btn:active {
          transform: translate(2px, 2px);
          box-shadow: 1px 1px 0 rgba(0, 0, 0, 0.5);
        }
        
        .gallery-control {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          background-color: var(--bg-primary);
          border: 4px solid var(--accent-tertiary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: all 0.3s steps(5);
        }
        
        .gallery-control:hover {
          background-color: var(--accent-tertiary);
        }
        
        .gallery-control:active {
          transform: translateY(-50%) scale(0.9);
        }
        
        .gallery-control.prev {
          left: 10px;
        }
        
        .gallery-control.next {
          right: 10px;
        }
        
        .arrow-left, .arrow-right {
          width: 0;
          height: 0;
          border-style: solid;
        }
        
        .arrow-left {
          border-width: 8px 12px 8px 0;
          border-color: transparent var(--text-primary) transparent transparent;
        }
        
        .arrow-right {
          border-width: 8px 0 8px 12px;
          border-color: transparent transparent transparent var(--text-primary);
        }
        
        @media (max-width: 1024px) {
          .gallery-container {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .gallery-container {
            grid-template-columns: 1fr;
          }
        }
      `;
      this.appendChild(style);
    }
  
    setupEventListeners() {
      const prevButton = this.querySelector('.prev');
      const nextButton = this.querySelector('.next');
  
      prevButton.addEventListener('click', () => this.navigate(-1));
      nextButton.addEventListener('click', () => this.navigate(1));
    }
  
    navigate(direction) {
      const maxIndex = Math.ceil(this.artworks.length / this.itemsPerView) - 1;
      this.currentIndex = Math.max(0, Math.min(this.currentIndex + direction, maxIndex));
      this.goToSlide(this.currentIndex);
    }
  
    goToSlide(index) {
      const container = this.querySelector('.gallery-container');
      const translateValue = -index * 100;
      container.style.transform = `translateX(${translateValue}%)`;
    }
  }
  
  // Skill Tag Web Component
  class SkillTag extends HTMLElement {
    connectedCallback() {
      const name = this.getAttribute('name') || 'Skill';
      
      this.innerHTML = `
        <div class="skill-tag">
          <span>${name}</span>
        </div>
      `;
      
      const style = document.createElement('style');
      style.textContent = `
        .skill-tag {
          display: inline-block;
          background-color: var(--bg-primary);
          color: var(--accent-quaternary);
          padding: 0.5rem;
          font-size: 0.7rem;
          font-family: 'Press Start 2P', monospace;
          border: 3px solid var(--accent-quaternary);
          position: relative;
          box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.5);
        }
        
        .skill-tag::before {
          content: '';
          position: absolute;
          top: -3px;
          left: -3px;
          width: calc(100% + 6px);
          height: calc(100% + 6px);
          background: 
            linear-gradient(to right, var(--accent-quaternary) 3px, transparent 3px) 0 0,
            linear-gradient(to right, var(--accent-quaternary) 3px, transparent 3px) 0 100%,
            linear-gradient(to left, var(--accent-quaternary) 3px, transparent 3px) 100% 0,
            linear-gradient(to left, var(--accent-quaternary) 3px, transparent 3px) 100% 100%,
            linear-gradient(to bottom, var(--accent-quaternary) 3px, transparent 3px) 0 0,
            linear-gradient(to bottom, var(--accent-quaternary) 3px, transparent 3px) 100% 0,
            linear-gradient(to top, var(--accent-quaternary) 3px, transparent 3px) 0 100%,
            linear-gradient(to top, var(--accent-quaternary) 3px, transparent 3px) 100% 100%;
          background-repeat: no-repeat;
          background-size: 10px 10px;
          pointer-events: none;
          z-index: 1;
        }
      `;
      this.appendChild(style);
    }
  }
  
  // Contact Form Web Component
  class FormComponent extends HTMLElement {
    connectedCallback() {
      this.render();
      this.setupEventListeners();
    }
  
    render() {
      this.innerHTML = `
        <form class="contact-form-element pixel-border">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" required>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
          </div>
          <div class="form-group">
            <label for="subject">Subject</label>
            <input type="text" id="subject" name="subject" required>
          </div>
          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          <button type="submit" class="btn primary">Send Message</button>
        </form>
      `;
  
      // Add styles
      const style = document.createElement('style');
      style.textContent = `
        .contact-form-element {
          width: 100%;
          border: 4px solid var(--accent-primary);
          padding: 1.5rem;
          background-color: var(--bg-primary);
          box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.5);
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        label {
          display: block;
          margin-bottom: 0.8rem;
          font-family: 'Press Start 2P', monospace;
          color: var(--text-secondary);
          font-size: 0.7rem;
        }
        
        input, textarea {
          width: 100%;
          padding: 0.8rem;
          background-color: rgba(10, 10, 15, 0.5);
          border: 4px solid rgba(0, 240, 255, 0.2);
          color: var(--text-primary);
          font-family: 'Press Start 2P', monospace;
          font-size: 0.7rem;
          transition: border-color 0.3s steps(5);
        }
        
        input:focus, textarea:focus {
          outline: none;
          border-color: var(--accent-primary);
        }
        
        button[type="submit"] {
          width: 100%;
          cursor: pointer;
          margin-top: 1rem;
          font-size: 0.7rem;
          padding: 1rem;
          box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.5);
        }
        
        button[type="submit"]:active {
          transform: translate(2px, 2px);
          box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
        }
      `;
      this.appendChild(style);
    }
  
    setupEventListeners() {
      const form = this.querySelector('form');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Simulate form submission
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
          form.reset();
          submitButton.textContent = 'Message Sent!';
          
          setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
          }, 2000);
        }, 1500);
      });
    }
  }
  
  // Register Web Components
  customElements.define('project-carousel', ProjectCarousel);
  customElements.define('art-gallery', ArtGallery);
  customElements.define('skill-tag', SkillTag);
  customElements.define('form-component', FormComponent);