<script setup>
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "NGO",
        "name": "Think Green Tanzania",
        "url": "https://thinkgreentz.org",
        "logo": "https://thinkgreentz.org/images/logo.jpeg",
        "description": "A youth-led environmental organization rooted in Dar es Salaam, Tanzania, empowering communities toward a cleaner, greener, and more sustainable future.",
        "foundingDate": "2019",
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "Customer Support",
          "email": "ilakizar@gmail.com"
        },
        "sameAs": [
          "https://www.instagram.com/thinkgreen_tz/"
        ]
      })
    }
  ]
})
</script>

<template>
  <div>
    <EventBanner />
    <AppHeader />
    <main id="main">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
