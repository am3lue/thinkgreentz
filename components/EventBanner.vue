<script setup>
import { onMounted, ref, computed } from 'vue'

const { data: activeEvents, refresh } = await useAsyncData('active-event', () => $fetch('/api/events/active'))
const event = computed(() => activeEvents.value?.[0])

const timeLeft = ref('')
const isDismissed = ref(false)

onMounted(() => {
  if (!event.value) return

  const updateCountdown = () => {
    const now = new Date().getTime()
    const startTime = new Date(event.value.start_time).getTime()
    const endTime = new Date(event.value.end_time).getTime()

    if (now > endTime) {
      refresh() // Refresh to remove the event or get next one
      return
    }

    let targetTime = startTime
    let prefix = 'Starts in:'
    
    if (now >= startTime) {
      targetTime = endTime
      prefix = 'Ends in:'
    }

    const distance = targetTime - now
    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)

    timeLeft.value = `${prefix} ${days}d ${hours}h ${minutes}m ${seconds}s`
  }

  updateCountdown()
  setInterval(updateCountdown, 1000)
})

const dismissPopup = () => {
  isDismissed.value = true
}
</script>

<template>
  <Transition name="slide-up">
    <div v-if="event && !isDismissed" class="event-popup">
      <button class="close-btn" @click="dismissPopup" aria-label="Close popup">&times;</button>
      
      <div class="popup-header">
        <span class="pulsing-dot"></span>
        <strong>{{ event.title }}</strong>
      </div>
      
      <p class="event-desc">{{ event.description }}</p>
      
      <div class="event-action">
        <span class="countdown">{{ timeLeft }}</span>
        <a v-if="event.link_url" :href="event.link_url" target="_blank" class="btn tiny-btn outline">Details &rarr;</a>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.event-popup {
  position: fixed;
  bottom: 24px;
  left: 24px;
  width: 320px;
  
  /* Glassy Effect */
  background: rgba(15, 24, 20, 0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  
  border: 1px solid rgba(45, 212, 119, 0.3);
  border-radius: 16px;
  padding: 20px;
  z-index: 990;
  box-shadow: 0 10px 40px rgba(0,0,0,0.5), 0 0 20px rgba(16, 185, 129, 0.1);
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 12px;
  background: none;
  border: none;
  color: var(--muted);
  font-size: 1.5rem;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  transition: color 0.2s;
}

.close-btn:hover {
  color: var(--accent);
}

/* Subtle glow matching the brand */
.event-popup::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, var(--accent-2), var(--accent));
  border-radius: 16px 16px 0 0;
}

.popup-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  padding-right: 16px; /* space for close button */
}

.popup-header strong {
  font-size: 1.05rem;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pulsing-dot {
  width: 10px;
  height: 10px;
  background-color: var(--accent);
  border-radius: 50%;
  animation: pulse 1.5s infinite;
  flex-shrink: 0;
}

@keyframes pulse {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(45, 212, 119, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(45, 212, 119, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(45, 212, 119, 0); }
}

.event-desc {
  font-size: 0.9rem;
  color: var(--muted);
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.event-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.countdown {
  font-family: monospace;
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--accent);
  background: rgba(45, 212, 119, 0.1);
  padding: 6px 10px;
  border-radius: 8px;
}

.tiny-btn.outline {
  border: 1px solid var(--line);
  color: var(--text);
  background: transparent;
  padding: 6px 14px;
  font-size: 0.85rem;
  border-radius: 999px;
  font-weight: 500;
  transition: all 0.2s;
}

.tiny-btn.outline:hover {
  background: var(--accent);
  color: #000;
  border-color: var(--accent);
}

/* Slide up animation */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(50px) scale(0.95);
}

@media (max-width: 600px) {
  .event-popup {
    bottom: 16px;
    left: 16px;
    width: calc(100% - 32px);
  }
}
</style>
