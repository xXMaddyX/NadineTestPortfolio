class ArtGallery extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.artworks = [
      { id: 1, title: 'Forest Scene', description: 'A peaceful forest environment with animated details.', image: 'assets/artwork-1.png', category: 'Environment' },
      { id: 2, title: 'Character Design', description: 'Main character sprite sheet with various animations.', image: 'assets/artwork-2.png', category: 'Character' },
      { id: 3, title: 'Game UI', description: 'Complete UI kit for a retro-style RPG game.', image: 'assets/artwork-3.png', category: 'UI' },
      { id: 4, title: 'Dungeon Tileset', description: 'Modular tileset for creating dungeon levels.', image: 'assets/artwork-4.png', category: 'Environment' },
      { id: 5, title: 'Boss Character', description: 'Final boss design with attack animations.', image: 'assets/artwork-5.png', category: 'Character' },
      { id: 6, title: 'Item Icons', description: 'Collection of item and inventory icons.', image: 'assets/artwork-6.png', category: 'UI' }
    ];
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
          width: 100%;
        }
        
        .gallery-filters {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }
        
        .filter-btn {
          background: var(--bg-secondary);
          border: none;
          padding: 0.5rem 1.5rem;
          border-radius: var(--border-radius);
          color: var(--text-primary);
          cursor: pointer;
          transition: var(--transition);
        }
        
        .filter-btn.active {
          background: var(--accent-primary);
        }
        
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .gallery-item {
          background: var(--bg-secondary);
          border-radius: var(--border-radius);
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          transition: var(--transition);
          cursor: pointer;
        }
        
        .gallery-item:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        }
        
        .gallery-item img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
        }
        
        .gallery-item-content {
          padding: 1.5rem;
        }
        
        .gallery-item-content h3 {
          margin-bottom: 0.5rem;
        }
        
        .gallery-item-category {
          display: inline-block;
          background: var(--accent-secondary);
          color: var(--bg-primary);
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          margin-bottom: 1rem;
        }
        
        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }
        }
      </style>
      
      <div class="gallery-filters">
        <button class="filter-btn active" data-category="all">All</button>
        <button class="filter-btn" data-category="Environment">Environments</button>
        <button class="filter-btn" data-category="Character">Characters</button>
        <button class="filter-btn" data-category="UI">UI Elements</button>
      </div>
      
      <div class="gallery-grid">
        ${this.artworks.map(artwork => `
          <div class="gallery-item" data-id="${artwork.id}" data-category="${artwork.category}">
            <img src="${artwork.image}" alt="${artwork.title}">
            <div class="gallery-item-content">
              <span class="gallery-item-category">${artwork.category}</span>
              <h3>${artwork.title}</h3>
              <p>${artwork.description}</p>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  addEventListeners() {
    const filterButtons = this.shadowRoot.querySelectorAll('.filter-btn');
    const galleryItems = this.shadowRoot.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter gallery items
        const category = button.dataset.category;
        galleryItems.forEach(item => {
          if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
    
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const id = item.dataset.id;
        const artwork = this.artworks.find(art => art.id === parseInt(id));
        
        // Dispatch custom event to open modal
        const event = new CustomEvent('open-artwork-modal', {
          detail: artwork,
          bubbles: true,
          composed: true
        });
        
        this.dispatchEvent(event);
      });
    });
  }
}

customElements.define('art-gallery', ArtGallery);