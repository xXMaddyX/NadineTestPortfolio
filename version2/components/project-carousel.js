class ProjectCarousel extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.currentSlide = 0
    this.projects = [
      {
        title: "Cyberpunk Adventure Game",
        description: "A side-scrolling adventure game with cyberpunk aesthetics and detailed pixel environments.",
        image: "/placeholder.svg?height=300&width=500",
        tags: ["Game Assets", "Character Design", "Environment"],
      },
      {
        title: "Fantasy RPG Tileset",
        description: "Complete tileset for a fantasy RPG including characters, items, and environment assets.",
        image: "/placeholder.svg?height=300&width=500",
        tags: ["Tileset", "RPG", "Fantasy"],
      },
      {
        title: "Sci-Fi UI Design",
        description: "Futuristic user interface elements designed for a space exploration game.",
        image: "/placeholder.svg?height=300&width=500",
        tags: ["UI/UX", "Sci-Fi", "Game Design"],
      },
      {
        title: "Retro Arcade Characters",
        description: "Character sprites inspired by classic arcade games with modern pixel art techniques.",
        image: "/placeholder.svg?height=300&width=500",
        tags: ["Character Design", "Animation", "Retro"],
      },
    ]
    this.render()
    this.setupEventListeners()
  }

  render() {
    this.shadowRoot.innerHTML = `
    <style>
      :host {
        display: block;
        width: 100%;
        position: relative;
      }
      
      .carousel {
        width: 100%;
        overflow: hidden;
        position: relative;
        border: 4px solid #111111;
        box-shadow: 8px 8px 0px #111111;
      }
      
      .slides {
        display: flex;
        transition: transform 0.5s steps(5);
        height: auto;
      }
      
      .slide {
        min-width: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
      }
      
      .slide-image {
        height: 250px;
        width: 100%;
        object-fit: cover;
        border-bottom: 4px solid #111111;
        image-rendering: pixelated;
      }
      
      .slide-content {
        padding: 20px;
        background-color: #3f3f74;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
      }
      
      .slide-title {
        font-family: 'Press Start 2P', cursive;
        font-size: 1.2rem;
        margin-bottom: 15px;
        color: white;
        text-shadow: 2px 2px 0px #111111;
      }
      
      .slide-description {
        color: white;
        margin-bottom: 20px;
        flex-grow: 1;
        font-size: 0.8rem;
        line-height: 1.6;
        font-family: 'Press Start 2P', cursive;
      }
      
      .slide-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }
      
      .tag {
        background-color: #222034;
        color: #00e436;
        padding: 5px 10px;
        font-size: 0.7rem;
        border: 2px solid #111111;
        font-family: 'Press Start 2P', cursive;
      }
      
      .controls {
        position: absolute;
        bottom: 20px;
        right: 20px;
        display: flex;
        gap: 10px;
      }
      
      .control-btn {
        background-color: #222034;
        border: 2px solid #111111;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background-color 0.3s ease;
        color: white;
        box-shadow: 2px 2px 0px #111111;
      }
      
      .control-btn:hover {
        background-color: #ff004d;
      }
      
      .indicators {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 10px;
      }
      
      .indicator {
        width: 15px;
        height: 15px;
        background-color: #222034;
        cursor: pointer;
        transition: background-color 0.3s ease;
        border: 2px solid #111111;
      }
      
      .indicator.active {
        background-color: #ff004d;
      }
      
      @media (max-width: 768px) {
        .slides {
          height: auto;
        }
        
        .slide-image {
          height: 180px;
        }
        
        .slide-title {
          font-size: 1rem;
        }
        
        .slide-description {
          font-size: 0.7rem;
        }
      }
    </style>
    
    <div class="carousel">
      <div class="slides">
        ${this.projects
          .map(
            (project) => `
          <div class="slide">
            <img src="${project.image}" alt="${project.title}" class="slide-image">
            <div class="slide-content">
              <h3 class="slide-title">${project.title}</h3>
              <p class="slide-description">${project.description}</p>
              <div class="slide-tags">
                ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
              </div>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
      
      <div class="controls">
        <button class="control-btn prev">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
          </svg>
        </button>
        <button class="control-btn next">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
          </svg>
        </button>
      </div>
      
      <div class="indicators">
        ${this.projects
          .map(
            (_, index) => `
          <div class="indicator ${index === 0 ? "active" : ""}" data-index="${index}"></div>
        `,
          )
          .join("")}
      </div>
    </div>
  `
  }

  setupEventListeners() {
    const prevBtn = this.shadowRoot.querySelector(".prev")
    const nextBtn = this.shadowRoot.querySelector(".next")
    const indicators = this.shadowRoot.querySelectorAll(".indicator")

    prevBtn.addEventListener("click", () => this.prevSlide())
    nextBtn.addEventListener("click", () => this.nextSlide())

    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => this.goToSlide(index))
    })

    // Auto slide
    this.autoSlideInterval = setInterval(() => this.nextSlide(), 5000)

    // Pause auto slide on hover
    const carousel = this.shadowRoot.querySelector(".carousel")
    carousel.addEventListener("mouseenter", () => clearInterval(this.autoSlideInterval))
    carousel.addEventListener("mouseleave", () => {
      this.autoSlideInterval = setInterval(() => this.nextSlide(), 5000)
    })
  }

  updateSlidePosition() {
    const slides = this.shadowRoot.querySelector(".slides")
    slides.style.transform = `translateX(-${this.currentSlide * 100}%)`

    const indicators = this.shadowRoot.querySelectorAll(".indicator")
    indicators.forEach((indicator, index) => {
      if (index === this.currentSlide) {
        indicator.classList.add("active")
      } else {
        indicator.classList.remove("active")
      }
    })
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.projects.length
    this.updateSlidePosition()
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.projects.length) % this.projects.length
    this.updateSlidePosition()
  }

  goToSlide(index) {
    this.currentSlide = index
    this.updateSlidePosition()
  }

  disconnectedCallback() {
    clearInterval(this.autoSlideInterval)
  }
}

customElements.define("project-carousel", ProjectCarousel)

