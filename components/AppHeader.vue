<script setup>
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <header>
    <div class="container nav" role="navigation" aria-label="Primary">
      <NuxtLink to="/" class="brand" aria-label="Think Green home" @click="closeMenu">
        <img src="/images/logo.jpeg" alt="Think Green Logo">
        <span>Think Green</span>
        <span class="badge">Our Environment, Our Home</span>
      </NuxtLink>
      <nav class="nav-links" :class="{ active: isMenuOpen }">
        <NuxtLink to="/about" @click="closeMenu">About</NuxtLink>
        <NuxtLink to="/programs" @click="closeMenu">Programs</NuxtLink>
        <NuxtLink to="/gallery" @click="closeMenu">Gallery</NuxtLink>
        <NuxtLink to="/blog" @click="closeMenu">Blog</NuxtLink>
        <NuxtLink to="/contact" @click="closeMenu">Contact</NuxtLink>
        <NuxtLink to="/join" class="cta" @click="closeMenu">Join Think Green</NuxtLink>
      </nav>
      <button class="hamburger" aria-label="Toggle menu" @click="toggleMenu">&#9776;</button>
    </div>
  </header>
</template>

<style scoped>
header {
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: saturate(150%) blur(12px);
  background: rgba(12, 18, 16, 0.8);
  border-bottom: 1px solid var(--line);
  transition: box-shadow 0.3s ease;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  letter-spacing: .3px;
  cursor: pointer;
  color: var(--text);
}

.brand:hover {
  text-decoration: none;
}

.brand img {
  width: 32px;
  height: 32px;
  border-radius: 8px;
}

.nav-links {
  display: flex;
  gap: 8px;
  align-items: center;
}

.nav-links a {
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--muted);
  transition: all 0.2s ease;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: var(--accent);
  background: rgba(45, 212, 119, 0.05);
  text-decoration: none;
}

.nav-links a.cta {
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  color: #062c16;
  font-weight: 700;
  margin-left: 8px;
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.15);
}

.nav-links a.cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 25px rgba(16, 185, 129, 0.25);
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
}

.badge {
  font-weight: 700;
  font-size: .9rem;
  color: #08361a;
  padding: 6px 10px;
  border-radius: 999px;
  background: linear-gradient(135deg, #bbf7d0, #86efac);
}

.hamburger {
  display: none;
  background: none;
  border: 0;
  color: var(--text);
  font-size: 1.8rem;
  cursor: pointer;
  padding: 4px;
}

@media (max-width: 980px) {
  .hamburger {
    display: block;
  }

  .nav-links {
    display: flex;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--bg);
    border-bottom: 1px solid var(--line);
    padding: 24px 0;
    flex-direction: column;
    gap: 8px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 90;
  }

  .nav-links.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .nav-links a {
    width: 100%;
    text-align: center;
    border-radius: 0;
    padding: 12px;
  }

  .nav-links a.cta {
    margin: 12px 20px 0;
    width: calc(100% - 40px);
  }
}
</style>
