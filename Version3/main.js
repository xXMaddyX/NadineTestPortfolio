document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
      menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Toggle menu button appearance
        const spans = menuToggle.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
          spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
          spans[1].style.opacity = '0';
          spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      });
    }
    
    // Smooth scrolling for navigation links
    const navLinkElements = document.querySelectorAll('.nav-link');
    
    navLinkElements.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          const spans = menuToggle.querySelectorAll('span');
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
        
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Floating pixels animation
    const createFloatingPixels = () => {
      const floatingPixelsContainer = document.querySelector('.floating-pixels');
      if (!floatingPixelsContainer) return;
      
      const pixelCount = 30;
      const colors = [
        'var(--accent-primary)',
        'var(--accent-secondary)',
        'var(--accent-tertiary)',
        'var(--accent-quaternary)'
      ];
      
      for (let i = 0; i < pixelCount; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        
        // Random size between 4px and 16px
        const size = Math.floor(Math.random() * 3) * 4 + 4; // Only 4, 8, 12, or 16px for pixelated look
        pixel.style.width = `${size}px`;
        pixel.style.height = `${size}px`;
        
        // Random position
        const posX = Math.floor(Math.random() * 100);
        const posY = Math.floor(Math.random() * 100);
        pixel.style.left = `${posX}%`;
        pixel.style.top = `${posY}%`;
        
        // Random color from our palette
        const color = colors[Math.floor(Math.random() * colors.length)];
        pixel.style.backgroundColor = color;
        
        // Random animation duration and delay
        const duration = Math.floor(Math.random() * 10) + 5;
        const delay = Math.floor(Math.random() * 5);
        pixel.style.animation = `pixel-move ${duration}s steps(10) infinite ${delay}s`;
        
        floatingPixelsContainer.appendChild(pixel);
      }
    };
    
    createFloatingPixels();
    
    // Create pixel art background elements
    const createPixelArtBackground = () => {
      const sections = document.querySelectorAll('section');
      
      sections.forEach(section => {
        // Create pixel art decorations for each section
        const decoration = document.createElement('div');
        decoration.classList.add('pixel-decoration');
        
        // Random position within the section
        decoration.style.top = `${Math.random() * 80 + 10}%`;
        decoration.style.left = `${Math.random() * 80 + 10}%`;
        
        // Random size
        const size = Math.floor(Math.random() * 3) + 1;
        decoration.style.transform = `scale(${size})`;
        
        section.appendChild(decoration);
      });
    };
    
    createPixelArtBackground();
    
    // Update current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Intersection Observer for section animations
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
      section.classList.add('section-hidden');
      sectionObserver.observe(section);
    });
    
    // Add styles for section animations and pixel elements
    const style = document.createElement('style');
    style.textContent = `
      .section-hidden {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s steps(10), transform 0.6s steps(10);
      }
      
      .visible {
        opacity: 1;
        transform: translateY(0);
      }
      
      .pixel {
        position: absolute;
        box-shadow: 0 0 5px currentColor;
        opacity: 0.7;
      }
      
      @keyframes pixel-move {
        0% { transform: translate(0, 0) rotate(0deg); }
        25% { transform: translate(20px, -30px) rotate(90deg); }
        50% { transform: translate(40px, 0) rotate(180deg); }
        75% { transform: translate(20px, 30px) rotate(270deg); }
        100% { transform: translate(0, 0) rotate(360deg); }
      }
      
      .pixel-decoration {
        position: absolute;
        width: 16px;
        height: 16px;
        background-color: var(--accent-primary);
        z-index: -1;
        opacity: 0.2;
      }
      
      .pixel-decoration::before,
      .pixel-decoration::after {
        content: '';
        position: absolute;
        width: 8px;
        height: 8px;
      }
      
      .pixel-decoration::before {
        top: -8px;
        left: 4px;
        background-color: var(--accent-secondary);
      }
      
      .pixel-decoration::after {
        bottom: -8px;
        right: 4px;
        background-color: var(--accent-tertiary);
      }
    `;
    document.head.appendChild(style);
  });