export const useReveal = () => {
  const nuxtApp = useNuxtApp()

  const initReveal = () => {
    // Wait a frame for Vue to update the DOM
    requestAnimationFrame(() => {
      setTimeout(() => {
        const revealElements = document.querySelectorAll('.reveal:not(.active)');
        
        if (revealElements.length === 0) return;

        const revealObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
              revealObserver.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1 });

        revealElements.forEach(el => revealObserver.observe(el));
      }, 100);
    });
  };

  onMounted(() => {
    initReveal();
  });

  // Re-run whenever Nuxt finishes a page transition
  nuxtApp.hook('page:transition:finish', () => {
    initReveal();
  });
}
