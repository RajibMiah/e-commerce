importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js');
firebase.initializeApp({
    apiKey: "AIzaSyDiZl1fRmkK1jLXiQ2oU_N3FK43QdZw02U",
    authDomain: "ecommerce-38106.firebaseapp.com",
    projectId: "ecommerce-38106",
    storageBucket: "ecommerce-38106.appspot.com",
    messagingSenderId: "865383972607",
    appId: "1:865383972607:web:9e2dc5544d5823bb0a16ca",
    measurementId: "G-X0CL2HZTSP"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();


messaging.onBackgroundMessage(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/favicon.ico'
    };

    self.registration.showNotification(
        notificationTitle,
        notificationOptions
    ).then(r => console.log("notification response" ,r))
});