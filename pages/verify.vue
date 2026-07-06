<script setup>
const route = useRoute()
const code = route.query.code || ''

const { data, pending, error } = await useAsyncData('verify', () =>
  $fetch(`/api/certificates/verify?code=${encodeURIComponent(code)}`)
)

useSeoMeta({
  title: 'Certificate Verification | Think Green Tanzania',
  description: 'Verify a Think Green Tanzania certificate of participation.',
})
</script>

<template>
  <div>
    <section class="verify-section">
      <div class="container" style="max-width: 700px;">
        <div v-if="!code" class="verify-card error">
          <div class="icon">🔍</div>
          <h2>No Code Provided</h2>
          <p>Please scan the QR code on your certificate or enter the verification code in the URL.</p>
          <p class="hint">Example: thinkgreentz.vercel.app/verify?code=TGTZ-XXXXXX</p>
        </div>

        <div v-else-if="pending" class="verify-card loading">
          <div class="icon">⏳</div>
          <h2>Verifying...</h2>
        </div>

        <div v-else-if="error || !data?.valid" class="verify-card error">
          <div class="icon">❌</div>
          <h2>Certificate Not Found</h2>
          <p>The verification code <strong>{{ code }}</strong> is invalid or has not been issued.</p>
          <p class="hint">Contact Think Green Tanzania if you believe this is an error.</p>
        </div>

        <div v-else class="verify-card success">
          <div class="icon">✅</div>
          <h2>Valid Certificate</h2>
          <p class="subhead">This certificate was issued by Think Green Tanzania</p>

          <div class="cert-details">
            <div class="detail-row">
              <span class="label">Participant</span>
              <span class="value">{{ data.participant_name }}</span>
            </div>
            <div class="detail-row" v-if="data.event_name">
              <span class="label">Event</span>
              <span class="value">{{ data.event_name }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Issue Date</span>
              <span class="value">{{ data.issue_date }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Code</span>
              <span class="value code">{{ data.verification_code }}</span>
            </div>
          </div>

          <div class="seal">🌿</div>
          <p class="footer-text">Think Green Tanzania — Our Environment, Our Home</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.verify-section {
  padding: 80px 0;
  min-height: 60vh;
  display: flex;
  align-items: center;
}

.verify-card {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 24px;
  padding: 48px;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

.verify-card .icon {
  font-size: 3.5rem;
  margin-bottom: 16px;
}

.verify-card h2 {
  margin-bottom: 12px;
}

.verify-card p {
  color: var(--muted);
  line-height: 1.6;
}

.verify-card .hint {
  font-size: 0.85rem;
  margin-top: 16px;
  color: #6a8c75;
}

.success {
  border-color: rgba(45, 212, 119, 0.3);
}

.error {
  border-color: rgba(252, 165, 165, 0.3);
}

.cert-details {
  margin: 32px auto;
  max-width: 400px;
  text-align: left;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid var(--line);
  gap: 16px;
}

.detail-row:last-child {
  border-bottom: none;
}

.label {
  color: var(--muted);
  font-weight: 500;
}

.value {
  color: var(--text);
  font-weight: 600;
  text-align: right;
}

.value.code {
  font-family: monospace;
  color: var(--accent);
  font-size: 0.9rem;
}

.seal {
  font-size: 4rem;
  margin: 16px 0;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.footer-text {
  color: #6a8c75;
  font-size: 0.85rem;
  margin-top: 16px;
}
</style>
