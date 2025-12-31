"use client";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  async function sendLetter() {
    setStatus("Sending...");

    const res = await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email })
    });

    if (res.ok) {
      setStatus("🎄 Your letter has been sent!");
    } else {
      setStatus("Something went wrong.");
    }
  }

  return (
    <main style={{ maxWidth: 600, margin: "auto", padding: 40 }}>
      <h1>Holiday Letter</h1>

      <input
        placeholder="Your name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        placeholder="Your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <button onClick={sendLetter}>Send me my letter</button>

      <p>{status}</p>
    </main>
  );
}
