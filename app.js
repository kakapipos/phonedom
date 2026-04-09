if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');

const fetishImg = document.getElementById('fetish-img');
const panicImg = document.getElementById('panic-img');
const panicOverlay = document.getElementById('panic-overlay');
const statusText = document.getElementById('status');
let currentImg = 1;

// --- 10S AUTO CYCLE ---
setInterval(() => {
    currentImg = currentImg >= 7 ? 1 : currentImg + 1;
    fetishImg.src = `feet${currentImg}.png`;
    panicImg.src = `feet${currentImg}.png`;
}, 10000);

// --- CLIPBOARD POISON (Every touch) ---
document.addEventListener('touchstart', () => {
    navigator.clipboard.writeText("i love sweaty feet of my goddess").catch(()=>{});
});

// --- SCREEN WAKE LOCK (Inescapable Brightness) ---
let wakeLock = null;
const requestWakeLock = async () => {
    try {
        wakeLock = await navigator.wakeLock.request('screen');
    } catch (err) {}
};

// --- VISIBILITY TRAP (Panic if minimized) ---
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        // You tried to swipe away. TRIGGER PANIC.
        if (Notification.permission === "granted") {
            navigator.serviceWorker.ready.then(reg => {
                reg.showNotification("ESCAPE DETECTED", {
                    body: "I AM WATCHING YOU. RETURN TO THE SOLES.",
                    requireInteraction: true,
                    vibrate: [500, 100, 500]
                });
            });
        }
    }
});

// --- 15S NOTIFICATION LOOP ---
function startNag() {
    setInterval(() => {
        navigator.serviceWorker.ready.then(reg => {
            reg.showNotification("Foot Worship App", {
                body: "Don't ignore the sweat.",
                icon: "icon-192.png",
                vibrate: [200, 100, 200],
                requireInteraction: true
            });
        });
    }, 15000);
}

// --- BUTTONS ---

document.getElementById('btn-lock').addEventListener('click', () => {
    document.documentElement.requestFullscreen();
    requestWakeLock();
    statusText.innerText = "STATUS: FULL LOCKDOWN";
    startNag();
    // Engage "hardware" lights
    navigator.mediaDevices.getUserMedia({video:true, audio:true}).then(s => {
        document.getElementById('spycam').srcObject = s;
    });
});

document.getElementById('btn-outburst').addEventListener('click', () => {
    // High-pitched text-to-speech loop
    const speech = new SpeechSynthesisUtterance("I am a pathetic foot slave. Look at these sweaty feet on my screen.");
    speech.volume = 1;
    speech.rate = 1.2;
    window.speechSynthesis.speak(speech);
});

document.getElementById('btn-vibrate').addEventListener('click', () => {
    // Erratic, painful-feeling vibration pattern
    setInterval(() => {
        if ("vibrate" in navigator) navigator.vibrate([10, 50, 10, 100, 10, 200]);
    }, 2000);
});

document.getElementById('btn-wa').addEventListener('click', () => {
    window.open(`https://wa.me/?text=${encodeURIComponent("I am currently jerking off to sweaty soles. Ask me about it.")}`, '_blank');
});

document.getElementById('btn-shame').addEventListener('click', () => {
    document.getElementById('main-body').classList.add('flash');
    statusText.innerText = "PUBLIC SHAME ACTIVE";
});

// Button 5 is now the cycle status (auto-active)
document.getElementById('btn-cycle').innerText = "CYCLE: ACTIVE (10s)";