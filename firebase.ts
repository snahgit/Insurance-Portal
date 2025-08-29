import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDOnl-ApJzx17Je8XEjgYbZoEQFPAQyvc4",
  authDomain: "test-one-6557e.firebaseapp.com",
  projectId: "test-one-6557e",
  storageBucket: "test-one-6557e.firebasestorage.app",
  messagingSenderId: "340437218484",
  appId: "1:340437218484:web:0a2e83fc26361edbf8d3e1",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging };
