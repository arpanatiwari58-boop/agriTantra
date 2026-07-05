"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { ArrowLeft, Loader2, Lock, LogIn, Mail, UserPlus, User } from "lucide-react";
import { db } from "../lib/firebase";
import { getStoredUser, setStoredUser } from "../lib/session";

type AuthMode = "login" | "signup";

export default function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const existingUser = getStoredUser();
    if (existingUser) {
      router.replace("/");
    }
  }, [router]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      if (mode === "signup") {
        const existingUsers = await getDocs(query(collection(db, "users"), where("email", "==", email)));
        if (!existingUsers.empty) {
          setMessage("An account with this email already exists.");
          return;
        }

        const userRef = doc(collection(db, "users"));
        await setDoc(userRef, {
          name,
          email,
          password,
          uid: userRef.id,
          createdAt: serverTimestamp(),
          lastLoginAt: serverTimestamp(),
        });
        setStoredUser({
          name,
          email,
          uid: userRef.id,
        });
        setMessage("Account created successfully.");
      } else {
        const usersSnapshot = await getDocs(collection(db, "users"));
        const matchedUser = usersSnapshot.docs.find((userDoc) => {
          const userData = userDoc.data() as { email?: string; password?: string };
          return userData.email === email && userData.password === password;
        });

        if (!matchedUser) {
          setMessage("Invalid email or password.");
          return;
        }

        await updateDoc(doc(db, "users", matchedUser.id), {
          lastLoginAt: serverTimestamp(),
        });

        const userData = matchedUser.data() as { name?: string; email?: string };
        setStoredUser({
          name: userData.name ?? "User",
          email: userData.email ?? email,
          uid: matchedUser.id,
        });
        setMessage("Signed in successfully.");
      }

      router.replace("/");
    } catch (error: any) {
      if (error?.code === "auth/configuration-not-found") {
        setMessage(
          "Firebase Email/Password sign-in is not enabled for this project. Turn on Authentication > Sign-in method > Email/Password in Firebase Console, then try again."
        );
      } else {
        setMessage(error?.message || "Authentication failed.");
      }
    } finally {
      setLoading(false);
    }
  }

  const title = mode === "signup" ? "Create your account" : "Sign in to continue";
  const description =
    mode === "signup"
      ? "Enter your name, email, and password to create access to the system."
      : "Use your email and password to enter the dashboard.";

  return (
    <div style={{ minHeight: "100vh", background: "#F4F1EB", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", color: "#1C2B1A" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "28px 40px" }}>
        <Link href={mode === "signup" ? "/login" : "/signup"} style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", color: "#2D6A2D", fontWeight: 700, marginBottom: 28 }}>
          <ArrowLeft size={16} /> {mode === "signup" ? "Go to login" : "Go to sign up"}
        </Link>

        <div style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 24, alignItems: "stretch" }}>
          <div style={{ background: "linear-gradient(135deg, #2D6A2D 0%, #3D8B3D 55%, #4CAF50 100%)", borderRadius: 28, padding: 34, color: "#fff", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", right: -50, top: -50, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
            <div style={{ position: "absolute", right: 60, bottom: -60, width: 140, height: 140, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
            <div style={{ position: "relative" }}>
              <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,0.65)", marginBottom: 10 }}>Authentication Gate</div>
              <h1 style={{ fontSize: 36, lineHeight: 1.08, margin: "0 0 12px", fontWeight: 800 }}>{title}</h1>
              <p style={{ margin: 0, color: "rgba(255,255,255,0.82)", fontSize: 14, maxWidth: 560 }}>{description}</p>
            </div>
          </div>

          <div style={{ background: "#fff", borderRadius: 28, padding: 28, border: "1px solid #E8E2D8", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
            <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
              {mode === "signup" && (
                <label style={{ display: "grid", gap: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#1C2B1A", display: "flex", alignItems: "center", gap: 8 }}><User size={14} color="#2D6A2D" /> Name</span>
                  <input value={name} onChange={(e) => setName(e.target.value)} type="text" required placeholder="Your name" style={{ width: "100%", boxSizing: "border-box", padding: "14px 16px", borderRadius: 14, border: "1px solid #E8E2D8", background: "#F8F6F2", fontSize: 14, outline: "none", fontFamily: "inherit" }} />
                </label>
              )}

              <label style={{ display: "grid", gap: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#1C2B1A", display: "flex", alignItems: "center", gap: 8 }}><Mail size={14} color="#2D6A2D" /> Email</span>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="you@example.com" style={{ width: "100%", boxSizing: "border-box", padding: "14px 16px", borderRadius: 14, border: "1px solid #E8E2D8", background: "#F8F6F2", fontSize: 14, outline: "none", fontFamily: "inherit" }} />
              </label>

              <label style={{ display: "grid", gap: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#1C2B1A", display: "flex", alignItems: "center", gap: 8 }}><Lock size={14} color="#D4893A" /> Password</span>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required placeholder="••••••••" style={{ width: "100%", boxSizing: "border-box", padding: "14px 16px", borderRadius: 14, border: "1px solid #E8E2D8", background: "#F8F6F2", fontSize: 14, outline: "none", fontFamily: "inherit" }} />
              </label>

              <button type="submit" disabled={loading} style={{ padding: "14px 16px", borderRadius: 14, border: "none", background: loading ? "#BFD8BF" : "#2D6A2D", color: "#fff", fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                {loading ? <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> : mode === "signup" ? "Create account" : "Login"}
              </button>
            </form>

            <div style={{ marginTop: 18, display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <Link href={mode === "signup" ? "/login" : "/signup"} style={{ color: "#2D6A2D", textDecoration: "none", fontSize: 13, fontWeight: 700 }}>
                {mode === "signup" ? "Already have an account? Login" : "Need an account? Sign up"}
              </Link>
              <Link href="/" style={{ color: "#6B7A69", textDecoration: "none", fontSize: 13, fontWeight: 700 }}>
                Back to dashboard
              </Link>
            </div>

            {message && (
              <div style={{ marginTop: 16, padding: 14, borderRadius: 14, background: message.toLowerCase().includes("fail") ? "#FFF5F2" : "#FFFBF0", border: message.toLowerCase().includes("fail") ? "1px solid #FFD5C8" : "1px solid #FFE4B0", color: message.toLowerCase().includes("fail") ? "#DC6040" : "#D4893A", fontSize: 13, fontWeight: 600 }}>
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
