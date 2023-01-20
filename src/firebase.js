
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBVPzF_YiEGQIZDi0tIMeR8eGhLNBytExk",
  authDomain: "mernstack-cabc7.firebaseapp.com",
  projectId: "mernstack-cabc7",
  storageBucket: "mernstack-cabc7.appspot.com",
  messagingSenderId: "944505990076",
  appId: "1:944505990076:web:3c0e78e1d4312f7c3819b9"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase