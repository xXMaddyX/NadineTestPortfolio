class NavComponent extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.render()
    this.setupEventListeners()
  }

  render() {
    this.shadowRoot.innerHTML = `
    <style>
      :host {
        display: block;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        transition: background-color 0.3s ease;
      }
      
      .nav-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
      }
      
      .logo {
        font-family: 'Press Start 2P', cursive;
        font-size: 1.2rem;
        font-weight: 400;
        color: white;
        text-decoration: none;
        display: flex;
        align-items: center;
        text-shadow: 2px 2px 0px #111111;
      }
      
      .accent {
        color: #00e436;
      }
      
      .nav-links {
        display: flex;
        gap: 20px;
      }
      
      .nav-link {
        color: white;
        text-decoration: none;
        font-size: 0.8rem;
        position: relative;
        transition: color 0.3s ease;
        font-family: 'Press Start 2P', cursive;
        padding: 5px 10px;
        background-color: #222034;
        border: 2px solid #111111;
        box-shadow: 2px 2px 0px #111111;
      }
      
      .nav-link:hover {
        color: #ff004d;
        transform: translateY(-3px);
        box-shadow: 2px 5px 0px #111111;
      }
      
      .mobile-menu-btn {
        display: none;
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
      }
      
      .scrolled {
        background-color: rgba(34, 32, 52, 0.9);
        backdrop-filter: blur(10px);
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        border-bottom: 4px solid #111111;
      }
      
      @media (max-width: 768px) {
        .nav-links {
          position: fixed;
          top: 0;
          right: -100%;
          width: 70%;
          height: 100vh;
          background-color: rgba(34, 32, 52, 0.95);
          backdrop-filter: blur(10px);
          flex-direction: column;
          justify-content: center;
          align-items: center;
          transition: right 0.3s ease;
          z-index: 1000;
          border-left: 4px solid #111111;
        }
        
        .nav-links.active {
          right: 0;
        }
        
        .mobile-menu-btn {
          display: block;
          z-index: 1001;
        }
        
        .nav-link {
          font-size: 0.8rem;
          margin: 10px 0;
          width: 80%;
          text-align: center;
        }
        
        .close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
        }
      }
    </style>
    
    <nav>
      <div class="nav-container">
        <a href="#" class="logo">PIXEL<span class="accent">MASTER</span></a>
        
        <button class="mobile-menu-btn">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
          </svg>
        </button>
        
        <div class="nav-links">
          <button class="close-btn">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
            </svg>
          </button>
          <a href="#hero" class="nav-link">Home</a>
          <a href="#about" class="nav-link">About</a>
          <a href="#projects" class="nav-link">Projects</a>
          <a href="#gallery" class="nav-link">Gallery</a>
          <a href="#services" class="nav-link">Services</a>
          <a href="#contact" class="nav-link">Contact</a>
        </div>
      </div>
    </nav>
  `
  }

  setupEventListeners() {
    const mobileMenuBtn = this.shadowRoot.querySelector(".mobile-menu-btn")
    const closeBtn = this.shadowRoot.querySelector(".close-btn")
    const navLinks = this.shadowRoot.querySelector(".nav-links")
    const links = this.shadowRoot.querySelectorAll(".nav-link")
    const nav = this.shadowRoot.querySelector(":host")

    mobileMenuBtn.addEventListener("click", () => {
      navLinks.classList.add("active")
    })

    closeBtn.addEventListener("click", () => {
      navLinks.classList.remove("active")
    })

    links.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active")
      })
    })

    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        nav.classList.add("scrolled")
      } else {
        nav.classList.remove("scrolled")
      }
    })
  }
}

customElements.define("nav-component", NavComponent)

