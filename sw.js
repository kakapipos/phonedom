self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(clients.claim()));

self.addEventListener('message', (event) => {
    if (event.data && event.data.action === 'spam') {
        self.registration.showNotification("Foot Worship App", {
            body: "Look at the soles. Don't ignore your goddess.",
            icon: "icon-192.png",
            requireInteraction: true,
            vibrate: [300, 100, 300],
            priority: 'max',
            visibility: 'public' // Forces it to show on the lock screen
        });
    }
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(windowClients => {
            if (windowClients.length > 0) {
                windowClients[0].focus();
            } else {
                clients.openWindow('/');
            }
        })
    );
});