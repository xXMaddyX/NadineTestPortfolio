// Main JavaScript file for the portfolio

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', () => {
  // Initialize placeholder images for development
  const placeholderImages = document.querySelectorAll('img');
  placeholderImages.forEach(img => {
    if (!img.src || img.src.includes('assets/')) {
      // Create placeholder images with different colors for different sections
      let color = '4ecdc4';
      if (img.src.includes('artwork')) {
        // Use different colors for artwork based on ID
        const id = img.src.split('-').pop().split('.')[0];
        const colors = ['ff6b6b', 'ffd166', '4ecdc4', '1a535c', 'f7b267', '3a86ff'];
        color = colors[id % colors.length] || '4ecdc4';
      } else if (img.src.includes('hero')) {
        color = 'ff6b6b';
      } else if (img.src.includes('avatar')) {
        color = 'ffd166';
      }
      
      const width = img.width || 400;
      const height = img.height || 300;
      img.src = `https://via.placeholder.com/${width}x${height}/${color}/ffffff?text=Pixel+Art`;
    }
  });

  // Handle intersection observer for scroll animations
  const sections = document.querySelectorAll('section');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        
        // Update active nav link
        const id = entry.target.getAttribute('id');
        document.querySelectorAll('nav-bar a').forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    observer.observe(section);
  });
});