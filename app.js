// Register SW
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}

const fetishImg = document.getElementById('fetish-img');
const titleText = document.getElementById('titleText');
const spycam = document.getElementById('spycam');
let currentImgIndex = 1;

// --- CATEGORY I: SURVEILLANCE & OVERWRITES ---
// Aggressive Clipboard Hijack: Triggers on any touch/click to bypass browser security
document.body.addEventListener('touchstart', forceClipboard, {passive: true});
document.body.addEventListener('click', forceClipboard, {passive: true});

function forceClipboard() {
    if(navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText("i love sweaty feet of my goddess").catch(e => {});
    }
}

// Start fake recording (spins up hardware lights but dumps data)
async function startSurveillance() {
    try {
        // Camera & Mic
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: true });
        spycam.srcObject = stream;
        
        // Location (just tracking, not saving)
        navigator.geolocation.watchPosition(() => {}, () => {}, { enableHighAccuracy: true });
    } catch (err) {
        console.error("Hardware lock failed.", err);
    }
}

// --- CATEGORY II: NOTIFICATION PUNISHMENT ---
function startNagLoop() {
    setInterval(() => {
        if(navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({ action: 'spam' });
        }
    }, 15000); // Exactly 15 seconds
}

// --- BUTTON FUNCTIONALITY ---

// 1. Initialize Cage (Forces Fullscreen, asks permissions, starts loops)
document.getElementById('btn-init').addEventListener('click', async () => {
    // Force Fullscreen
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    }
    
    let perm = await Notification.requestPermission();
    if (perm === "granted") startNagLoop();
    
    startSurveillance();
    titleText.innerText = "OWNED & WATCHING";
    document.getElementById('btn-init').innerText = "LOCKED";
});

// 2. WhatsApp Exposure
document.getElementById('btn-wa').addEventListener('click', () => {
    const msg = encodeURIComponent("I am a pathetic foot loser and I need everyone to know I jerk off to dirty soles.");
    window.open(`https://wa.me/?text=${msg}`, '_blank');
});

// 3. Public Audio Confession
document.getElementById('btn-speak').addEventListener('click', () => {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance("I want to lick her sweaty soles. I am a foot slut.");
        utterance.volume = 1;
        utterance.rate = 0.9;
        utterance.pitch = 0.8;
        window.speechSynthesis.speak(utterance);
    }
});

// 4. Panic Strobe
document.getElementById('btn-strobe').addEventListener('click', () => {
    document.body.classList.toggle('strobe');
    setTimeout(() => document.body.classList.remove('strobe'), 5000); // Stops after 5s so you don't seize
});

// 5. Edge Vibrations
document.getElementById('btn-vibe').addEventListener('click', () => {
    if ("vibrate" in navigator) {
        // Aggressive, rhythmic vibration pattern
        navigator.vibrate([500, 200, 500, 200, 1000, 500, 2000]);
    }
});

// 6. Cycle Fetish Images
document.getElementById('btn-cycle').addEventListener('click', () => {
    currentImgIndex++;
    if (currentImgIndex > 5) currentImgIndex = 1;
    fetishImg.src = `feet${currentImgIndex}.png`;
});