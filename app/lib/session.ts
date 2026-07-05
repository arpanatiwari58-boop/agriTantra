"use client";

export interface StoredUser {
  name: string;
  email: string;
  uid: string;
}

const SESSION_KEY = "agritantra_user";

export function getStoredUser(): StoredUser | null {
  if (typeof window === "undefined") return null;

  const rawValue = localStorage.getItem(SESSION_KEY);
  if (!rawValue) return null;

  try {
    return JSON.parse(rawValue) as StoredUser;
  } catch {
    return null;
  }
}

export function setStoredUser(user: StoredUser) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearStoredUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
}
