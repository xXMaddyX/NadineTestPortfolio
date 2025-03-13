// Custom Element for Project Cards
class ProjectCard extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  connectedCallback() {
    const image = this.getAttribute("image") || ""
    const title = this.getAttribute("title") || ""
    const category = this.getAttribute("category") || ""
    const description = this.getAttribute("description") || ""
    const projectLink = this.getAttribute("projectLink") || "#"

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          margin-bottom: 20px;
        }
        
        .project-card {
          overflow: hidden;
          box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.5);
          transition: all 0.2s steps(5);
          background-color: #4a4a4a;
          border: 4px solid #555555;
          position: relative;
        }
        
        .project-card:hover {
          transform: translateY(-8px);
          box-shadow: 12px 12px 0 rgba(0, 0, 0, 0.5);
          border-color: #ff7f50;
        }
        
        .project-image {
          position: relative;
          padding-bottom: 60%;
          overflow: hidden;
          border-bottom: 4px solid #555555;
        }
        
        .project-image img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          image-rendering: pixelated;
        }
        
        .project-content {
          padding: 20px;
          font-family: 'Courier New', monospace;
        }
        
        .project-category {
          display: inline-block;
          font-size: 0.7rem;
          text-transform: uppercase;
          color: #ff7f50;
          font-weight: 600;
          margin-bottom: 10px;
          letter-spacing: 1px;
        }
        
        .project-title {
          font-size: 1.2rem;
          margin-bottom: 15px;
          color: #ffffff;
        }
        
        .project-description {
          color: #cccccc;
          margin-bottom: 20px;
          font-size: 0.8rem;
          line-height: 1.6;
        }
        
        .project-link {
          color: #ff7f50;
          font-weight: 600;
          display: inline-block;
          position: relative;
          text-transform: uppercase;
          font-size: 0.7rem;
          letter-spacing: 1px;
          padding: 4px 8px;
          border: 2px solid #ff7f50;
          text-decoration: none;
        }
        
        .project-link:hover {
          background-color: #ff7f50;
          color: #000000;
        }
      </style>
      
      <div class="project-card">
        <div class="project-image">
          <img src="${image}" alt="${title}">
        </div>
        <div class="project-content">
          <span class="project-category">${category}</span>
          <h3 class="project-title">${title}</h3>
          <p class="project-description">${description}</p>
          <a href="${projectLink}" class="project-link" target="_blank">Details ansehen</a>
        </div>
      </div>
    `
  }
}

// Register the custom element
customElements.define("project-card", ProjectCard)


