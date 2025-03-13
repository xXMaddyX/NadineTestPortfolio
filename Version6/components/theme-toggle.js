class ThemeToggle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.isDarkTheme = true; // Default to dark theme
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }
        
        .theme-toggle {
          background: var(--bg-secondary);
          border: none;
          width: 60px;
          height: 30px;
          border-radius: 15px;
          position: relative;
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          align-items: center;
          padding: 0 5px;
          justify-content: space-between;
        }
        
        .toggle-icon {
          font-size: 14px;
          z-index: 1;
        }
        
        .toggle-thumb {
          position: absolute;
          left: 3px;
          top: 3px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--accent-primary);
          transition: var(--transition);
        }
        
        .theme-toggle.light .toggle-thumb {
          left: 33px;
          background: var(--accent-tertiary);
        }
      </style>
      
      <button class="theme-toggle ${this.isDarkTheme ? '' : 'light'}" aria-label="Toggle theme">
        <span class="toggle-icon">🌙</span>
        <span class="toggle-icon">☀️</span>
        <span class="toggle-thumb"></span>
      </button>
    `;
  }

  addEventListeners() {
    const toggleBtn = this.shadowRoot.querySelector('.theme-toggle');
    
    toggleBtn.addEventListener('click', () => {
      this.isDarkTheme = !this.isDarkTheme;
      
      if (this.isDarkTheme) {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        toggleBtn.classList.remove('light');
      } else {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        toggleBtn.classList.add('light');
      }
    });
  }
}

customElements.define('theme-toggle', ThemeToggle);