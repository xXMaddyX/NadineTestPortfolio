// Main JavaScript file for the Pixel Artist Portfolio

// Smooth scrolling for anchor links
document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Animate elements on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".section-title, .about-content, .services-grid, .service-card")

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementPosition < windowHeight * 0.8) {
        element.classList.add("animate")
      }
    })
  }

  // Initial check for elements in view
  animateOnScroll()

  // Check on scroll
  window.addEventListener("scroll", animateOnScroll)

  // Pixel animation effect for hero section
  const createPixelEffect = () => {
    const hero = document.querySelector("#hero")
    const pixelContainer = document.createElement("div")
    pixelContainer.classList.add("pixel-effect")

    // Add pixel effect styles
    const style = document.createElement("style")
    style.textContent = `
    .pixel-effect {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
    }
    
    .pixel {
      position: absolute;
      width: 8px;
      height: 8px;
      background-color: #ff004d;
      animation: float 10s steps(10) infinite;
      image-rendering: pixelated;
    }
    
    @keyframes float {
      0% {
        transform: translateY(0) translateX(0);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100vh) translateX(20px);
        opacity: 0;
      }
    }
  `

    document.head.appendChild(style)
    hero.appendChild(pixelContainer)

    // Create pixels
    const createPixel = () => {
      const pixel = document.createElement("div")
      pixel.classList.add("pixel")

      // Random position
      const posX = Math.random() * 100
      pixel.style.left = `${posX}%`
      pixel.style.bottom = "0"

      // Random size (only 8px, 16px, or 24px to maintain pixel art look)
      const sizes = [8, 16, 24]
      const size = sizes[Math.floor(Math.random() * sizes.length)]
      pixel.style.width = `${size}px`
      pixel.style.height = `${size}px`

      // Random color (use pixel art palette)
      const colors = ["#ff004d", "#00e436", "#faef5d", "#29adff", "#ff77a8"]
      pixel.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]

      // Random animation duration (in steps for pixel art feel)
      const duration = Math.random() * 15 + 10
      pixel.style.animation = `float ${duration}s steps(10) infinite`

      pixelContainer.appendChild(pixel)

      // Remove pixel after animation
      setTimeout(() => {
        pixel.remove()
      }, duration * 1000)
    }

    // Create pixels at intervals
    setInterval(createPixel, 300)
  }

  createPixelEffect()
})

