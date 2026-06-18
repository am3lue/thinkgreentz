<script setup>
useSeoMeta({
  title: 'Contact Us | Think Green Tanzania',
  description: 'Get in touch with Think Green Tanzania. Reach out to join our community or partner with us for a greener future.',
  ogTitle: 'Contact Us | Think Green Tanzania',
  ogDescription: 'Get in touch with Think Green Tanzania. Reach out to join our community or partner with us for a greener future.',
  ogUrl: 'https://thinkgreentz.org/contact',
})

const form = ref({
  name: '',
  email: '',
  message: ''
})

const status = ref({
  message: '',
  color: ''
})

useReveal()

const handleSubmit = () => {
  if (form.value.name && form.value.email && /@/.test(form.value.email)) {
    status.value = {
      message: `Thanks, ${form.value.name}! We'll reach out at ${form.value.email}.`,
      color: '#bbf7d0'
    }
    form.value = { name: '', email: '', message: '' }
  } else {
    status.value = {
      message: 'Please enter a valid name and email.',
      color: '#fca5a5'
    }
  }
}
</script>

<template>
  <div>
    <section class="reveal">
      <div class="container">
        <h2>Contact Us</h2>
        <p class="subhead">We'd love to hear from you. Reach out with questions, partnership ideas, or just to say hello.</p>
        
        <form @submit.prevent="handleSubmit">
          <div class="inline">
            <input type="text" v-model="form.name" placeholder="Your Name" required>
            <input type="email" v-model="form.email" placeholder="Your Email" required>
          </div>
          <textarea v-model="form.message" placeholder="Your Message" rows="5" required></textarea>
          <button type="submit" class="btn primary">Send Message</button>
          <div v-if="status.message" :style="{ color: status.color, marginTop: '12px' }">{{ status.message }}</div>
        </form>
      </div>
    </section>
  </div>
</template>

<style scoped>
section {
  padding: 56px 0;
  border-top: 1px solid var(--line);
}

form {
  display: grid;
  gap: 12px;
  max-width: 600px;
}

input, textarea {
  background: #0c1411;
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 12px;
  color: var(--text);
  width: 100%;
}

input:focus, textarea:focus {
  outline: 2px solid var(--ring);
  border-color: transparent;
}

.inline {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.inline input {
  flex: 1;
  min-width: 200px;
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
</style>
