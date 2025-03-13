// Define Web Components
class ProjectCard extends HTMLElement {
  constructor() {
    super()

    // Get template content
    const template = document.getElementById("project-card-template")
    const templateContent = template.content

    // Create shadow DOM
    this.attachShadow({ mode: "open" })
    this.shadowRoot.appendChild(templateContent.cloneNode(true))

    // Get attributes
    const title = this.getAttribute("title") || "Project Title"
    const description = this.getAttribute("description") || "Project description goes here."
    const image = this.getAttribute("image") || "/placeholder.svg?height=300&width=400"
    const tags = this.getAttribute("tags") || ""

    // Set content
    this.shadowRoot.querySelector(".project-title").textContent = title
    this.shadowRoot.querySelector(".project-description").textContent = description
    this.shadowRoot.querySelector(".project-image img").src = image
    this.shadowRoot.querySelector(".project-image img").alt = title

    // Create tags
    const tagsContainer = this.shadowRoot.querySelector(".project-tags")
    if (tags) {
      const tagsList = tags.split(",")
      tagsList.forEach((tag) => {
        const tagElement = document.createElement("span")
        tagElement.className = "project-tag"
        tagElement.textContent = tag.trim()
        tagsContainer.appendChild(tagElement)
      })
    }

    // Add styles
    const style = document.createElement("style")
    style.textContent = `
      :host {
        display: block;
      }
      
      .project-card {
        background-color: #12121e;
        border: 4px solid #2a2a3a;
        overflow: hidden;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      
      .project-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
      }
      
      .project-image {
        width: 100%;
        height: 200px;
        overflow: hidden;
        position: relative;
      }
      
      .project-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }
      
      .project-card:hover .project-image img {
        transform: scale(1.1);
      }
      
      .project-content {
        padding: 1.5rem;
      }
      
      .project-title {
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
        color: #e0e0e0;
        font-family: 'Press Start 2P', cursive;
      }
      
      .project-description {
        color: #a0a0a0;
        font-size: 0.7rem;
        margin-bottom: 1rem;
        font-family: 'Press Start 2P', cursive;
        line-height: 1.6;
      }
      
      .project-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
      }
      
      .project-tag {
        background-color: #2a2a3a;
        color: #a0a0a0;
        font-size: 0.6rem;
        padding: 0.3rem 0.6rem;
        font-family: 'Press Start 2P', cursive;
      }
      
      .pixel-button {
        background-color: #ff3864;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        font-family: 'Press Start 2P', cursive;
        font-size: 0.6rem;
        cursor: pointer;
        position: relative;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        box-shadow: 0 4px 0 0 rgba(0, 0, 0, 0.3);
      }
      
      .pixel-button::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.1);
        transform: scaleX(0);
        transform-origin: right;
        transition: transform 0.3s ease;
      }
      
      .pixel-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 0 0 rgba(0, 0, 0, 0.3);
      }
      
      .pixel-button:hover::before {
        transform: scaleX(1);
        transform-origin: left;
      }
      
      .pixel-button:active {
        transform: translateY(4px);
        box-shadow: none;
      }
    `

    this.shadowRoot.appendChild(style)
  }
}

class ArtworkCarousel extends HTMLElement {
  constructor() {
    super()

    // Get template content
    const template = document.getElementById("artwork-carousel-template")
    const templateContent = template.content

    // Create shadow DOM
    this.attachShadow({ mode: "open" })
    this.shadowRoot.appendChild(templateContent.cloneNode(true))

    // Add styles
    const style = document.createElement("style")
    style.textContent = `
      :host {
        display: block;
      }
      
      .carousel-container {
        position: relative;
        width: 100%;
        max-width: 1000px;
        margin: 0 auto;
        overflow: hidden;
        min-height: 400px;
      }
      
      .carousel-track {
        display: flex;
        transition: transform 0.5s ease;
        min-height: 400px;
      }
      
      ::slotted(.carousel-item) {
        min-width: 100%;
        position: relative;
        min-height: 400px;
      }
      
      ::slotted(.carousel-item img) {
        width: 100%;
        height: 400px;
        object-fit: cover;
        image-rendering: pixelated;
      }
      
      ::slotted(.carousel-item .artwork-info) {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 1rem;
        background-color: rgba(10, 10, 18, 0.8);
        transform: translateY(100%);
        transition: transform 0.3s ease;
      }
      
      ::slotted(.carousel-item:hover .artwork-info) {
        transform: translateY(0);
      }
      
      .carousel-button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-color: rgba(10, 10, 18, 0.8);
        color: #e0e0e0;
        border: 4px solid #2a2a3a;
        width: 40px;
        height: 40px;
        font-size: 1rem;
        cursor: pointer;
        z-index: 10;
        transition: background-color 0.3s ease;
        font-family: 'Press Start 2P', cursive;
      }
      
      .carousel-button:hover {
        background-color: #ff3864;
      }
      
      .carousel-button.prev {
        left: 10px;
      }
      
      .carousel-button.next {
        right: 10px;
      }
      
      .carousel-dots {
        display: flex;
        justify-content: center;
        margin-top: 1rem;
        gap: 0.5rem;
      }
      
      .carousel-dot {
        width: 10px;
        height: 10px;
        background-color: #2a2a3a;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }
      
      .carousel-dot.active {
        background-color: #ff3864;
      }
    `

    this.shadowRoot.appendChild(style)

    // Initialize carousel
    this.currentIndex = 0
    this.track = this.shadowRoot.querySelector(".carousel-track")
    this.prevButton = this.shadowRoot.querySelector(".carousel-button.prev")
    this.nextButton = this.shadowRoot.querySelector(".carousel-button.next")
    this.dotsContainer = this.shadowRoot.querySelector(".carousel-dots")

    // Wait for slotted elements to be available
    this.shadowRoot.querySelector("slot").addEventListener("slotchange", () => {
      this.initCarousel()
    })
  }

  initCarousel() {
    // Get all carousel items
    this.items = Array.from(this.querySelectorAll(".carousel-item"))

    if (this.items.length === 0) return

    // Create dots
    this.dotsContainer.innerHTML = ""
    this.items.forEach((_, index) => {
      const dot = document.createElement("div")
      dot.className = "carousel-dot" + (index === 0 ? " active" : "")
      dot.addEventListener("click", () => this.goToSlide(index))
      this.dotsContainer.appendChild(dot)
    })

    // Add event listeners
    this.prevButton.addEventListener("click", () => this.prevSlide())
    this.nextButton.addEventListener("click", () => this.nextSlide())

    // Update display
    this.updateCarousel()
  }

  updateCarousel() {
    // Update track position
    this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`

    // Update dots
    const dots = this.shadowRoot.querySelectorAll(".carousel-dot")
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentIndex)
    })
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length
    this.updateCarousel()
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length
    this.updateCarousel()
  }

  goToSlide(index) {
    this.currentIndex = index
    this.updateCarousel()
  }
}

// Register Web Components
customElements.define("project-card", ProjectCard)
customElements.define("artwork-carousel", ArtworkCarousel)

// Navigation Active State
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("nav a")
  const sections = document.querySelectorAll("section")

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 100,
          behavior: "smooth",
        })
      }
    })
  })

  // Update active nav link on scroll
  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })

  // Form submission
  const contactForm = document.querySelector(".contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Simulate form submission
      const submitButton = contactForm.querySelector('button[type="submit"]')
      const originalText = submitButton.textContent

      submitButton.textContent = "Sending..."
      submitButton.disabled = true

      setTimeout(() => {
        alert("Message sent successfully!")
        contactForm.reset()
        submitButton.textContent = originalText
        submitButton.disabled = false
      }, 1500)
    })
  }

  // Pixel art animation effects
  const pixelElements = document.querySelectorAll(".pixel-button, .avatar, .social-link")

  pixelElements.forEach((element) => {
    element.addEventListener("mouseover", () => {
      element.style.transition = "transform 0.1s steps(2)"
    })

    element.addEventListener("mouseout", () => {
      element.style.transition = "transform 0.3s ease"
    })
  })
})

// Pixel Particle Animation
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("pixelCanvas")
  const ctx = canvas.getContext("2d")

  // Set canvas to full screen
  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  resizeCanvas()
  window.addEventListener("resize", resizeCanvas)

  // Particle class
  class PixelParticle {
    constructor() {
      this.reset()
      // Start particles at random positions
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
    }

    reset() {
      // Pixel size (actual rendered size will be this × pixelRatio)
      this.size = Math.floor(Math.random() * 4) + 2

      // Random position when reset
      this.x = 0
      this.y = Math.random() * canvas.height

      // Random velocity
      this.vx = Math.random() * 1 + 0.5
      this.vy = Math.random() * 1 - 0.5

      // Random colors - pixel art palette
      const colors = [
        "#ff3864", // accent-primary
        "#2de2e6", // accent-secondary
        "#7a04eb", // accent-tertiary
        "#fcee09", // yellow
        "#44bba4", // teal
        "#e71d36", // red
        "#ff9f1c", // orange
      ]
      this.color = colors[Math.floor(Math.random() * colors.length)]

      // Random opacity
      this.alpha = Math.random() * 0.6 + 0.2

      // Random lifespan
      this.life = Math.random() * 100 + 100
      this.maxLife = this.life
    }

    update() {
      // Move particle
      this.x += this.vx
      this.y += this.vy

      // Decrease life
      this.life--

      // Reset if off screen or life ended
      if (this.x > canvas.width || this.y < 0 || this.y > canvas.height || this.life <= 0) {
        this.reset()
      }
    }

    draw() {
      // Set opacity based on life
      ctx.globalAlpha = this.alpha * (this.life / this.maxLife)

      // Draw pixel (as a rectangle)
      ctx.fillStyle = this.color
      ctx.fillRect(Math.floor(this.x), Math.floor(this.y), this.size, this.size)

      // Reset global alpha
      ctx.globalAlpha = 1
    }
  }

  // Create particles
  const particles = []
  const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 10000))

  for (let i = 0; i < particleCount; i++) {
    particles.push(new PixelParticle())
  }

  // Animation loop
  function animate() {
    // Clear canvas with semi-transparent background to create trail effect
    ctx.fillStyle = "rgba(10, 10, 18, 0.1)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Update and draw particles
    particles.forEach((particle) => {
      particle.update()
      particle.draw()
    })

    // Request next frame
    requestAnimationFrame(animate)
  }

  // Start animation
  animate()
})

