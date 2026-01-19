// Function to load blog data from JSON and render it
async function loadBlogPosts() {
  try {
    // Fetch the blog data from JSON file
    const response = await fetch('../js/blog-data.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const blogPosts = await response.json();
    
    // Get the container where blog cards will be displayed
    const cardsContainer = document.querySelector('.cards');
    
    // Clear existing content
    if (cardsContainer) {
      cardsContainer.innerHTML = '';
      
      // Create and insert blog cards
      blogPosts.forEach((post) => {
        const article = document.createElement('article');
        article.className = 'card';
        
        // Build links HTML
        let linksHTML = '';
        if (post.links && post.links.length > 0) {
          post.links.forEach((link) => {
            linksHTML += `<a href="${link.url}" class="btn">${link.text}</a>`;
          });
        }
        
        // Set the article content
        // Supports all image formats: jpg, jpeg, png, gif, webp, etc.
        article.innerHTML = `
          ${post.image ? `<img src="${post.image}" alt="${post.title}" class="card-image" loading="lazy">` : ''}
          <h3>${post.title}</h3>
          <p>${post.info}</p>
          <div class="card-links">
            ${linksHTML}
          </div>
        `;
        
        cardsContainer.appendChild(article);
      });
    }
  } catch (error) {
    console.error('Error loading blog posts:', error);
    
    // Fallback message
    const cardsContainer = document.querySelector('.cards');
    if (cardsContainer) {
      cardsContainer.innerHTML = '<p>Unable to load blog posts. Please try again later.</p>';
    }
  }
}

// Load blog posts when the page is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadBlogPosts);
} else {
  loadBlogPosts();
}

// Toggle menu function
function toggleMenu() {
  const links = document.querySelector('.nav-links');
  if (!links) return;
  links.classList.toggle('active');
}
