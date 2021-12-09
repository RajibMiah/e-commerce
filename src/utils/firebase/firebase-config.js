import firebase from 'firebase/app'
import 'firebase/auth' // If you need it
import 'firebase/firestore' // If you need it
import 'firebase/storage' // If you need it
import 'firebase/analytics' // If you need it
import 'firebase/performance' // If you need it
const clientCredentials = {
    apiKey: "AIzaSyDiZl1fRmkK1jLXiQ2oU_N3FK43QdZw02U",
    authDomain: "shatkora.co",
    projectId: "ecommerce-38106",
    storageBucket: "ecommerce-38106.appspot.com",
    messagingSenderId: "865383972607",
    appId: "1:865383972607:web:9e2dc5544d5823bb0a16ca",
    measurementId: "G-X0CL2HZTSP"
}

if (!firebase.apps.length) {
    firebase.initializeApp(clientCredentials)
    // Check that `window` is in scope for the analytics module!
    if (typeof window !== 'undefined') {
        // Enable analytics. https://firebase.google.com/docs/analytics/get-started
        if ('measurementId' in clientCredentials) {
            firebase.analytics()
            firebase.performance()
            firebase.auth()
        }
    }
}

export default firebase
