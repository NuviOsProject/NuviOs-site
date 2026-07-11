<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCshZe0JZibINfmOamUrnYPiBfVifNpiaA",
    authDomain: "nuvios.firebaseapp.com",
    projectId: "nuvios",
    storageBucket: "nuvios.firebasestorage.app",
    messagingSenderId: "595168231407",
    appId: "1:595168231407:web:81a026964f9e6571d7c01a",
    measurementId: "G-M1DGCYGZRV"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
