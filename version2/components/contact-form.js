class ContactForm extends HTMLElement {
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
      }
      
      .contact-container {
        display: flex;
        gap: 40px;
        flex-wrap: wrap;
      }
      
      .contact-info {
        flex: 1;
        min-width: 300px;
      }
      
      .contact-form {
        flex: 2;
        min-width: 300px;
      }
      
      .info-item {
        margin-bottom: 30px;
        display: flex;
        align-items: flex-start;
        gap: 15px;
      }
      
      .info-icon {
        color: #00e436;
        flex-shrink: 0;
        margin-top: 5px;
        background-color: #222034;
        padding: 8px;
        border: 2px solid #111111;
        box-shadow: 2px 2px 0px #111111;
      }
      
      .info-content h3 {
        margin-bottom: 10px;
        font-family: 'Press Start 2P', cursive;
        font-size: 0.9rem;
        color: #faef5d;
        text-shadow: 2px 2px 0px #111111;
      }
      
      .info-content p {
        color: white;
        font-size: 0.8rem;
        line-height: 1.6;
        font-family: 'Press Start 2P', cursive;
      }
      
      .form-group {
        margin-bottom: 20px;
      }
      
      label {
        display: block;
        margin-bottom: 10px;
        font-family: 'Press Start 2P', cursive;
        font-size: 0.8rem;
        color: #faef5d;
      }
      
      input, textarea, select {
        width: 100%;
        padding: 12px 15px;
        background-color: #222034;
        border: 4px solid #111111;
        color: white;
        font-family: 'Press Start 2P', cursive;
        font-size: 0.8rem;
        transition: border-color 0.3s ease, box-shadow 0.3s ease;
        box-shadow: 4px 4px 0px #111111;
      }
      
      input:focus, textarea:focus, select:focus {
        outline: none;
        border-color: #ff004d;
      }
      
      textarea {
        min-height: 150px;
        resize: vertical;
      }
      
      .submit-btn {
        background-color: #ff004d;
        border: 4px solid #111111;
        color: white;
        padding: 12px 30px;
        font-size: 1rem;
        font-family: 'Press Start 2P', cursive;
        cursor: pointer;
        transition: transform 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 1px;
        position: relative;
        box-shadow: 4px 4px 0px #111111;
      }
      
      .submit-btn:hover {
        transform: translateY(-4px);
        box-shadow: 4px 8px 0px #111111;
      }
      
      .form-row {
        display: flex;
        gap: 20px;
      }
      
      .form-row .form-group {
        flex: 1;
      }
      
      .message {
        padding: 15px;
        margin-bottom: 20px;
        border: 4px solid #111111;
        display: none;
        font-family: 'Press Start 2P', cursive;
        font-size: 0.8rem;
        box-shadow: 4px 4px 0px #111111;
      }
      
      .success {
        background-color: #00e436;
        color: #111111;
      }
      
      .error {
        background-color: #ff004d;
        color: white;
      }
      
      @media (max-width: 768px) {
        .form-row {
          flex-direction: column;
          gap: 0;
        }
        
        .info-content h3 {
          font-size: 0.8rem;
        }
        
        .info-content p {
          font-size: 0.7rem;
        }
        
        label, input, textarea, select {
          font-size: 0.7rem;
        }
        
        .submit-btn {
          font-size: 0.8rem;
          padding: 10px 20px;
        }
      }
    </style>
    
    <div class="contact-container">
      <div class="contact-info">
        <div class="info-item">
          <div class="info-icon">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
            </svg>
          </div>
          <div class="info-content">
            <h3>Location</h3>
            <p>Digital Studio, Tech Hub<br>San Francisco, CA 94105</p>
          </div>
        </div>
        
        <div class="info-item">
          <div class="info-icon">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
            </svg>
          </div>
          <div class="info-content">
            <h3>Email</h3>
            <p>contact@pixelmaster.com<br>support@pixelmaster.com</p>
          </div>
        </div>
        
        <div class="info-item">
          <div class="info-icon">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" />
            </svg>
          </div>
          <div class="info-content">
            <h3>Phone</h3>
            <p>+1 (555) 123-4567<br>+1 (555) 987-6543</p>
          </div>
        </div>
      </div>
      
      <div class="contact-form">
        <div class="message success">Your message has been sent successfully!</div>
        <div class="message error">There was an error sending your message. Please try again.</div>
        
        <form id="contactForm">
          <div class="form-row">
            <div class="form-group">
              <label for="name">Your Name</label>
              <input type="text" id="name" name="name" required>
            </div>
            
            <div class="form-group">
              <label for="email">Your Email</label>
              <input type="email" id="email" name="email" required>
            </div>
          </div>
          
          <div class="form-group">
            <label for="subject">Subject</label>
            <input type="text" id="subject" name="subject" required>
          </div>
          
          <div class="form-group">
            <label for="service">Service Interested In</label>
            <select id="service" name="service">
              <option value="game-assets">Game Assets</option>
              <option value="pixel-illustrations">Pixel Illustrations</option>
              <option value="animation">Animation</option>
              <option value="tutorials">Pixel Art Tutorials</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="message">Your Message</label>
            <textarea id="message" name="message" required></textarea>
          </div>
          
          <button type="submit" class="submit-btn">Send Message</button>
        </form>
      </div>
    </div>
    `
  }

  setupEventListeners() {
    const form = this.shadowRoot.querySelector("#contactForm")
    const successMessage = this.shadowRoot.querySelector(".message.success")
    const errorMessage = this.shadowRoot.querySelector(".message.error")

    form.addEventListener("submit", (e) => {
      e.preventDefault()

      // Simulate form submission
      const formData = new FormData(form)
      const formValues = Object.fromEntries(formData.entries())

      // Validate form
      if (this.validateForm(formValues)) {
        // Simulate successful submission
        successMessage.style.display = "block"
        errorMessage.style.display = "none"
        form.reset()

        // Hide success message after 5 seconds
        setTimeout(() => {
          successMessage.style.display = "none"
        }, 5000)
      } else {
        // Show error message
        errorMessage.style.display = "block"
        successMessage.style.display = "none"

        // Hide error message after 5 seconds
        setTimeout(() => {
          errorMessage.style.display = "none"
        }, 5000)
      }
    })
  }

  validateForm(values) {
    // Simple validation
    if (!values.name || !values.email || !values.subject || !values.message) {
      return false
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(values.email)) {
      return false
    }

    return true
  }
}

customElements.define("contact-form", ContactForm)

