<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        
        <!-- Brand & Mission -->
        <div class="footer-brand">
          <NuxtLink to="/" class="logo-link">
            <img src="/images/logo.jpeg" alt="Think Green Logo" class="footer-logo">
            <div class="brand-text">
              <h3>Think Green</h3>
              <p class="badge-text">Our Environment, Our Home</p>
            </div>
          </NuxtLink>
          <p class="mission-text">
            A youth-led environmental organization rooted in Dar es Salaam, empowering communities toward a cleaner, greener, and more sustainable future.
          </p>
        </div>

        <!-- Quick Links -->
        <div class="footer-links">
          <h4>Explore</h4>
          <nav>
            <NuxtLink to="/about">About Us</NuxtLink>
            <NuxtLink to="/programs">Our Programs</NuxtLink>
            <NuxtLink to="/gallery">Gallery</NuxtLink>
            <NuxtLink to="/blog">Blog & News</NuxtLink>
          </nav>
        </div>

        <!-- Get Involved -->
        <div class="footer-links">
          <h4>Get Involved</h4>
          <nav>
            <NuxtLink to="/join">Volunteer</NuxtLink>
            <NuxtLink to="/join">Partner with us</NuxtLink>
            <NuxtLink to="/contact">Contact</NuxtLink>
          </nav>
        </div>

        <!-- Contact & Social -->
        <div class="footer-contact">
          <h4>Connect</h4>
          <div class="contact-info">
            <p><strong>HQ:</strong> Dar es Salaam, Tanzania</p>
            <p><strong>Email:</strong> <a href="mailto:ilakizar@gmail.com">ilakizar@gmail.com</a></p>
          </div>
          <div class="social-links">
            <a href="https://www.instagram.com/thinkgreen_tz/" target="_blank" rel="noopener noreferrer" class="social-btn">
              <span>Instagram</span>
              <span class="arrow">↗</span>
            </a>
          </div>
        </div>

      </div>

      <div class="footer-bottom">
        <p>&copy; {{ new Date().getFullYear() }} Think Green Tanzania. All rights reserved.</p>
        <NuxtLink to="/admin" class="admin-link">Admin Login</NuxtLink>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--bg);
  padding: 80px 0 32px;
  border-top: 1px solid var(--line);
  color: #c7e6cf;
  position: relative;
  overflow: hidden;
}

/* Subtle glow effect behind the footer */
.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 1px;
  background: radial-gradient(circle, var(--accent) 0%, transparent 100%);
  opacity: 0.5;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 48px;
  margin-bottom: 64px;
}

/* Brand Section */
.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 16px;
  text-decoration: none;
}

.footer-logo {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.5);
}

.brand-text h3 {
  margin: 0;
  color: var(--text);
  font-size: 1.4rem;
  letter-spacing: 0.5px;
}

.badge-text {
  margin: 0;
  font-size: 0.85rem;
  color: var(--accent);
  font-weight: 600;
}

.mission-text {
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--muted);
  max-width: 320px;
}

/* Links Sections */
h4 {
  color: var(--text);
  font-size: 1.1rem;
  margin: 0 0 20px 0;
  font-weight: 600;
}

.footer-links nav {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-links a {
  color: var(--muted);
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  width: fit-content;
}

.footer-links a:hover {
  color: var(--accent);
  transform: translateX(4px);
}

/* Contact & Social Section */
.footer-contact {
  display: flex;
  flex-direction: column;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
}

.contact-info p {
  margin: 0;
  font-size: 0.95rem;
  color: var(--muted);
}

.contact-info strong {
  color: var(--text);
}

.contact-info a {
  color: var(--muted);
  transition: color 0.2s;
}

.contact-info a:hover {
  color: var(--accent);
}

.social-btn {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 12px;
  color: var(--text);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
  width: 140px;
}

.social-btn .arrow {
  color: var(--accent);
  transition: transform 0.2s ease;
}

.social-btn:hover {
  border-color: var(--accent);
  box-shadow: 0 4px 12px rgba(45,212,119,0.1);
}

.social-btn:hover .arrow {
  transform: translate(2px, -2px);
}

/* Footer Bottom */
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  border-top: 1px solid var(--line);
  font-size: 0.85rem;
  color: #6a8c75;
}

.footer-bottom p {
  margin: 0;
}

.admin-link {
  color: #6a8c75;
  text-decoration: none;
  transition: color 0.2s;
}

.admin-link:hover {
  color: var(--accent);
}

/* Responsive */
@media (max-width: 980px) {
  .footer {
    padding: 60px 0 24px;
  }
  
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
  
  .footer-brand {
    grid-column: 1 / -1;
  }
  
  .mission-text {
    max-width: 100%;
  }
}

@media (max-width: 600px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  
  .footer-bottom {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
}
</style>
