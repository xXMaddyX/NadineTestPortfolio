class GalleryCarousel extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
    this.galleryItems = [
      { image: "/placeholder.svg?height=300&width=300", title: "Cyberpunk Character" },
      { image: "/placeholder.svg?height=300&width=300", title: "Fantasy Landscape" },
      { image: "/placeholder.svg?height=300&width=300", title: "Retro Game Scene" },
      { image: "/placeholder.svg?height=300&width=300", title: "Sci-Fi Interface" },
      { image: "/placeholder.svg?height=300&width=300", title: "Pixel Portrait" },
      { image: "/placeholder.svg?height=300&width=300", title: "Game Environment" },
      { image: "/placeholder.svg?height=300&width=300", title: "Character Animation" },
      { image: "/placeholder.svg?height=300&width=300", title: "Isometric Room" },
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
      }
      
      .gallery-container {
        position: relative;
        padding: 0 50px;
      }
      
      .gallery {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
        overflow: hidden;
      }
      
      .gallery-item {
        position: relative;
        overflow: hidden;
        cursor: pointer;
        transition: transform 0.3s ease;
        aspect-ratio: 1;
        border: 4px solid #111111;
        box-shadow: 4px 4px 0px #111111;
      }
      
      .gallery-item:hover {
        transform: scale(1.05) rotate(2deg);
        box-shadow: 8px 8px 0px #111111;
        z-index: 1;
      }
      
      .gallery-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: filter 0.3s ease;
        image-rendering: pixelated;
      }
      
      .gallery-item:hover img {
        filter: brightness(0.7);
      }
      
      .gallery-item-title {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 10px;
        background-color: #111111;
        color: white;
        font-family: 'Press Start 2P', cursive;
        font-size: 0.7rem;
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.3s ease, transform 0.3s ease;
      }
      
      .gallery-item:hover .gallery-item-title {
        opacity: 1;
        transform: translateY(0);
      }
      
      .control-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-color: #222034;
        border: 4px solid #111111;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background-color 0.3s ease;
        color: white;
        z-index: 2;
        box-shadow: 4px 4px 0px #111111;
      }
      
      .prev-btn {
        left: 0;
      }
      
      .next-btn {
        right: 0;
      }
      
      .control-btn:hover {
        background-color: #ff004d;
      }
      
      .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s steps(5);
      }
      
      .lightbox.active {
        opacity: 1;
        pointer-events: all;
      }
      
      .lightbox-content {
        max-width: 80%;
        max-height: 80%;
        position: relative;
        border: 8px solid #111111;
        box-shadow: 8px 8px 0px #111111;
        background-color: #3f3f74;
        padding: 10px;
      }
      
      .lightbox-image {
        max-width: 100%;
        max-height: 80vh;
        border: 4px solid #ff004d;
        image-rendering: pixelated;
      }
      
      .lightbox-title {
        position: absolute;
        bottom: -40px;
        left: 0;
        width: 100%;
        text-align: center;
        color: white;
        font-family: 'Press Start 2P', cursive;
        font-size: 0.8rem;
        text-shadow: 2px 2px 0px #111111;
      }
      
      .close-lightbox {
        position: absolute;
        top: -15px;
        right: -15px;
        background: #ff004d;
        border: 4px solid #111111;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      @media (max-width: 992px) {
        .gallery {
          grid-template-columns: repeat(3, 1fr);
        }
      }
      
      @media (max-width: 768px) {
        .gallery {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      
      @media (max-width: 480px) {
        .gallery {
          grid-template-columns: 1fr;
        }
        
        .gallery-container {
          padding: 0 30px;
        }
      }
    </style>
    
    <div class="gallery-container">
      <button class="control-btn prev-btn">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
        </svg>
      </button>
      
      <div class="gallery">
        ${this.galleryItems
          .map(
            (item) => `
          <div class="gallery-item" data-title="${item.title}">
            <img src="${item.image}" alt="${item.title}">
            <div class="gallery-item-title">${item.title}</div>
          </div>
        `,
          )
          .join("")}
      </div>
      
      <button class="control-btn next-btn">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
        </svg>
      </button>
      
      <div class="lightbox">
        <div class="lightbox-content">
          <img src="/placeholder.svg" alt="" class="lightbox-image">
          <div class="lightbox-title"></div>
        </div>
        <button class="close-lightbox">×</button>
      </div>
    </div>
  `
  }

  setupEventListeners() {
    const prevBtn = this.shadowRoot.querySelector(".prev-btn")
    const nextBtn = this.shadowRoot.querySelector(".next-btn")
    const galleryItems = this.shadowRoot.querySelectorAll(".gallery-item")
    const lightbox = this.shadowRoot.querySelector(".lightbox")
    const lightboxImage = this.shadowRoot.querySelector(".lightbox-image")
    const lightboxTitle = this.shadowRoot.querySelector(".lightbox-title")
    const closeLightbox = this.shadowRoot.querySelector(".close-lightbox")

    let currentPage = 0
    const itemsPerPage = this.getItemsPerPage()
    const totalPages = Math.ceil(this.galleryItems.length / itemsPerPage)

    const updateGallery = () => {
      const startIndex = currentPage * itemsPerPage
      const endIndex = startIndex + itemsPerPage

      galleryItems.forEach((item, index) => {
        if (index >= startIndex && index < endIndex) {
          item.style.display = "block"
        } else {
          item.style.display = "none"
        }
      })
    }

    prevBtn.addEventListener("click", () => {
      currentPage = (currentPage - 1 + totalPages) % totalPages
      updateGallery()
    })

    nextBtn.addEventListener("click", () => {
      currentPage = (currentPage + 1) % totalPages
      updateGallery()
    })

    galleryItems.forEach((item) => {
      item.addEventListener("click", () => {
        const imgSrc = item.querySelector("img").src
        const title = item.dataset.title

        lightboxImage.src = imgSrc
        lightboxTitle.textContent = title
        lightbox.classList.add("active")
      })
    })

    closeLightbox.addEventListener("click", () => {
      lightbox.classList.remove("active")
    })

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove("active")
      }
    })

    // Handle window resize
    window.addEventListener("resize", () => {
      const newItemsPerPage = this.getItemsPerPage()
      if (newItemsPerPage !== itemsPerPage) {
        currentPage = 0
        updateGallery()
      }
    })

    // Initial setup
    updateGallery()
  }

  getItemsPerPage() {
    const width = window.innerWidth
    if (width < 480) return 1
    if (width < 768) return 2
    if (width < 992) return 6
    return 8
  }
}

customElements.define("gallery-carousel", GalleryCarousel)

