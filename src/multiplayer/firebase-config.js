// Firebase configuration for ArunOS
// Project: arun-os (arun-os-fc275)
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAuth, signInAnonymously } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB76jyOWvklhhg28CbKGridktq2sC7eXpI",
  authDomain: "arun-os-fc275.firebaseapp.com",
  databaseURL: "https://arun-os-fc275-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "arun-os-fc275",
  storageBucket: "arun-os-fc275.firebasestorage.app",
  messagingSenderId: "120774503513",
  appId: "1:120774503513:web:5ff5c09915e850a1079548",
}

let app = null
let db = null
let auth = null
let userId = null

export async function initFirebase() {
  try {
    app = initializeApp(firebaseConfig)
    db = getDatabase(app)
    auth = getAuth(app)

    // Anonymous auth
    const cred = await signInAnonymously(auth)
    userId = cred.user.uid
    console.log('[ArunOS] Firebase connected. Visitor ID:', userId)
    return { db, userId }
  } catch (err) {
    console.warn('[ArunOS] Firebase init failed (offline mode):', err.message)
    return null
  }
}

export function getDb() { return db }
export function getUserId() { return userId }
