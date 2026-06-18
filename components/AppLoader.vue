<template>
  <div class="loader-backdrop">
    <div class="loader-content">
      <svg viewBox="0 0 240 160" class="story-canvas" xmlns="http://www.w3.org/2000/svg">
        
        <!-- Ground Line -->
        <line x1="20" y1="140" x2="220" y2="140" stroke="#57534e" stroke-width="4" stroke-linecap="round" />

        <!-- Dustbin -->
        <g class="bin" transform="translate(160, 95)">
          <rect x="0" y="5" width="36" height="40" rx="3" fill="#4b5563" />
          <line x1="12" y1="15" x2="12" y2="35" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
          <line x1="24" y1="15" x2="24" y2="35" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
          <rect x="-4" y="0" width="44" height="6" rx="2" fill="#374151" class="bin-lid" />
        </g>

        <!-- Plant Group -->
        <g class="plant-group" transform="translate(60, 140)">
          <!-- Stem -->
          <path class="stem" d="M 0 0 C -5 -20, 10 -40, 0 -65" fill="none" stroke="#10b981" stroke-width="4" stroke-linecap="round" />
          
          <!-- Leaves -->
          <path class="leaf leaf-left" d="M -2 -25 C -15 -20, -25 -30, -2 -35 C -5 -30, -5 -25, -2 -25" fill="#34d399" />
          <path class="leaf leaf-right" d="M 2 -40 C 15 -35, 25 -45, 2 -50 C 5 -45, 5 -40, 2 -40" fill="#34d399" />
          
          <!-- Flower -->
          <g class="flower" transform="translate(0, -65)">
            <circle cx="0" cy="0" r="8" fill="#fbbf24" class="flower-center" />
            <path d="M 0 -8 C 5 -15, -5 -15, 0 -8" fill="#fcd34d" class="petal" transform="rotate(0)" />
            <path d="M 0 -8 C 5 -15, -5 -15, 0 -8" fill="#fcd34d" class="petal" transform="rotate(72)" />
            <path d="M 0 -8 C 5 -15, -5 -15, 0 -8" fill="#fcd34d" class="petal" transform="rotate(144)" />
            <path d="M 0 -8 C 5 -15, -5 -15, 0 -8" fill="#fcd34d" class="petal" transform="rotate(216)" />
            <path d="M 0 -8 C 5 -15, -5 -15, 0 -8" fill="#fcd34d" class="petal" transform="rotate(288)" />
          </g>
        </g>

        <!-- Crumpled Paper (Trash) -->
        <g class="trash">
          <path d="M -4 -4 Q 0 -6 4 -3 Q 6 0 3 4 Q -2 6 -5 2 Z" fill="#e5e7eb" stroke="#9ca3af" stroke-width="1" />
        </g>

        <!-- Pollution / Impact Aura -->
        <circle class="impact-aura" cx="85" cy="138" r="0" fill="none" stroke="#78716c" stroke-width="2" opacity="0" />

      </svg>
      <div class="loading-text">
        <span class="text-grow">Growing...</span>
        <span class="text-protect">Please protect it.</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loader-backdrop {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: var(--bg);
  color: var(--text);
  font-family: 'Inter', sans-serif;
}

.loader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.story-canvas {
  width: 300px;
  height: 200px;
  overflow: visible;
}

/* --- ANIMATIONS --- */

/* 1. Plant Growing & Wilting */
.stem {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: stemLife 6s infinite cubic-bezier(0.4, 0, 0.2, 1);
}

.leaf {
  opacity: 0;
  transform: scale(0);
  animation: leafLife 6s infinite cubic-bezier(0.4, 0, 0.2, 1);
}

.leaf-left {
  transform-origin: -2px -25px;
}

.leaf-right {
  transform-origin: 2px -40px;
}

.flower {
  opacity: 0;
  transform: scale(0);
  animation: flowerLife 6s infinite cubic-bezier(0.4, 0, 0.2, 1);
}

.flower-center, .petal {
  animation: colorFade 6s infinite cubic-bezier(0.4, 0, 0.2, 1);
}

.plant-group {
  transform-origin: 0 0;
  animation: plantWilt 6s infinite ease-in-out;
}

/* 2. Dustbin Lid */
.bin-lid {
  transform-origin: 0 6px;
  animation: lidBounce 6s infinite ease-in-out;
}

/* 3. The Trash / Paper */
.trash {
  opacity: 0;
  animation: throwPaper 6s infinite cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* 4. Pollution Impact */
.impact-aura {
  animation: toxicPulse 6s infinite ease-out;
}

/* 5. Text Swap */
.loading-text {
  margin-top: 10px;
  font-size: 0.95rem;
  letter-spacing: 1px;
  font-weight: 500;
  position: relative;
  height: 20px;
  width: 150px;
  text-align: center;
}

.text-grow {
  position: absolute;
  width: 100%;
  left: 0;
  color: var(--accent);
  animation: textGrowFade 6s infinite ease-in-out;
}

.text-protect {
  position: absolute;
  width: 100%;
  left: 0;
  color: #a8a29e;
  opacity: 0;
  animation: textProtectFade 6s infinite ease-in-out;
}


/* --- KEYFRAMES --- */

/* Plant Timeline */
@keyframes stemLife {
  0% { stroke-dashoffset: 100; stroke: #10b981; }
  15%, 40% { stroke-dashoffset: 0; stroke: #10b981; }
  /* Toxicity hits at 45% */
  50%, 85% { stroke-dashoffset: 0; stroke: #78716c; } 
  100% { stroke-dashoffset: 100; stroke: #78716c; }
}

@keyframes leafLife {
  0%, 10% { opacity: 0; transform: scale(0); fill: #34d399; }
  20%, 40% { opacity: 1; transform: scale(1); fill: #34d399; }
  50%, 85% { opacity: 1; transform: scale(0.8) rotate(-15deg); fill: #78716c; }
  95%, 100% { opacity: 0; transform: scale(0); fill: #78716c; }
}

@keyframes flowerLife {
  0%, 20% { opacity: 0; transform: scale(0); }
  30%, 40% { opacity: 1; transform: scale(1); }
  50%, 85% { opacity: 1; transform: scale(0.7) translateY(10px) rotate(20deg); }
  95%, 100% { opacity: 0; transform: scale(0); }
}

@keyframes colorFade {
  0%, 40% { fill: #fbbf24; }
  50%, 100% { fill: #a8a29e; }
}

@keyframes plantWilt {
  0%, 40% { transform: translate(60px, 140px) rotate(0deg); }
  50%, 85% { transform: translate(60px, 140px) rotate(35deg); }
  100% { transform: translate(60px, 140px) rotate(0deg); }
}

/* Paper Timeline */
@keyframes throwPaper {
  0%, 25% { opacity: 0; transform: translate(-20px, 50px) rotate(0deg) scale(0.5); }
  
  /* Flies in */
  28% { opacity: 1; transform: translate(60px, 10px) rotate(180deg) scale(1); }
  
  /* Hits the bin lid at 33% */
  33% { opacity: 1; transform: translate(145px, 80px) rotate(360deg) scale(1); }
  
  /* Bounces off the lid and lands near the plant */
  42%, 85% { opacity: 1; transform: translate(85px, 136px) rotate(600deg) scale(1.2); }
  
  95%, 100% { opacity: 0; transform: translate(85px, 136px) rotate(600deg) scale(0.5); }
}

/* Bin Lid Timeline */
@keyframes lidBounce {
  0%, 30% { transform: rotate(0deg); }
  33% { transform: rotate(-25deg); } /* Lid gets hit harder */
  38%, 100% { transform: rotate(0deg); }
}

/* Toxicity Timeline */
@keyframes toxicPulse {
  0%, 41% { r: 0; opacity: 0; }
  42% { r: 0; opacity: 0.8; stroke: #57534e; stroke-width: 4px; }
  55% { r: 50; opacity: 0; stroke: #78716c; stroke-width: 1px; }
  100% { r: 50; opacity: 0; }
}

/* Text Timeline */
@keyframes textGrowFade {
  0%, 5% { opacity: 0; transform: translateY(5px); }
  10%, 40% { opacity: 1; transform: translateY(0); }
  45%, 100% { opacity: 0; transform: translateY(-5px); }
}

@keyframes textProtectFade {
  0%, 45% { opacity: 0; transform: translateY(5px); }
  50%, 85% { opacity: 1; transform: translateY(0); }
  90%, 100% { opacity: 0; transform: translateY(-5px); }
}
</style>
