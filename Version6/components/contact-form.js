class ContactForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
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
          max-width: 600px;
          margin: 0 auto;
        }
        
        .form-container {
          background-color: var(--bg-secondary);
          padding: 2rem;
          border-radius: var(--border-radius);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
        
        input, textarea {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid transparent;
          background-color: var(--bg-primary);
          color: var(--text-primary);
          border-radius: var(--border-radius);
          font-family: inherit;
          font-size: 1rem;
          transition: var(--transition);
        }
        
        input:focus, textarea:focus {
          outline: none;
          border-color: var(--accent-primary);
        }
        
        textarea {
          min-height: 150px;
          resize: vertical;
        }
        
        button {
          background-color: var(--accent-primary);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          border-radius: var(--border-radius);
          cursor: pointer;
          transition: var(--transition);
        }
        
        button:hover {
          background-color: var(--accent-secondary);
          transform: translateY(-3px);
        }
        
        .success-message {
          background-color: var(--accent-secondary);
          color: white;
          padding: 1rem;
          border-radius: var(--border-radius);
          margin-top: 1rem;
          display: none;
        }
        
        .success-message.active {
          display: block;
        }
        
        .error-message {
          color: var(--accent-primary);
          font-size: 0.875rem;
          margin-top: 0.5rem;
          display: none;
        }
        
        .error-message.active {
          display: block;
        }
      </style>
      
      <div class="form-container">
        <form id="contact-form">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" required>
            <div class="error-message" id="name-error">Please enter your name</div>
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
            <div class="error-message" id="email-error">Please enter a valid email address</div>
          </div>
          
          <div class="form-group">
            <label for="subject">Subject</label>
            <input type="text" id="subject" name="subject" required>
            <div class="error-message" id="subject-error">Please enter a subject</div>
          </div>
          
          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" name="message" required></textarea>
            <div class="error-message" id="message-error">Please enter your message</div>
          </div>
          
          <button type="submit">Send Message</button>
        </form>
        
        <div class="success-message">
          Thank you for your message! I'll get back to you soon.
        </div>
      </div>
    `;
  }

  addEventListeners() {
    const form = this.shadowRoot.querySelector('#contact-form');
    const successMessage = this.shadowRoot.querySelector('.success-message');
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (this.validateForm()) {
        // In a real application, you would send the form data to a server here
        // For this example, we'll just show the success message
        form.style.display = 'none';
        successMessage.classList.add('active');
        
        // Reset form after 5 seconds
        setTimeout(() => {
          form.reset();
          form.style.display = 'block';
          successMessage.classList.remove('active');
        }, 5000);
      }
    });
  }
  
  validateForm() {
    const name = this.shadowRoot.querySelector('#name');
    const email = this.shadowRoot.querySelector('#email');
    const subject = this.shadowRoot.querySelector('#subject');
    const message = this.shadowRoot.querySelector('#message');
    
    const nameError = this.shadowRoot.querySelector('#name-error');
    const emailError = this.shadowRoot.querySelector('#email-error');
    const subjectError = this.shadowRoot.querySelector('#subject-error');
    const messageError = this.shadowRoot.querySelector('#message-error');
    
    let isValid = true;
    
    // Reset errors
    nameError.classList.remove('active');
    emailError.classList.remove('active');
    subjectError.classList.remove('active');
    messageError.classList.remove('active');
    
    // Validate name
    if (!name.value.trim()) {
      nameError.classList.add('active');
      isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value)) {
      emailError.classList.add('active');
      isValid = false;
    }
    
    // Validate subject
    if (!subject.value.trim()) {
      subjectError.classList.add('active');
      isValid = false;
    }
    
    // Validate message
    if (!message.value.trim()) {
      messageError.classList.add('active');
      isValid = false;
    }
    
    return isValid;
  }
}

customElements.define('contact-form', ContactForm);