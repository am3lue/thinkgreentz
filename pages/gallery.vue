<script setup>
useSeoMeta({
  title: 'Gallery | Think Green Tanzania',
  description: 'View the impact of Think Green Tanzania. Moments from our tree planting events, community cleanups, and youth workshops.',
  ogTitle: 'Gallery | Think Green Tanzania',
  ogDescription: 'View the impact of Think Green Tanzania. Moments from our tree planting events, community cleanups, and youth workshops.',
  ogImage: '/images/students-picking-in-yellow.png',
  ogUrl: 'https://thinkgreentz.org/gallery',
  twitterTitle: 'Gallery | Think Green Tanzania',
  twitterDescription: 'Moments from our tree planting events and youth workshops.',
  twitterImage: '/images/students-picking-in-yellow.png',
  twitterCard: 'summary_large_image',
})

const { data: gallery, pending, error } = await useAsyncData('gallery', () => $fetch('/api/gallery'))

useReveal()
</script>

<template>
  <div>
    <section class="reveal">
      <div class="container">
        <h2>Gallery</h2>
        <p class="subhead">A collection of moments from our events and activities.</p>
        
        <div v-if="pending" class="gallery">
          <div v-for="i in 6" :key="i" class="skeleton">
            <div class="shimmer"></div>
          </div>
        </div>
        
        <div v-else-if="error" class="gallery">
           <p>Failed to load gallery.</p>
        </div>
        
        <div v-else class="gallery">
          <img 
            v-for="item in gallery" 
            :key="item.id" 
            :src="item.image" 
            :alt="item.alt" 
            loading="lazy" 
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
section {
  padding: 56px 0;
  border-top: 1px solid var(--line);
}

.gallery {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 12px;
}

.gallery img, .skeleton {
  grid-column: span 4;
  height: 250px;
  object-fit: cover;
  border-radius: 16px;
  width: 100%;
}

.skeleton {
  background: rgba(255, 255, 255, 0.03);
  position: relative;
  overflow: hidden;
}

.shimmer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.reveal.active {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 980px) {
  .gallery img, .skeleton {
    grid-column: 1 / -1;
  }
}
</style>
