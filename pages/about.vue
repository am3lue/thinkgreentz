<script setup>
useSeoMeta({
  title: 'About Us | Think Green Tanzania',
  description: 'Learn about Think Green Tanzania, a youth-led movement transforming Dar es Salaam through tree planting, eco-literacy, and community empowerment.',
  ogTitle: 'About Us | Think Green Tanzania',
  ogDescription: 'Learn about Think Green Tanzania, a youth-led movement transforming Dar es Salaam through tree planting, eco-literacy, and community empowerment.',
  ogImage: '/images/ilakiza-picture.png',
  ogUrl: 'https://thinkgreentz.org/about',
  twitterTitle: 'About Us | Think Green Tanzania',
  twitterDescription: 'A youth-led movement for a cleaner, greener Tanzania.',
  twitterImage: '/images/ilakiza-picture.png',
  twitterCard: 'summary_large_image',
})

useReveal()
</script>

<template>
  <div>
    <section id="about" class="reveal">
      <div class="container">
        
        <!-- Vision & Hero Intro -->
        <div class="about-hero" style="text-align: center; max-width: 800px; margin: 0 auto 56px;">
          <h2>About Us – THINK GREEN</h2>
          <p class="subhead" style="font-size: 1.2rem;">A youth-led movement for a cleaner, greener Tanzania</p>
          <p style="font-size: 1.1rem; line-height: 1.8;">
            A <strong>sustainable Tanzania</strong> powered by bold young leaders and empowered communities—a world where environmental responsibility is a way of life. At <em>THINK GREEN TZ</em>, every small act, from planting a tree to sparking a conversation, fuels global change.
          </p>
        </div>

        <!-- Featured Image -->
        <div class="media" style="margin-bottom: 64px;">
          <img alt="Students engaging in environmental activities" src="/images/students-picking-in-yellow.png?q=80&w=1200&auto=format&fit=crop" style="width: 100%; max-height: 500px; object-fit: cover; border-radius: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.3);" />
        </div>

        <!-- Our Story -->
        <div class="split" style="margin-bottom: 64px; align-items: center;">
          <div class="text" style="grid-column: span 12; text-align: center; max-width: 800px; margin: 0 auto;">
            <h3>Our Origins</h3>
            <p>
              Born in <strong>Dar es Salaam, Tanzania</strong>, <em>THINK GREEN</em> transforms the belief that <em>“our environment is our home”</em> into action. What started as a small student club tackling local litter has grown into a vibrant, community-driven initiative empowering <strong>youth, children, women, and entire communities</strong> to create a sustainable future.
            </p>
          </div>
        </div>
            
        <!-- Initiatives Grid -->
        <h3 style="text-align: center; margin-bottom: 32px;">Our Core Initiatives</h3>
        <div class="cards">
          <article class="card">
            <h3>Youth Environmental Leadership</h3>
            <p>Through events like <strong>ECOLEADERS RISE 2025</strong>, we inspire young changemakers with workshops, creative forums, and innovation sessions, turning their ideas into impactful climate action.</p>
          </article>
          <article class="card">
            <h3>School Outreach & Education</h3>
            <p>Our <strong>school-based environmental clubs</strong> bring tree planting, climate education, and eco-literacy to students, fostering green spaces that enhance learning, food security, and community well-being.</p>
          </article>
          <article class="card">
            <h3>Community-Led Conservation</h3>
            <p>We design <strong>community-based projects</strong>—from tree-planting campaigns to cleanups—that provide shade, nourishment, and dignity while uniting people to protect their environment.</p>
          </article>
          <article class="card" style="grid-column: span 6;">
            <h3>Events, Advocacy & Recognition</h3>
            <p>From environmental festivals to earning nominations like <strong>Environmental Champion at the TEYA Awards</strong>, we amplify youth voices on national stages, proving young people are powerful agents of change.</p>
          </article>
          <article class="card" style="grid-column: span 6;">
            <h3>Partnerships for Impact</h3>
            <p>We collaborate with partners like <strong>@globalplatform_tanzania</strong>, <strong>@climate.fresk.tanzania</strong>, and <strong>@africaforsdgs</strong> to scale our efforts and create transformative opportunities.</p>
          </article>
        </div>

      </div>
    </section>

    <!-- Team Section -->
    <section id="team" class="reveal" style="background: linear-gradient(rgba(255,255,255,0.02), transparent);">
      <div class="container">
        <h2 style="text-align: center;">Meet the Team</h2>
        <div class="cards" style="margin-top: 40px;">
          <article class="card team-card">
            <img src="/images/ilakiza-picture.png" alt="Ilakiza">
            <h3>Ilakiza</h3>
            <p>Founder & CEO</p>
          </article>
          <article class="card team-card">
            <img src="/images/ilakiza-preparing-to-plant.png" alt="Team Member 2">
            <h3>Team Member 2</h3>
            <p>Head of Programs</p>
          </article>
          <article class="card team-card">
            <img src="/images/students-picking-in-yellow.png" alt="Team Member 3">
            <h3>Team Member 3</h3>
            <p>Community Manager</p>
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

.split {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
  align-items: flex-start;
}

.split > .text {
  grid-column: span 7;
}

.split > .media {
  grid-column: span 5;
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
}

.card.full-width {
  grid-column: span 12;
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

.card img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 12px;
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
  .split {
    grid-template-columns: 1fr;
  }
  .split > .text, .split > .media, .card {
    grid-column: 1 / -1;
  }
}
</style>
