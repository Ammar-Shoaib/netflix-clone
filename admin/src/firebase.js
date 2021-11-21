import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyD6FmQSzpryXo2L1HjpGSeP_GfruWShA1A",
  authDomain: "netflix-clone-7e8d2.firebaseapp.com",
  projectId: "netflix-clone-7e8d2",
  storageBucket: "netflix-clone-7e8d2.appspot.com",
  messagingSenderId: "190519674814",
  appId: "1:190519674814:web:b0c25ee531b7f2e01f9bef",
  measurementId: "G-70XFTWSZD5",
};

firebase.initializeApp(firebaseConfig)
const storage = firebase.storage()

export default storage