<script setup>
const isLoading = ref(false)

// Use Nuxt hooks to trigger the loader during route changes
const nuxtApp = useNuxtApp()

nuxtApp.hook('page:start', () => {
  isLoading.value = true
})

nuxtApp.hook('page:finish', () => {
  // Give the animation a moment to play before hiding
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})
</script>

<template>
  <div>
    <Transition name="fade">
      <AppLoader v-if="isLoading" class="global-loader" />
    </Transition>
    
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
.global-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 9999;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
