class ArtModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.artwork = null;
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
    
    // Listen for custom event to open modal
    document.addEventListener('open-artwork-modal', (e) => {
      this.artwork = e.detail;
      this.openModal();
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2000;
          opacity: 0;
          pointer-events: none;
          transition: var(--transition);
        }
        
        .modal.active {
          opacity: 1;
          pointer-events: all;
        }
        
        .modal-content {
          background-color: var(--bg-secondary);
          border-radius: var(--border-radius);
          max-width: 800px;
          width: 90%;
          max-height: 90vh;
          overflow: auto;
          position: relative;
          transform: translateY(50px);
          transition: var(--transition);
        }
        
        .modal.active .modal-content {
          transform: translateY(0);
        }
        
        .modal-image {
          width: 100%;
          height: auto;
          display: block;
        }
        
        .modal-details {
          padding: 2rem;
        }
        
        .modal-category {
          display: inline-block;
          background: var(--accent-secondary);
          color: var(--bg-primary);
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          margin-bottom: 1rem;
        }
        
        .close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: var(--accent-primary);
          border: none;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          color: white;
          font-weight: bold;
          transition: var(--transition);
        }
        
        .close-btn:hover {
          background: var(--accent-secondary);
          transform: rotate(90deg);
        }
      </style>
      
      <div class="modal">
        <div class="modal-content">
          <button class="close-btn">✕</button>
          <img class="modal-image" src="/placeholder.svg" alt="">
          <div class="modal-details">
            <span class="modal-category"></span>
            <h2 class="modal-title"></h2>
            <p class="modal-description"></p>
          </div>
        </div>
      </div>
    `;
  }

  addEventListeners() {
    const modal = this.shadowRoot.querySelector('.modal');
    const closeBtn = this.shadowRoot.querySelector('.close-btn');
    
    closeBtn.addEventListener('click', () => {
      this.closeModal();
    });
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeModal();
      }
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
      }
    });
  }
  
  openModal() {
    if (!this.artwork) return;
    
    const modal = this.shadowRoot.querySelector('.modal');
    const image = this.shadowRoot.querySelector('.modal-image');
    const title = this.shadowRoot.querySelector('.modal-title');
    const description = this.shadowRoot.querySelector('.modal-description');
    const category = this.shadowRoot.querySelector('.modal-category');
    
    image.src = this.artwork.image;
    image.alt = this.artwork.title;
    title.textContent = this.artwork.title;
    description.textContent = this.artwork.description;
    category.textContent = this.artwork.category;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  closeModal() {
    const modal = this.shadowRoot.querySelector('.modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

customElements.define('art-modal', ArtModal);