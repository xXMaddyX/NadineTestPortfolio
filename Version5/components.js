// Base component class for common functionality
class PixelComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
    
    connectedCallback() {
      this.render();
    }
    
    render() {
      // To be implemented by subclasses
    }
    
    // Helper method for creating styles
    createStyles(styles) {
      const styleElement = document.createElement('style');
      styleElement.textContent = styles;
      return styleElement;
    }
  }
  
  // Navigation component
  class PixelNav extends PixelComponent {
    render() {
      const styles = this.createStyles(`
        :host {
          display: block;
          width: 100%;
        }
        
        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
        }
        
        .logo {
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--accent-primary, #00ffaa);
        }
        
        .nav-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--text-primary, #e0e0e0);
          font-size: 1.5rem;
          cursor: pointer;
        }
        
        @media (max-width: 768px) {
          .nav-toggle {
            display: block;
          }
          
          ::slotted(nav) {
            position: fixed;
            top: 60px;
            left: 0;
            width: 100%;
            background-color: rgba(10, 10, 15, 0.95);
            transform: translateY(-100%);
            transition: transform 0.3s ease;
            z-index: 99;
          }
          
          ::slotted(nav.active) {
            transform: translateY(0);
          }
          
          ::slotted(nav ul) {
            flex-direction: column;
            padding: 1rem;
          }
          
          ::slotted(nav li) {
            margin: 0.5rem 0;
          }
        }
        
        ::slotted(nav ul) {
          display: flex;
          list-style: none;
          gap: 2rem;
        }
        
        ::slotted(nav a) {
          color: var(--text-primary, #e0e0e0);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease;
          position: relative;
        }
        
        ::slotted(nav a:hover) {
          color: var(--accent-primary, #00ffaa);
        }
        
        ::slotted(nav a::after) {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--accent-primary, #00ffaa);
          transition: width 0.2s ease;
        }
        
        ::slotted(nav a:hover::after) {
          width: 100%;
        }
      `);
      
      const template = document.createElement('div');
      template.classList.add('nav-container');
      
      const logo = document.createElement('div');
      logo.classList.add('logo');
      logo.textContent = 'PIXEL';
      
      const navToggle = document.createElement('button');
      navToggle.classList.add('nav-toggle');
      navToggle.innerHTML = '&#9776;';
      navToggle.setAttribute('aria-label', 'Toggle navigation');
      
      navToggle.addEventListener('click', () => {
        const nav = this.shadowRoot.querySelector('slot[name="navigation"]').assignedNodes()[0];
        nav.classList.toggle('active');
      });
      
      const slot = document.createElement('slot');
      slot.name = 'navigation';
      
      template.appendChild(logo);
      template.appendChild(slot);
      template.appendChild(navToggle);
      
      this.shadowRoot.appendChild(styles);
      this.shadowRoot.appendChild(template);
    }
  }
  
  // Hero component
  class PixelHero extends PixelComponent {
    render() {
      const styles = this.createStyles(`
        :host {
          display: block;
          width: 100%;
        }
        
        .hero-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 90vh;
          text-align: center;
          padding: 2rem;
        }
        
        .title-container {
          margin-bottom: 2rem;
        }
        
        ::slotted(h1) {
          font-size: 4rem;
          margin-bottom: 1rem;
          background: linear-gradient(90deg, var(--accent-primary, #00ffaa), var(--accent-secondary, #ff00aa));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }
        
        ::slotted(p) {
          font-size: 1.5rem;
          color: var(--text-secondary, #a0a0a0);
        }
        
        .pixel-grid {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: -1;
          opacity: 0.1;
          pointer-events: none;
        }
        
        @media (max-width: 768px) {
          ::slotted(h1) {
            font-size: 3rem;
          }
          
          ::slotted(p) {
            font-size: 1.25rem;
          }
        }
        
        @media (max-width: 480px) {
          ::slotted(h1) {
            font-size: 2.5rem;
          }
          
          ::slotted(p) {
            font-size: 1rem;
          }
        }
      `);
      
      const container = document.createElement('div');
      container.classList.add('hero-container');
      
      const titleContainer = document.createElement('div');
      titleContainer.classList.add('title-container');
      
      const titleSlot = document.createElement('slot');
      titleSlot.name = 'title';
      
      const subtitleSlot = document.createElement('slot');
      subtitleSlot.name = 'subtitle';
      
      titleContainer.appendChild(titleSlot);
      titleContainer.appendChild(subtitleSlot);
      
      container.appendChild(titleContainer);
      
      this.shadowRoot.appendChild(styles);
      this.shadowRoot.appendChild(container);
    }
  }
  
  // Gallery component
  class PixelGallery extends PixelComponent {
    render() {
      const styles = this.createStyles(`
        :host {
          display: block;
          width: 100%;
        }
        
        .gallery-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
          padding: 1rem 0;
        }
        
        @media (max-width: 768px) {
          .gallery-container {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 1.5rem;
          }
        }
        
        @media (max-width: 480px) {
          .gallery-container {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }
      `);
      
      const container = document.createElement('div');
      container.classList.add('gallery-container');
      
      const slot = document.createElement('slot');
      container.appendChild(slot);
      
      this.shadowRoot.appendChild(styles);
      this.shadowRoot.appendChild(container);
    }
  }
  
  // Artwork component
  class PixelArtwork extends PixelComponent {
    static get observedAttributes() {
      return ['src', 'title', 'description'];
    }
    
    get src() {
      return this.getAttribute('src');
    }
    
    get title() {
      return this.getAttribute('title');
    }
    
    get description() {
      return this.getAttribute('description');
    }
    
    render() {
      const styles = this.createStyles(`
        :host {
          display: block;
        }
        
        .artwork-container {
          background-color: var(--bg-secondary, #121218);
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          height: 100%;
        }
        
        .artwork-container:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3), 0 0 10px var(--accent-primary, #00ffaa);
        }
        
        .artwork-image {
          width: 100%;
          aspect-ratio: 1;
          object-fit: cover;
          display: block;
          transition: filter 0.3s ease;
        }
        
        .artwork-container:hover .artwork-image {
          filter: brightness(1.1);
        }
        
        .artwork-info {
          padding: 1rem;
        }
        
        .artwork-title {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
          color: var(--text-primary, #e0e0e0);
        }
        
        .artwork-description {
          color: var(--text-secondary, #a0a0a0);
          font-size: 0.9rem;
        }
        
        .lazy-load {
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        
        .lazy-load.loaded {
          opacity: 1;
        }
      `);
      
      const container = document.createElement('div');
      container.classList.add('artwork-container');
      
      const image = document.createElement('img');
      image.classList.add('artwork-image', 'lazy-load');
      image.alt = this.title;
      image.dataset.src = this.src;
      
      // Placeholder until image loads
      image.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
      
      const info = document.createElement('div');
      info.classList.add('artwork-info');
      
      const title = document.createElement('h3');
      title.classList.add('artwork-title');
      title.textContent = this.title;
      
      const description = document.createElement('p');
      description.classList.add('artwork-description');
      description.textContent = this.description;
      
      info.appendChild(title);
      info.appendChild(description);
      
      container.appendChild(image);
      container.appendChild(info);
      
      this.shadowRoot.appendChild(styles);
      this.shadowRoot.appendChild(container);
      
      // Lazy loading
      this.setupLazyLoading(image);
    }
    
    setupLazyLoading(image) {
      const loadImage = () => {
        if (image.dataset.src) {
          image.src = image.dataset.src;
          image.onload = () => {
            image.classList.add('loaded');
          };
        }
      };
      
      // Use Intersection Observer for lazy loading
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              loadImage();
              observer.unobserve(this);
            }
          });
        }, { rootMargin: '100px' });
        
        observer.observe(this);
      } else {
        // Fallback for browsers that don't support Intersection Observer
        loadImage();
      }
    }
    
    attributeChangedCallback() {
      if (this.shadowRoot) {
        this.render();
      }
    }
  }
  
  // About component
  class PixelAbout extends PixelComponent {
    render() {
      const styles = this.createStyles(`
        :host {
          display: block;
          width: 100%;
        }
        
        .about-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          padding: 1rem 0;
        }
        
        .bio-container, .skills-container {
          background-color: var(--bg-secondary, #121218);
          border-radius: 8px;
          padding: 2rem;
        }
        
        @media (max-width: 768px) {
          .about-container {
            grid-template-columns: 1fr;
          }
        }
      `);
      
      const container = document.createElement('div');
      container.classList.add('about-container');
      
      const bioContainer = document.createElement('div');
      bioContainer.classList.add('bio-container');
      
      const bioSlot = document.createElement('slot');
      bioSlot.name = 'bio';
      bioContainer.appendChild(bioSlot);
      
      const skillsContainer = document.createElement('div');
      skillsContainer.classList.add('skills-container');
      
      const skillsSlot = document.createElement('slot');
      skillsSlot.name = 'skills';
      skillsContainer.appendChild(skillsSlot);
      
      container.appendChild(bioContainer);
      container.appendChild(skillsContainer);
      
      this.shadowRoot.appendChild(styles);
      this.shadowRoot.appendChild(container);
    }
  }
  
  // Skill component
  class PixelSkill extends PixelComponent {
    static get observedAttributes() {
      return ['name', 'level'];
    }
    
    get name() {
      return this.getAttribute('name');
    }
    
    get level() {
      return this.getAttribute('level');
    }
    
    render() {
      const styles = this.createStyles(`
        :host {
          display: block;
          margin-bottom: 1rem;
        }
        
        .skill-container {
          width: 100%;
        }
        
        .skill-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }
        
        .skill-name {
          color: var(--text-primary, #e0e0e0);
        }
        
        .skill-level {
          color: var(--accent-primary, #00ffaa);
        }
        
        .skill-bar {
          height: 8px;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
        }
        
        .skill-progress {
          height: 100%;
          background: linear-gradient(90deg, var(--accent-primary, #00ffaa), var(--accent-secondary, #ff00aa));
          width: 0;
          transition: width 1s ease;
          border-radius: 4px;
        }
      `);
      
      const container = document.createElement('div');
      container.classList.add('skill-container');
      
      const header = document.createElement('div');
      header.classList.add('skill-header');
      
      const name = document.createElement('div');
      name.classList.add('skill-name');
      name.textContent = this.name;
      
      const level = document.createElement('div');
      level.classList.add('skill-level');
      level.textContent = `${this.level}%`;
      
      const bar = document.createElement('div');
      bar.classList.add('skill-bar');
      
      const progress = document.createElement('div');
      progress.classList.add('skill-progress');
      
      header.appendChild(name);
      header.appendChild(level);
      
      bar.appendChild(progress);
      
      container.appendChild(header);
      container.appendChild(bar);
      
      this.shadowRoot.appendChild(styles);
      this.shadowRoot.appendChild(container);
      
      // Animate progress bar when visible
      this.setupProgressAnimation(progress);
    }
    
    setupProgressAnimation(progressElement) {
      const animateProgress = () => {
        setTimeout(() => {
          progressElement.style.width = `${this.level}%`;
        }, 300);
      };
      
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              animateProgress();
              observer.unobserve(this);
            }
          });
        });
        
        observer.observe(this);
      } else {
        // Fallback
        animateProgress();
      }
    }
    
    attributeChangedCallback() {
      if (this.shadowRoot) {
        this.render();
      }
    }
  }
  
  // Contact component
  class PixelContact extends PixelComponent {
    render() {
      const styles = this.createStyles(`
        :host {
          display: block;
          width: 100%;
        }
        
        .contact-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: var(--bg-secondary, #121218);
          border-radius: 8px;
          padding: 2rem;
        }
        
        ::slotted(form) {
          display: flex;
          flex-direction: column;
        }
        
        ::slotted(.form-group) {
          margin-bottom: 1.5rem;
        }
        
        ::slotted(label) {
          display: block;
          margin-bottom: 0.5rem;
          color: var(--text-primary, #e0e0e0);
        }
        
        ::slotted(input), ::slotted(textarea) {
          width: 100%;
          padding: 0.75rem;
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          color: var(--text-primary, #e0e0e0);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        
        ::slotted(input:focus), ::slotted(textarea:focus) {
          outline: none;
          border-color: var(--accent-primary, #00ffaa);
          box-shadow: 0 0 0 2px rgba(0, 255, 170, 0.2);
        }
        
        ::slotted(button) {
          align-self: flex-start;
          padding: 0.75rem 1.5rem;
          background-color: var(--accent-primary, #00ffaa);
          color: var(--bg-primary, #0a0a0f);
          border: none;
          border-radius: 4px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        
        ::slotted(button:hover) {
          background-color: var(--accent-secondary, #ff00aa);
        }
      `);
      
      const container = document.createElement('div');
      container.classList.add('contact-container');
      
      const formSlot = document.createElement('slot');
      formSlot.name = 'form';
      
      container.appendChild(formSlot);
      
      this.shadowRoot.appendChild(styles);
      this.shadowRoot.appendChild(container);
    }
  }
  
  // Footer component
  class PixelFooter extends PixelComponent {
    render() {
      const styles = this.createStyles(`
        :host {
          display: block;
          width: 100%;
        }
        
        .footer-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          padding: 1rem;
        }
        
        .social-links {
          display: flex;
          gap: 1rem;
        }
        
        ::slotted(a) {
          color: var(--text-secondary, #a0a0a0);
          transition: color 0.2s ease;
        }
        
        ::slotted(a:hover) {
          color: var(--accent-primary, #00ffaa);
        }
        
        ::slotted(svg) {
          width: 24px;
          height: 24px;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        
        ::slotted(p) {
          color: var(--text-secondary, #a0a0a0);
          font-size: 0.9rem;
        }
      `);
      
      const container = document.createElement('div');
      container.classList.add('footer-container');
      
      const socialContainer = document.createElement('div');
      socialContainer.classList.add('social-links');
      
      const socialSlot = document.createElement('slot');
      socialSlot.name = 'social';
      socialContainer.appendChild(socialSlot);
      
      const copyrightSlot = document.createElement('slot');
      copyrightSlot.name = 'copyright';
      
      container.appendChild(socialContainer);
      container.appendChild(copyrightSlot);
      
      this.shadowRoot.appendChild(styles);
      this.shadowRoot.appendChild(container);
    }
  }
  
  // Register all components
  customElements.define('pixel-nav', PixelNav);
  customElements.define('pixel-hero', PixelHero);
  customElements.define('pixel-gallery', PixelGallery);
  customElements.define('pixel-artwork', PixelArtwork);
  customElements.define('pixel-about', PixelAbout);
  customElements.define('pixel-skill', PixelSkill);
  customElements.define('pixel-contact', PixelContact);
  customElements.define('pixel-footer', PixelFooter);