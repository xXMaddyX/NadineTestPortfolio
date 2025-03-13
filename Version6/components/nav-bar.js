class NavBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          background-color: var(--bg-secondary);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .logo {
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--text-primary);
        }
        
        .logo span {
          color: var(--accent-primary);
        }
        
        .nav-links {
          display: flex;
          gap: 2rem;
        }
        
        .nav-links a {
          color: var(--text-primary);
          text-decoration: none;
          transition: var(--transition);
          font-weight: 500;
        }
        
        .nav-links a:hover {
          color: var(--accent-primary);
        }
        
        .menu-toggle {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 30px;
          height: 21px;
          cursor: pointer;
        }
        
        .menu-toggle span {
          display: block;
          height: 3px;
          width: 100%;
          background-color: var(--text-primary);
          border-radius: 3px;
          transition: var(--transition);
        }
        
        @media (max-width: 768px) {
          .menu-toggle {
            display: flex;
          }
          
          .nav-links {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            flex-direction: column;
            background-color: var(--bg-secondary);
            padding: 1rem 0;
            gap: 0;
            transform: translateY(-100%);
            opacity: 0;
            pointer-events: none;
            transition: var(--transition);
          }
          
          .nav-links.active {
            transform: translateY(0);
            opacity: 1;
            pointer-events: all;
          }
          
          .nav-links a {
            display: block;
            padding: 1rem 2rem;
          }
        }
      </style>
      
      <div class="container">
        <div class="logo">Pixel<span>Art</span></div>
        <div class="menu-toggle">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav class="nav-links">
          <a href="#home">Home</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    `;
  }

  addEventListeners() {
    const menuToggle = this.shadowRoot.querySelector('.menu-toggle');
    const navLinks = this.shadowRoot.querySelector('.nav-links');
    const links = this.shadowRoot.querySelectorAll('.nav-links a');

    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
}

customElements.define('nav-bar', NavBar);