// Function to load gallery images from JSON
async function loadGalleryImages() {
  try {
    // Fetch the gallery data from JSON file
    const response = await fetch('../js/gallery-data.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const galleryImages = await response.json();
    
    // Get the gallery container
    const galleryContainer = document.querySelector('.gallery');
    
    // Clear existing content
    if (galleryContainer) {
      galleryContainer.innerHTML = '';
      
      // Create and insert gallery images
      galleryImages.forEach((imageData) => {
        const img = document.createElement('img');
        img.src = imageData.image;
        img.alt = imageData.alt;
        img.loading = 'lazy';
        
        galleryContainer.appendChild(img);
      });
    }
  } catch (error) {
    console.error('Error loading gallery images:', error);
    
    // Fallback message
    const galleryContainer = document.querySelector('.gallery');
    if (galleryContainer) {
      galleryContainer.innerHTML = '<p>Unable to load gallery images. Please try again later.</p>';
    }
  }
}

// Load gallery images when the page is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadGalleryImages);
} else {
  loadGalleryImages();
}

// Toggle menu function
function toggleMenu() {
  const links = document.querySelector('.nav-links');
  if (!links) return;
  links.classList.toggle('active');
}
