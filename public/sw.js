self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || '나눗 (Nanoot)';
  const options = {
    body: data.body || '새로운 알림이 있습니다.',
    icon: '/icon-192x192.png', // 앱 아이콘 경로 확인 필요
    badge: '/badge-72x72.png',
    data: data.url || '/',
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data)
  );
});
