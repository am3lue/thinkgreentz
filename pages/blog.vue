<script setup>
useSeoMeta({
  title: 'Blog & News | Think Green Tanzania',
  description: 'Read the latest updates, stories, and news from the heart of Tanzania’s youth environmental movement.',
  ogTitle: 'Blog & News | Think Green Tanzania',
  ogDescription: 'Read the latest updates, stories, and news from the heart of Tanzania’s youth environmental movement.',
  ogImage: '/images/valentine%20-poster.png',
  ogUrl: 'https://thinkgreentz.org/blog',
  twitterTitle: 'Blog & News | Think Green Tanzania',
  twitterDescription: 'Updates and stories from Tanzania’s youth environmental movement.',
  twitterImage: '/images/valentine%20-poster.png',
  twitterCard: 'summary_large_image',
})

const { data: blogPosts, pending, error } = await useAsyncData('blog', () => $fetch('/api/blog'))

useReveal()
</script>

<template>
  <div>
    <section class="reveal">
      <div class="container">
        <h2>Blog</h2>
        <p class="subhead">News, stories, and updates from the Think Green team.</p>
        
        <div v-if="pending" class="cards">
          <div v-for="i in 3" :key="i" class="card skeleton">
            <div class="shimmer"></div>
          </div>
        </div>
        
        <div v-else-if="error" class="cards">
           <p>Failed to load blog posts.</p>
        </div>
        
        <div v-else class="cards">
          <article v-for="post in blogPosts" :key="post.id" class="card">
            <img v-if="post.image" :src="post.image" :alt="post.title" class="card-image" loading="lazy">
            <h3>{{ post.title }}</h3>
            <p>{{ post.info }}</p>
            <div class="card-links" v-if="post.links && post.links.length">
              <a v-for="(link, lIdx) in post.links" :key="lIdx" :href="link.url" class="btn tiny-btn">{{ link.text }}</a>
            </div>
          </article>
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

.cards {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 18px;
}

.card {
  grid-column: span 4;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 18px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
  border-color: var(--accent);
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px 12px 0 0;
  margin: -18px -18px 12px -18px;
  width: calc(100% + 36px);
}

.card h3 {
  margin: 6px 0 8px;
  font-size: 1.2rem;
  color: var(--accent);
}

.card p {
  color: #cce8d3;
  font-size: .98rem;
  margin-bottom: 12px;
}

.card-links {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tiny-btn {
  padding: 6px 12px;
  font-size: 0.85rem;
  border-radius: 8px;
}

.skeleton {
  height: 350px;
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
  .card {
    grid-column: 1 / -1;
  }
}
</style>
