import { boot } from 'quasar/wrappers'

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCYZFDlhAyTnrrLSohNf3GeXtnTGbTSU5U',
  authDomain: 'recipehub-f3ab5.firebaseapp.com',
  projectId: 'recipehub-f3ab5',
  storageBucket: 'recipehub-f3ab5.appspot.com',
  messagingSenderId: '513570892932',
  appId: '1:513570892932:web:0212280cc3cd877a0d66d1',
  measurementId: 'G-1WKDBWCB65'
}

// Initialize Firebase
const firebase = initializeApp(firebaseConfig)
const db = getFirestore(firebase)

export default boot(({ app }) => {
  app.config.globalProperties.$firebase = firebase
  app.config.globalProperties.$db = db
})

export { firebase, db }
