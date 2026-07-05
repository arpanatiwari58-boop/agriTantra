"use client";

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-F8UcQCX22tpF42ZjDnGLCQnnK_dPGNo",
  authDomain: "study-help-d41f0.firebaseapp.com",
  projectId: "study-help-d41f0",
  storageBucket: "study-help-d41f0.firebasestorage.app",
  messagingSenderId: "420936006288",
  appId: "1:420936006288:web:2e9d23bed456927099f615",
  measurementId: "G-LGR9M9HG1H",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export let analytics: Analytics | undefined;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export const firebaseConfigured = true;
