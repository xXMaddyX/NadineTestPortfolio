document.addEventListener("DOMContentLoaded", () => {
  // Update logo and title for Nadine Höhn
  const logoText = document.querySelector(".logo h1")
  if (logoText) {
    logoText.innerHTML = "Nadine<span>@Pixel Art</span>"
  }

  const footerLogo = document.querySelector(".footer-logo h2")
  if (footerLogo) {
    footerLogo.innerHTML = "Nadine<span>@Pixel Art</span>"
  }

  const footerDesc = document.querySelector(".footer-logo p")
  if (footerDesc) {
    footerDesc.textContent =
      "2D Pixel Art Digital Artist aus Mainz. Spezialisiert auf Character Design, Environments, Animations und Game Assets."
  }

  const heroTitle = document.querySelector(".hero-content h1")
  if (heroTitle) {
    heroTitle.innerHTML = "2D Pixel Art <span>Digital Artist</span>"
  }

  const heroDesc = document.querySelector(".hero-content p")
  if (heroDesc) {
    heroDesc.textContent =
      "Digital Artist aus Mainz mit Leidenschaft für Pixel Art. Spezialisiert auf Character Design, Environments, Animations und Game Assets für 2D Games."
  }

  // Add grid background to sections
  const sections = document.querySelectorAll("section, footer")
  sections.forEach((section) => {
    const gridBg = document.createElement("div")
    gridBg.classList.add("grid-bg")
    section.appendChild(gridBg)
  })

  // Mobile menu toggle
  const menuToggle = document.querySelector(".mobile-menu-toggle")
  const navLinks = document.querySelector(".nav-links")

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active")
      document.body.classList.toggle("menu-open")

      // Toggle hamburger animation
      const spans = menuToggle.querySelectorAll("span")
      spans.forEach((span) => span.classList.toggle("active"))
    })
  }

  // Navigation active state based on scroll position
  const navItems = document.querySelectorAll(".nav-links a")

  function setActiveNavItem() {
    let currentSection = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        currentSection = section.getAttribute("id")
      }
    })

    navItems.forEach((item) => {
      item.classList.remove("active")
      if (item.getAttribute("href") === `#${currentSection}`) {
        item.classList.add("active")
      }
    })
  }

  window.addEventListener("scroll", setActiveNavItem)

  // Project filtering
  const filterButtons = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll("project-card")

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      button.classList.add("active")

      const filter = button.getAttribute("data-filter")

      // Filter projects
      projectCards.forEach((card) => {
        const category = card.getAttribute("category")

        if (filter === "all" || filter === category) {
          card.style.display = "block"
          setTimeout(() => {
            card.style.opacity = "1"
            card.style.transform = "scale(1)"
          }, 10)
        } else {
          card.style.opacity = "0"
          card.style.transform = "scale(0.8)"
          setTimeout(() => {
            card.style.display = "none"
          }, 300)
        }
      })
    })
  })

  // Animate skill bars when in viewport
  const skillLevels = document.querySelectorAll(".skill-level")
  const skillNames = document.querySelectorAll(".skill-name")

  // Add data-level attribute to skill names
  skillLevels.forEach((level, index) => {
    const skillValue = level.getAttribute("data-level")
    if (skillNames[index]) {
      skillNames[index].setAttribute("data-level", skillValue)
    }
  })

  function animateSkillBars() {
    skillLevels.forEach((level) => {
      const skillsSection = document.querySelector(".skills")
      const sectionPosition = skillsSection.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.3

      if (sectionPosition < screenPosition) {
        const skillValue = level.getAttribute("data-level")
        level.style.width = skillValue
      }
    })
  }

  window.addEventListener("scroll", animateSkillBars)

  // Form submission (prevent default)
  const emailBtn = document.getElementById("email-btn")

  emailBtn.addEventListener("click", () => {
    window.location.href = `mailto:maddyaion@hotmail.de`
  })

  // Add pixel art cursor trail effect
  function createPixelCursorTrail() {
    const trail = document.createElement("div")
    trail.className = "cursor-trail"
    document.body.appendChild(trail)

    const dots = []
    const numDots = 10

    for (let i = 0; i < numDots; i++) {
      const dot = document.createElement("div")
      dot.className = "trail-dot"
      dot.style.width = `${8 - i * 0.5}px`
      dot.style.height = `${8 - i * 0.5}px`
      dot.style.opacity = 1 - i * 0.1
      dot.style.backgroundColor = i % 2 === 0 ? "#ff7f50" : "#8a2be2"
      dot.style.position = "absolute"
      dot.style.pointerEvents = "none"
      dot.style.zIndex = "9999"
      trail.appendChild(dot)
      dots.push({
        el: dot,
        x: 0,
        y: 0,
      })
    }

    let mouseX = 0
    let mouseY = 0

    document.addEventListener("mousemove", (e) => {
      mouseX = Math.floor(e.clientX / 8) * 8 // Snap to 8px grid for pixelated movement
      mouseY = Math.floor(e.clientY / 8) * 8
    })

    function updateTrail() {
      dots.forEach((dot, index) => {
        if (index === 0) {
          dot.x = mouseX
          dot.y = mouseY
        } else {
          dot.x += (dots[index - 1].x - dot.x) * 0.5
          dot.y += (dots[index - 1].y - dot.y) * 0.5

          // Snap to pixel grid
          dot.x = Math.floor(dot.x / 4) * 4
          dot.y = Math.floor(dot.y / 4) * 4
        }
        dot.el.style.left = `${dot.x}px`
        dot.el.style.top = `${dot.y}px`
      })
      requestAnimationFrame(updateTrail)
    }

    updateTrail()
  }

  // Only create cursor trail on non-touch devices
  if (!("ontouchstart" in window)) {
    createPixelCursorTrail()
  }

  // Initialize animations
  animateSkillBars()
  setActiveNavItem()

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      // Close mobile menu if open
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active")
        document.body.classList.remove("menu-open")

        const spans = menuToggle.querySelectorAll("span")
        spans.forEach((span) => span.classList.remove("active"))
      }

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight
        const targetPosition = targetElement.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Add pixel art particles
  function createPixelParticles() {
    const canvas = document.createElement("canvas")
    canvas.className = "game-particles"
    canvas.style.position = "fixed"
    canvas.style.top = "0"
    canvas.style.left = "0"
    canvas.style.width = "100%"
    canvas.style.height = "100%"
    canvas.style.pointerEvents = "none"
    canvas.style.zIndex = "0"
    canvas.style.opacity = "0.3"
    document.body.appendChild(canvas)

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const ctx = canvas.getContext("2d")
    ctx.imageSmoothingEnabled = false // Disable anti-aliasing for pixel art

    const particles = []
    const particleCount = 30
    const pixelSize = 4

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.floor((Math.random() * canvas.width) / pixelSize) * pixelSize,
        y: Math.floor((Math.random() * canvas.height) / pixelSize) * pixelSize,
        size: pixelSize,
        speedX: 0,
        speedY: Math.random() * 0.5 + 0.2,
        color: i % 3 === 0 ? "#ff7f50" : i % 3 === 1 ? "#8a2be2" : "#32cd32",
      })
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        ctx.fillStyle = particle.color
        ctx.fillRect(particle.x, particle.y, particle.size, particle.size)

        // Update position
        particle.y += particle.speedY

        // Wrap around screen
        if (particle.y > canvas.height) {
          particle.y = -particle.size
          particle.x = Math.floor((Math.random() * canvas.width) / pixelSize) * pixelSize
        }
      })

      requestAnimationFrame(drawParticles)
    }

    drawParticles()

    // Resize canvas when window is resized
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      ctx.imageSmoothingEnabled = false
    })
  }

  createPixelParticles()

  // Update skill names for a digital artist
  const skillNamesElements = document.querySelectorAll(".skill-name")
  const skillLevelsData = document.querySelectorAll(".skill-level")

  const artistSkills = [
    { name: "Character Design", level: "92%" },
    { name: "Environment Art", level: "88%" },
    { name: "Animation", level: "85%" },
    { name: "Game Assets", level: "90%" },
    { name: "Pixel Art", level: "95%" },
    { name: "Color Theory", level: "87%" },
    { name: "Aseprite", level: "93%" },
    { name: "Game Design", level: "80%" },
    { name: "Unity Integration", level: "75%" },
    { name: "Godot Integration", level: "78%" },
  ]

  skillNamesElements.forEach((skillName, index) => {
    if (index < artistSkills.length && skillLevelsData[index]) {
      skillName.textContent = artistSkills[index].name
      skillName.setAttribute("data-level", artistSkills[index].level)
      skillLevelsData[index].setAttribute("data-level", artistSkills[index].level)
    }
  })

  // Update about section text
  const aboutTitle = document.querySelector(".about-text h3")
  if (aboutTitle) {
    aboutTitle.textContent = "2D Pixel Art Digital Artist"
  }

  const aboutParagraphs = document.querySelectorAll(".about-text p")
  if (aboutParagraphs.length >= 3) {
    aboutParagraphs[0].textContent =
      "Als leidenschaftliche Pixel Art Künstlerin erschaffe ich detaillierte digitale Welten mit einem nostalgischen Retro-Feeling und modernem Twist."
    aboutParagraphs[1].textContent =
      "Meine Reise begann mit der Liebe zu klassischen Videospielen und führte mich zur Erstellung von Character Designs, Environments und Animationen für Indie-Spiele und digitale Medien."
    aboutParagraphs[2].textContent =
      "Ich strebe danach, durch meine Pixel Art Emotionen zu wecken und Geschichten zu erzählen. Jedes Pixel wird mit Bedacht platziert, um lebendige und ausdrucksstarke Kunstwerke zu schaffen."
  }

  // Update details
  const detailValues = document.querySelectorAll(".detail .value")
  if (detailValues.length >= 4) {
    detailValues[0].textContent = "Nadine Höhn"
    detailValues[2].textContent = "2D Pixel Art & Game Assets"
  }
})

