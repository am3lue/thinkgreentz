<script setup>
useSeoMeta({
  title: 'Think Green Tanzania — Our Environment, Our Home',
  description: 'A youth-led environmental organization in Dar es Salaam, Tanzania, empowering communities toward a cleaner, greener, and more sustainable future.',
  ogTitle: 'Think Green Tanzania — Our Environment, Our Home',
  ogDescription: 'A youth-led environmental organization in Dar es Salaam, Tanzania, empowering communities toward a cleaner, greener, and more sustainable future.',
  ogImage: '/images/community.png',
  ogUrl: 'https://thinkgreentz.org',
  twitterTitle: 'Think Green Tanzania',
  twitterDescription: 'Empowering communities toward a cleaner, greener Tanzania.',
  twitterImage: '/images/community.png',
  twitterCard: 'summary_large_image',
})

useReveal()
</script>

<template>
  <div>
    <!-- HERO -->
    <section class="hero reveal">
      <div class="container hero-grid">
        <h1>We help communities <em>plant today</em> so the planet can <strong>thrive tomorrow</strong>.</h1>
        <p>
          THINK GREEN is a bold, youth-led environmental organization rooted in Dar es Salaam, Tanzania, with a mission to inspire, educate, and empower communities toward a cleaner, greener, and more sustainable future.
        </p>
        <div class="hero-cta">
          <NuxtLink to="/join" class="btn primary">Get Involved</NuxtLink>
          <NuxtLink to="/about" class="btn">What makes us different</NuxtLink>
        </div>
        <div class="hero-visual">
          <img alt="Community planting trees at sunrise" src="/images/community.png?q=80&w=1200&auto=format&fit=crop" />
          <div class="tiny" style="margin-top:8px">Photo: community volunteers on a Think Green Green Saturday</div>
        </div>
      </div>
    </section>

    <!-- OUR STORY TEASER (Moved Up) -->
    <section id="our-story" class="reveal" style="background: linear-gradient(180deg, rgba(255,255,255,0.01), transparent);">
      <div class="container">
        <div class="split">
          <div class="media">
            <img src="/images/ilakiza-preparing-to-plant.png" alt="Think Green founder preparing to plant" style="border-radius: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
          </div>
          <div class="text">
            <h2>Our Environment, Our Home</h2>
            <p>
              Think Green started with a simple observation: our environment is not just a resource, it's our home. What began as a local student club has grown into a youth-led movement that empowers thousands across Tanzania.
            </p>
            <p style="color: var(--muted); margin-bottom: 32px;">
              We believe in the power of small acts. A single tree, a single conversation, a single day of volunteering—these are the seeds of global change.
            </p>
            <NuxtLink to="/about" class="btn">Read our full story</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- IMPACT -->
    <section id="impact" class="reveal">
      <div class="container">
        <h2 style="text-align:center">Our Impact</h2>
        <p class="subhead" style="text-align:center">Turning beliefs into action, one tree and one community at a time.</p>
        <div class="metrics">
          <div class="metric">
            <div class="num">10k+</div>
            <div class="label">Trees Planted</div>
          </div>
          <div class="metric">
            <div class="num">50+</div>
            <div class="label">Schools Reached</div>
          </div>
          <div class="metric">
            <div class="num">2k+</div>
            <div class="label">Active Volunteers</div>
          </div>
          <div class="metric">
            <div class="num">15</div>
            <div class="label">Tons of Waste Collected</div>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURED PROGRAMS -->
    <section id="featured-programs" class="reveal">
      <div class="container">
        <h2>Featured Programs</h2>
        <p class="subhead">Discover how we're making a difference every week.</p>
        <div class="cards">
          <article class="card">
            <img src="/images/afforestation.png" alt="Green Saturdays tree planting event">
            <h3>Green Saturdays</h3>
            <p>Our flagship weekly initiative where volunteers gather to plant trees and restore urban green spaces in Dar es Salaam.</p>
            <NuxtLink to="/programs" class="tiny">Learn more &rarr;</NuxtLink>
          </article>
          <article class="card">
            <img src="/images/plastic.png" alt="Think Green Labs waste innovation">
            <h3>Think Green Labs</h3>
            <p>Empowering youth to innovate circular economy solutions, turning plastic waste into valuable community resources.</p>
            <NuxtLink to="/programs" class="tiny">Learn more &rarr;</NuxtLink>
          </article>
          <article class="card">
            <img src="/images/2026-leaders.gif" alt="Eco-leaders training">
            <h3>Eco-Leaders Rise</h3>
            <p>A comprehensive leadership program for students to spearhead environmental clubs in their own schools.</p>
            <NuxtLink to="/programs" class="tiny">Learn more &rarr;</NuxtLink>
          </article>
        </div>
        <div style="margin-top: 40px; text-align: center;">
            <NuxtLink to="/programs" class="btn">View all programs</NuxtLink>
        </div>
      </div>
    </section>

    <!-- CALL TO ACTION -->
    <section id="cta" class="reveal" style="background: linear-gradient(rgba(16,185,129,0.05), transparent); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);">
        <div class="container" style="text-align: center; padding: 48px 20px;">
            <h2>Ready to make a difference?</h2>
            <p class="subhead">Join our community of eco-warriors and help us build a greener tomorrow.</p>
            <div style="margin-top: 24px; display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
                <NuxtLink to="/join" class="btn primary">Join Think Green</NuxtLink>
                <NuxtLink to="/contact" class="btn">Get in touch</NuxtLink>
            </div>
        </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  padding: 72px 0 56px;
  position: relative;
  overflow: hidden;
}

.hero-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
  align-items: center;
}

.hero h1 {
  grid-column: span 7;
  font-family: "Playfair Display", serif;
  font-size: clamp(2.2rem, 4vw, 4rem);
  line-height: 1.1;
  margin: 0 0 10px;
}

.hero p {
  grid-column: span 7;
  font-size: clamp(1rem, 1.4vw, 1.2rem);
  color: #cce8d3;
  margin: 0 0 18px;
}

.hero-cta {
  grid-column: span 7;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.hero-visual {
  grid-column: 8 / span 5;
}

.hero-visual img {
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}

section {
  padding: 56px 0;
  border-top: 1px solid var(--line);
}

.metrics {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

.metric {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 16px;
  text-align: center;
}

.metric .num {
  font-weight: 800;
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  color: var(--accent);
}

.metric .label {
  color: #cce8d3;
}

.cards {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 18px;
}

.card {
  grid-column: span 4;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent), var(--card);
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
  transition: transform 0.5s ease;
}

.card:hover img {
  transform: scale(1.02);
}

.card h3 {
  margin: 12px 0 8px;
  font-size: 1.2rem;
}

.card p {
  color: #cce8d3;
  font-size: .98rem;
  margin-bottom: 12px;
}

.tiny {
  font-size: .9rem;
  color: var(--accent);
}

.split {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
  align-items: center;
}

.split > .text {
  grid-column: span 6;
}

.split > .media {
  grid-column: span 6;
}

/* Animations */
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
  .hero-grid, .cards, .split {
    grid-template-columns: 1fr;
  }
  .hero h1, .hero p, .hero-cta, .hero-visual, .card, .split > .text, .split > .media {
    grid-column: 1 / -1;
  }
  .metrics {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
