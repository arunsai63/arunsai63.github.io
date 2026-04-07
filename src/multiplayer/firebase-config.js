// Firebase configuration for ArunOS
// Project: arun-os (arun-os-fc275)
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAuth, signInAnonymously } from 'firebase/auth'

const firebaseConfig = {
  // TODO: Replace with actual Firebase web app config
  // Go to Firebase Console > Project Settings > Your apps > Web app
  // Copy the config object here
  apiKey: "REPLACE_ME",
  authDomain: "arun-os-fc275.firebaseapp.com",
  databaseURL: "https://arun-os-fc275-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "arun-os-fc275",
  storageBucket: "arun-os-fc275.firebasestorage.app",
  messagingSenderId: "120774503513",
  appId: "REPLACE_ME",
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
