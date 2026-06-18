<script setup>
useSeoMeta({
  title: 'Our Programs | Think Green Tanzania',
  description: 'Explore our environmental initiatives: Green Saturdays, Think Green Labs, Eco-Leaders Rise, and community conservation projects across Tanzania.',
  ogTitle: 'Our Programs | Think Green Tanzania',
  ogDescription: 'Explore our environmental initiatives: Green Saturdays, Think Green Labs, Eco-Leaders Rise, and community conservation projects across Tanzania.',
  ogImage: '/images/afforestation.png',
  ogUrl: 'https://thinkgreentz.org/programs',
  twitterTitle: 'Our Programs | Think Green Tanzania',
  twitterDescription: 'Discover how we are making a difference with our environmental programs.',
  twitterImage: '/images/afforestation.png',
  twitterCard: 'summary_large_image',
})

const { data: programs, pending, error } = await useAsyncData('programs', () => $fetch('/api/programs'))

useReveal()
</script>

<template>
  <div>
    <section class="reveal">
      <div class="container">
        <h2>Our Programs</h2>
        <p class="subhead">We have a range of programs designed to make a positive impact on the environment and in our communities.</p>
        
        <div v-if="pending" class="cards">
          <div v-for="i in 6" :key="i" class="card" style="height: 300px; background: rgba(255,255,255,0.03);">
          </div>
        </div>

        <div v-else-if="error" class="cards">
          <p>Failed to load programs.</p>
        </div>

        <div v-else class="cards">
          <article v-for="program in programs" :key="program.id" class="card">
            <img :src="program.image" :alt="program.title">
            <h3>{{ program.title }}</h3>
            <p>{{ program.info }}</p>
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

.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 12px;
}

.card h3 {
  margin: 6px 0 8px;
  font-size: 1.2rem;
  color: var(--accent);
}

.card p {
  color: #cce8d3;
  font-size: .98rem;
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
  .cards {
    grid-template-columns: 1fr;
  }
  .card {
    grid-column: 1 / -1;
  }
}
</style>
