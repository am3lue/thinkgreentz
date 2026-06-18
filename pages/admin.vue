<script setup>
const config = useRuntimeConfig()
const currentTab = ref('gallery')
const imgbbKey = ref(config.public.imgbbApiKey || '')

const isAuthenticated = ref(false)
const isCheckingAuth = ref(true)
const loginForm = ref({ username: '', password: '' })
const loginError = ref('')

onMounted(async () => {
  try {
    const res = await $fetch('/api/auth/me')
    isAuthenticated.value = res.authenticated
  } catch (e) {
    isAuthenticated.value = false
  } finally {
    isCheckingAuth.value = false
  }
  
  const savedKey = localStorage.getItem('imgbb_key')
  if (savedKey) imgbbKey.value = savedKey
})

const handleLogin = async () => {
  loginError.value = ''
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: loginForm.value
    })
    isAuthenticated.value = true
    refreshAll()
  } catch (e) {
    loginError.value = e.data?.message || 'Login failed'
  }
}

const handleLogout = async () => {
  await $fetch('/api/auth/logout', { method: 'POST' })
  isAuthenticated.value = false
  loginForm.value = { username: '', password: '' }
}

const saveKey = () => {
  localStorage.setItem('imgbb_key', imgbbKey.value)
}

// Fetch data from Turso via Nuxt API
const { data: galleryItems, refresh: refreshGallery } = await useAsyncData('gallery', () => isAuthenticated.value ? $fetch('/api/gallery') : Promise.resolve([]), { watch: [isAuthenticated] })
const { data: blogItems, refresh: refreshBlog } = await useAsyncData('blog', () => isAuthenticated.value ? $fetch('/api/blog') : Promise.resolve([]), { watch: [isAuthenticated] })
const { data: programsItems, refresh: refreshPrograms } = await useAsyncData('programs', () => isAuthenticated.value ? $fetch('/api/programs') : Promise.resolve([]), { watch: [isAuthenticated] })
const { data: eventsItems, refresh: refreshEvents } = await useAsyncData('events', () => isAuthenticated.value ? $fetch('/api/events') : Promise.resolve([]), { watch: [isAuthenticated] })

const refreshAll = () => {
  refreshGallery()
  refreshBlog()
  refreshPrograms()
  refreshEvents()
}

// Forms
const galleryForm = ref({ alt: '', file: null })
const blogForm = ref({ title: '', info: '', link: '', file: null })
const programForm = ref({ title: '', info: '', file: null })
const eventForm = ref({ title: '', description: '', link_url: '', start_time: '', end_time: '' })

// Previews
const galleryPreview = ref(null)
const blogPreview = ref(null)
const programPreview = ref(null)
const isUploading = ref(false)

const handleFileChange = (e, type) => {
  const file = e.target.files[0]
  if (!file) return

  if (type === 'gallery') {
    galleryForm.value.file = file
    galleryPreview.value = URL.createObjectURL(file)
  } else if (type === 'blog') {
    blogForm.value.file = file
    blogPreview.value = URL.createObjectURL(file)
  } else if (type === 'program') {
    programForm.value.file = file
    programPreview.value = URL.createObjectURL(file)
  }
}

const handleUpload = async (type) => {
  if (type !== 'event' && !imgbbKey.value) {
    alert('ImgBB API Key is missing.')
    return
  }

  let file = null
  if (type === 'gallery') file = galleryForm.value.file
  else if (type === 'blog') file = blogForm.value.file
  else if (type === 'program') file = programForm.value.file
  
  if (type !== 'event' && !file) {
    alert('Please select an image file.')
    return
  }

  isUploading.value = true

  try {
    let imageUrl = null

    // 1. Upload to ImgBB (if not event)
    if (type !== 'event') {
      const formData = new FormData()
      formData.append('image', file)

      const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey.value}`, {
        method: 'POST',
        body: formData
      })

      const imgbbResult = await imgbbResponse.json()
      if (!imgbbResult.success) throw new Error(imgbbResult.error.message)
      imageUrl = imgbbResult.data.url
    }

    // 2. Save to Turso DB via Nuxt API
    if (type === 'gallery') {
      await $fetch('/api/gallery', {
        method: 'POST',
        body: { image: imageUrl, alt: galleryForm.value.alt || 'Gallery Image' }
      })
      galleryForm.value = { alt: '', file: null }
      galleryPreview.value = null
      await refreshGallery()
    } else if (type === 'blog') {
      await $fetch('/api/blog', {
        method: 'POST',
        body: {
          image: imageUrl,
          title: blogForm.value.title || 'New Blog Post',
          info: blogForm.value.info || '',
          links: blogForm.value.link ? [{ text: 'Read More', url: blogForm.value.link }] : []
        }
      })
      blogForm.value = { title: '', info: '', link: '', file: null }
      blogPreview.value = null
      await refreshBlog()
    } else if (type === 'program') {
      await $fetch('/api/programs', {
        method: 'POST',
        body: { image: imageUrl, title: programForm.value.title, info: programForm.value.info }
      })
      programForm.value = { title: '', info: '', file: null }
      programPreview.value = null
      await refreshPrograms()
    } else if (type === 'event') {
      await $fetch('/api/events', {
        method: 'POST',
        body: { ...eventForm.value }
      })
      eventForm.value = { title: '', description: '', link_url: '', start_time: '', end_time: '' }
      await refreshEvents()
    }
    
    alert('Walaah! Save successful.')
  } catch (error) {
    alert('Operation failed: ' + error.message)
  } finally {
    isUploading.value = false
  }
}

const deleteItem = async (id, type) => {
  if (confirm('Are you sure you want to delete this item?')) {
    try {
      await $fetch(`/api/${type}/${id}`, { method: 'DELETE' })
      if (type === 'gallery') await refreshGallery()
      if (type === 'blog') await refreshBlog()
      if (type === 'programs') await refreshPrograms()
      if (type === 'events') await refreshEvents()
    } catch (e) {
      alert('Failed to delete: ' + e.message)
    }
  }
}

const moveItem = async (index, direction, type) => {
  let list = []
  if (type === 'gallery') list = [...galleryItems.value]
  if (type === 'blog') list = [...blogItems.value]
  if (type === 'programs') list = [...programsItems.value]

  if (direction === 'up' && index > 0) {
    const temp = list[index]
    list[index] = list[index - 1]
    list[index - 1] = temp
  } else if (direction === 'down' && index < list.length - 1) {
    const temp = list[index]
    list[index] = list[index + 1]
    list[index + 1] = temp
  } else {
    return
  }

  // Map to new sort orders
  const payloadItems = list.map((item, i) => ({ id: item.id, sort_order: i }))

  try {
    await $fetch('/api/reorder', {
      method: 'PUT',
      body: { table: type, items: payloadItems }
    })
    
    if (type === 'gallery') await refreshGallery()
    if (type === 'blog') await refreshBlog()
    if (type === 'programs') await refreshPrograms()
  } catch (e) {
    alert('Failed to reorder: ' + e.message)
  }
}

const currentList = computed(() => {
  if (currentTab.value === 'gallery') return galleryItems.value
  if (currentTab.value === 'blog') return blogItems.value
  if (currentTab.value === 'programs') return programsItems.value
  if (currentTab.value === 'events') return eventsItems.value
  return []
})

useReveal()
</script>

<template>
  <div class="admin-container">
    
    <div v-if="isCheckingAuth" style="text-align: center; padding: 50px;">
      <p>Loading...</p>
    </div>

    <!-- Login Form -->
    <section v-else-if="!isAuthenticated" class="reveal active" style="max-width: 400px; margin: 0 auto;">
      <div class="admin-card">
        <h2 style="text-align: center; margin-bottom: 24px;">Admin Login</h2>
        <form @submit.prevent="handleLogin" class="form-group">
          <div style="margin-bottom: 16px;">
            <label>Username</label>
            <input type="text" v-model="loginForm.username" required>
          </div>
          <div style="margin-bottom: 24px;">
            <label>Password</label>
            <input type="password" v-model="loginForm.password" required>
          </div>
          <button type="submit" class="btn primary" style="width: 100%; justify-content: center;">Login</button>
          <p v-if="loginError" style="color: #fca5a5; margin-top: 12px; text-align: center; font-size: 0.9rem;">{{ loginError }}</p>
        </form>
      </div>
    </section>

    <!-- CMS Dashboard -->
    <section v-else class="reveal active">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 16px;">
        <div>
          <h1>Content Manager</h1>
          <p class="subhead">Manage your site's dynamic content effortlessly.</p>
        </div>
        <button class="btn" @click="handleLogout" style="padding: 6px 16px;">Logout</button>
      </div>

      <div class="tabs">
        <div class="tab" :class="{ active: currentTab === 'gallery' }" @click="currentTab = 'gallery'">Gallery</div>
        <div class="tab" :class="{ active: currentTab === 'blog' }" @click="currentTab = 'blog'">Blog</div>
        <div class="tab" :class="{ active: currentTab === 'programs' }" @click="currentTab = 'programs'">Programs</div>
        <div class="tab" :class="{ active: currentTab === 'events' }" @click="currentTab = 'events'">Happenings (Events)</div>
      </div>

      <!-- GALLERY MANAGER -->
      <div v-if="currentTab === 'gallery'" class="admin-card">
        <h3>Add to Gallery</h3>
        <div class="form-group">
          <label>Image File</label>
          <div class="upload-preview">
            <img v-if="galleryPreview" :src="galleryPreview" alt="Preview">
            <span v-else style="color:var(--muted)">Preview will appear here</span>
          </div>
          <input type="file" accept="image/*" @change="handleFileChange($event, 'gallery')">
        </div>
        <div class="form-group">
          <label>Alt Text (Description)</label>
          <input type="text" v-model="galleryForm.alt" placeholder="e.g., Volunteers planting at Alpha High School">
        </div>
        <button class="btn primary" @click="handleUpload('gallery')" :disabled="isUploading">
          {{ isUploading ? 'Uploading...' : 'Upload & Save to DB' }}
        </button>
      </div>

      <!-- BLOG MANAGER -->
      <div v-else-if="currentTab === 'blog'" class="admin-card">
        <h3>New Blog Post</h3>
        <div class="form-group">
          <label>Cover Image</label>
          <div class="upload-preview">
            <img v-if="blogPreview" :src="blogPreview" alt="Preview">
            <span v-else style="color:var(--muted)">Preview will appear here</span>
          </div>
          <input type="file" accept="image/*" @change="handleFileChange($event, 'blog')">
        </div>
        <div class="form-group">
          <label>Post Title</label>
          <input type="text" v-model="blogForm.title" placeholder="e.g., Our New School Initiative">
        </div>
        <div class="form-group">
          <label>Description / Info</label>
          <textarea v-model="blogForm.info" rows="4" placeholder="Enter the blog content summary..."></textarea>
        </div>
        <div class="form-group">
            <label>External Link (Optional)</label>
            <input type="url" v-model="blogForm.link" placeholder="https://drive.google.com/...">
        </div>
        <button class="btn primary" @click="handleUpload('blog')" :disabled="isUploading">
          {{ isUploading ? 'Uploading...' : 'Upload & Save to DB' }}
        </button>
      </div>

      <!-- PROGRAMS MANAGER -->
      <div v-else-if="currentTab === 'programs'" class="admin-card">
        <h3>Add New Program</h3>
        <div class="form-group">
          <label>Cover Image</label>
          <div class="upload-preview">
            <img v-if="programPreview" :src="programPreview" alt="Preview">
            <span v-else style="color:var(--muted)">Preview will appear here</span>
          </div>
          <input type="file" accept="image/*" @change="handleFileChange($event, 'program')">
        </div>
        <div class="form-group">
          <label>Program Title</label>
          <input type="text" v-model="programForm.title" placeholder="e.g., Green Saturdays">
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea v-model="programForm.info" rows="3" placeholder="Describe the program..."></textarea>
        </div>
        <button class="btn primary" @click="handleUpload('program')" :disabled="isUploading">
          {{ isUploading ? 'Uploading...' : 'Upload & Save Program' }}
        </button>
      </div>

      <!-- EVENTS MANAGER -->
      <div v-else-if="currentTab === 'events'" class="admin-card">
        <h3>Create Happening (Event Banner)</h3>
        <div class="form-group">
          <label>Event Title</label>
          <input type="text" v-model="eventForm.title" placeholder="e.g., ECOLEADERS RISE 2025" required>
        </div>
        <div class="form-group">
          <label>Short Description</label>
          <input type="text" v-model="eventForm.description" placeholder="Join us this Saturday for..." required>
        </div>
        <div class="form-group">
          <label>Link URL (Optional)</label>
          <input type="url" v-model="eventForm.link_url" placeholder="https://...">
        </div>
        <div class="form-group" style="display:flex; gap:16px; flex-wrap: wrap;">
          <div style="flex:1; min-width: 200px;">
            <label>Start Time (When countdown says 'Starts in:')</label>
            <input type="datetime-local" v-model="eventForm.start_time" required>
          </div>
          <div style="flex:1; min-width: 200px;">
            <label>End Time (Banner disappears after this)</label>
            <input type="datetime-local" v-model="eventForm.end_time" required>
          </div>
        </div>
        <button class="btn primary" @click="handleUpload('event')" :disabled="isUploading">
          {{ isUploading ? 'Saving...' : 'Publish Event' }}
        </button>
      </div>
      
      <!-- LIST MANAGER -->
      <div class="admin-card">
          <h3>Published Items</h3>
          <p class="tiny" v-if="currentTab !== 'events'" style="margin-bottom:16px;">Use the arrows to reorder items. The top item appears first.</p>
          <div class="items-container">
              <div v-for="(item, index) in currentList" :key="item.id" class="admin-item">
                <img v-if="item.image" :src="item.image" alt="Thumb">
                <div v-else class="event-icon">📅</div>
                
                <div class="admin-item-info">
                    <strong>{{ item.title || item.alt }}</strong>
                    <p class="tiny">{{ (item.info || item.description || '').substring(0, 50) }}...</p>
                    <p v-if="currentTab === 'events'" class="tiny" style="color:var(--accent)">
                      Ends: {{ new Date(item.end_time).toLocaleString() }}
                    </p>
                </div>
                
                <div class="admin-item-actions">
                    <!-- Ordering Controls -->
                    <div v-if="currentTab !== 'events'" class="order-controls">
                      <button class="order-btn" @click="moveItem(index, 'up', currentTab)" :disabled="index === 0" title="Move Up">▲</button>
                      <button class="order-btn" @click="moveItem(index, 'down', currentTab)" :disabled="index === currentList.length - 1" title="Move Down">▼</button>
                    </div>
                    
                    <button class="delete-btn" @click="deleteItem(item.id, currentTab)">Delete</button>
                </div>
              </div>
              <div v-if="!currentList || currentList.length === 0" style="padding: 20px; text-align: center; color: var(--muted);">
                No items found.
              </div>
          </div>
      </div>
    </section>

    <div v-if="isAuthenticated" class="api-key-config admin-card">
      <label style="font-size: 0.8rem;">ImgBB API Key</label>
      <input type="password" v-model="imgbbKey" @input="saveKey" placeholder="Enter API Key..." style="font-size: 0.8rem; padding: 8px;">
      <p class="tiny">Get a free key at <a href="https://api.imgbb.com/" target="_blank">api.imgbb.com</a></p>
    </div>
  </div>
</template>

<style scoped>
.admin-container {
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
}

.admin-card {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 30px;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.tab {
  padding: 10px 20px;
  border-radius: 999px;
  border: 1px solid var(--line);
  cursor: pointer;
  color: var(--muted);
  transition: all 0.2s ease;
  white-space: nowrap;
}

.tab.active {
  background: var(--accent);
  color: #062c16;
  border-color: transparent;
  font-weight: 700;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--accent);
}

input[type="text"], 
input[type="password"], 
input[type="url"], 
input[type="datetime-local"], 
textarea {
  background: #0c1411;
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 12px;
  color: var(--text);
  width: 100%;
}

.upload-preview {
  width: 100%;
  height: 200px;
  border: 2px dashed var(--line);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  overflow: hidden;
}

.upload-preview img {
  max-height: 100%;
  border-radius: 0;
}

.admin-item {
  display: flex;
  gap: 15px;
  padding: 15px;
  border-bottom: 1px solid var(--line);
  align-items: center;
  transition: background 0.2s;
}

.admin-item:hover {
  background: rgba(255,255,255,0.02);
}

.admin-item img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
}

.event-icon {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #374151;
  border-radius: 8px;
  font-size: 1.5rem;
}

.admin-item-info {
  flex: 1;
}

.admin-item-actions {
  display: flex;
  gap: 16px;
  align-items: center;
}

.order-controls {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.order-btn {
  background: #374151;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  transition: background 0.2s;
}

.order-btn:hover:not(:disabled) {
  background: var(--accent);
  color: #000;
}

.order-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.delete-btn {
  background: transparent;
  color: #fca5a5;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 8px 12px;
  border: 1px solid #fca5a5;
  border-radius: 6px;
  transition: all 0.2s;
}

.delete-btn:hover {
  background: #fca5a5;
  color: #000;
}

.api-key-config {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    padding: 15px;
    margin: 0;
    width: 300px;
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
