<script setup>
useSeoMeta({
  title: 'Join the Movement | Think Green Tanzania',
  description: 'Become a volunteer, partner, or donate to support reforestation and circular economy projects in Tanzania.',
  ogTitle: 'Join the Movement | Think Green Tanzania',
  ogDescription: 'Become a volunteer, partner, or donate to support reforestation and circular economy projects in Tanzania.',
  ogImage: '/images/ilakiza-preparing-to-plant.png',
  ogUrl: 'https://thinkgreentz.org/join',
  twitterTitle: 'Join Think Green Tanzania',
  twitterDescription: 'Become a volunteer or partner to support a greener Tanzania.',
  twitterImage: '/images/ilakiza-preparing-to-plant.png',
  twitterCard: 'summary_large_image',
})

useReveal()

const form = ref({
  fullName: '',
  dob: '',
  location: '',
  email: '',
  phone: '',
  availability: '',
  interests: [],
  skills: '',
  languages: [],
  motivation: '',
  emergencyContact: '',
  healthInfo: '',
  agreement: false
})

const isSubmitting = ref(false)
const isSuccess = ref(false)

const submitApplication = async () => {
  isSubmitting.value = true

  try {
    await $fetch('/api/volunteer', {
      method: 'POST',
      body: form.value
    })
    isSuccess.value = true
    window.scrollTo({ top: document.getElementById('volunteer-form-section').offsetTop - 100, behavior: 'smooth' })
  } catch (e) {
    alert('Failed to submit application: ' + (e.data?.message || e.message))
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  isSuccess.value = false
  form.value = {
    fullName: '', dob: '', location: '', email: '', phone: '',
    availability: '', interests: [], skills: '', languages: [],
    motivation: '', emergencyContact: '', healthInfo: '', agreement: false
  }
}
</script>

<template>
  <div>
    <section class="reveal">
      <div class="container">
        <h2>Join the Movement</h2>
        <p class="subhead">Become a part of our growing community of environmental champions.</p>
        <div class="split">
            <div class="text">
                <h3>Volunteer with Us</h3>
                <p>
                    Dedicate your time and skills to our various projects. Whether it's planting trees on a Green Saturday, assisting in a Think Green Lab, or helping with community outreach, your contribution is valuable.
                </p>
                <h3>Become a Partner</h3>
                <p>
                    Collaborate with us to amplify our impact. We welcome partnerships with organizations, institutions, and individuals who share our vision.
                </p>
                <h3>Donate</h3>
                <p>
                    Your financial support helps us procure resources, organize events, and sustain our programs. Every little bit counts.
                </p>
            </div>
            <div class="media">
                <img src="/images/ilakiza-preparing-to-plant.png" alt="Volunteer preparing to plant a tree">
            </div>
        </div>
      </div>
    </section>

    <section id="volunteer-form-section" class="reveal" style="background: linear-gradient(180deg, rgba(16,185,129,0.03), transparent);">
        <div class="container">
            <div class="form-wrapper">
              
              <div v-if="isSuccess" class="success-state reveal active">
                <div class="success-icon">✨</div>
                <h2>Application Received!</h2>
                <p>Thank you, <strong>{{ form.fullName }}</strong>, for your interest in joining Think Green Tanzania. We have received your details and our community team will reach out to you at <strong>{{ form.email }}</strong> very soon.</p>
                <button class="btn" @click="resetForm">Submit Another Application</button>
              </div>

              <form v-else @submit.prevent="submitApplication" class="volunteer-form">
                  <div class="form-header">
                    <h2>Volunteer Application</h2>
                    <p class="subhead">Fill out the form below to express your interest.</p>
                  </div>

                  <!-- Section 1: Personal Details -->
                  <div class="form-section">
                    <h4>Personal Details</h4>
                    <div class="input-grid">
                      <div class="form-group">
                        <label>Full Name</label>
                        <input type="text" v-model="form.fullName" required placeholder="Jane Doe">
                      </div>
                      <div class="form-group">
                        <label>Date of Birth</label>
                        <input type="date" v-model="form.dob" required>
                      </div>
                      <div class="form-group">
                        <label>Email Address</label>
                        <input type="email" v-model="form.email" required placeholder="jane@example.com">
                      </div>
                      <div class="form-group">
                        <label>WhatsApp / Phone</label>
                        <input type="tel" v-model="form.phone" required placeholder="+255 ...">
                      </div>
                      <div class="form-group full-width">
                        <label>Location / City</label>
                        <input type="text" v-model="form.location" required placeholder="Dar es Salaam">
                      </div>
                    </div>
                  </div>

                  <!-- Section 2: Interests & Skills -->
                  <div class="form-section">
                    <h4>Interests & Skills</h4>
                    <div class="form-group full-width">
                      <label>Availability (Hours per week)</label>
                      <input type="text" v-model="form.availability" required placeholder="e.g., 5 hours on weekends">
                    </div>

                    <div class="form-group full-width">
                      <label>Areas of Interest</label>
                      <div class="checkbox-group">
                          <label class="custom-checkbox">
                            <input type="checkbox" v-model="form.interests" value="Tree Planting">
                            <span class="checkmark"></span> Tree Planting
                          </label>
                          <label class="custom-checkbox">
                            <input type="checkbox" v-model="form.interests" value="Waste Management">
                            <span class="checkmark"></span> Waste Management
                          </label>
                          <label class="custom-checkbox">
                            <input type="checkbox" v-model="form.interests" value="Education">
                            <span class="checkmark"></span> Education & Outreach
                          </label>
                      </div>
                    </div>

                    <div class="form-group full-width">
                      <label>Relevant Skills (Photography, Design, Science, etc.)</label>
                      <input type="text" v-model="form.skills" placeholder="List any specific skills you bring...">
                    </div>

                    <div class="form-group full-width">
                      <label>Language Proficiency</label>
                      <div class="checkbox-group">
                          <label class="custom-checkbox">
                            <input type="checkbox" v-model="form.languages" value="Swahili">
                            <span class="checkmark"></span> Swahili
                          </label>
                          <label class="custom-checkbox">
                            <input type="checkbox" v-model="form.languages" value="English">
                            <span class="checkmark"></span> English
                          </label>
                      </div>
                    </div>
                  </div>

                  <!-- Section 3: Motivation & Health -->
                  <div class="form-section">
                    <h4>Motivation & Health</h4>
                    <div class="form-group full-width">
                      <label>Why do you want to join Think Green?</label>
                      <textarea v-model="form.motivation" rows="4" required placeholder="Tell us what inspires you..."></textarea>
                    </div>

                    <div class="input-grid">
                      <div class="form-group">
                        <label>Emergency Contact</label>
                        <input type="text" v-model="form.emergencyContact" required placeholder="Name & Phone">
                      </div>
                      <div class="form-group">
                        <label>Health / Allergy Info (for fieldwork)</label>
                        <input type="text" v-model="form.healthInfo" placeholder="Any physical limitations or allergies?">
                      </div>
                    </div>
                  </div>

                  <div class="form-footer">
                    <label class="custom-checkbox agreement">
                        <input type="checkbox" v-model="form.agreement" required>
                        <span class="checkmark"></span> I agree to the Code of Conduct and Liability Waiver for fieldwork.
                    </label>

                    <button type="submit" class="btn primary submit-btn" :disabled="isSubmitting">
                      {{ isSubmitting ? 'Sending Application...' : 'Submit Application' }}
                    </button>
                  </div>
              </form>
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
  align-items: center;
}

.split > .text {
  grid-column: span 7;
}

.split > .media {
  grid-column: span 5;
}

/* Form Styles */
.form-wrapper {
  max-width: 800px;
  margin: 0 auto;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.form-header {
  margin-bottom: 32px;
  text-align: center;
  border-bottom: 1px solid var(--line);
  padding-bottom: 24px;
}

.form-header h2 {
  margin-bottom: 8px;
}

.form-section {
  margin-bottom: 32px;
}

.form-section h4 {
  color: var(--accent);
  margin-bottom: 16px;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.input-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group.full-width {
  grid-column: 1 / -1;
  margin-bottom: 20px;
}

label {
  font-weight: 600;
  color: var(--text);
  font-size: 0.95rem;
}

input[type="text"],
input[type="email"],
input[type="tel"],
input[type="date"],
textarea {
  background: #0c1411;
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 14px;
  color: var(--text);
  width: 100%;
  font-family: inherit;
  transition: all 0.2s;
}

input:focus, textarea:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(45, 212, 119, 0.15);
}

/* Custom Checkbox */
.checkbox-group {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 4px;
}

.custom-checkbox {
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 30px;
  cursor: pointer;
  font-weight: 400;
  user-select: none;
}

.custom-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: 20px;
  width: 20px;
  background-color: #0c1411;
  border: 1px solid var(--line);
  border-radius: 6px;
  transition: all 0.2s;
}

.custom-checkbox:hover input ~ .checkmark {
  border-color: var(--accent);
}

.custom-checkbox input:checked ~ .checkmark {
  background-color: var(--accent);
  border-color: var(--accent);
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid #000;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.custom-checkbox input:checked ~ .checkmark:after {
  display: block;
}

.form-footer {
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.agreement {
  color: var(--muted);
  font-size: 0.9rem;
}

.submit-btn {
  width: 100%;
  max-width: 300px;
  justify-content: center;
  font-size: 1.1rem;
  padding: 16px;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Success State */
.success-state {
  text-align: center;
  padding: 40px 20px;
}

.success-icon {
  font-size: 4rem;
  margin-bottom: 20px;
  animation: float 2s ease-in-out infinite;
}

.success-state p {
  color: var(--muted);
  font-size: 1.1rem;
  margin-bottom: 30px;
  line-height: 1.8;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

@media (max-width: 980px) {
  .split {
    grid-template-columns: 1fr;
  }
  .split > .text, .split > .media {
    grid-column: 1 / -1;
  }
  .input-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .form-wrapper {
    padding: 24px 16px;
  }
}
</style>