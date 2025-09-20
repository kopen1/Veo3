import React, { useState } from "react";

export default function App() {
  const [apiKey, setApiKey] = useState("");
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  const handleGenerate = async () => {
    if (!apiKey || !prompt) {
      alert("Isi API key dan prompt dulu!");
      return;
    }
    // sementara dummy, nanti sambungkan ke backend
    setResult(`API Key: ${apiKey}\nPrompt: ${prompt}\n(Hasil dummy, sambungkan ke backend/vertex ai)`);
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>🎬 Veo3 Generator</h1>
      <div>
        <label>Google API Key:</label><br />
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Masukkan API Key..."
          style={{ width: "300px", padding: "5px" }}
        />
      </div>
      <div style={{ marginTop: "1rem" }}>
        <label>Prompt:</label><br />
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Deskripsi video..."
          rows={4}
          style={{ width: "300px", padding: "5px" }}
        />
      </div>
      <button onClick={handleGenerate} style={{ marginTop: "1rem", padding: "10px 20px" }}>
        Generate
      </button>
      {result && (
        <pre style={{ background: "#f4f4f4", marginTop: "1rem", padding: "1rem" }}>{result}</pre>
      )}
    </div>
  );
}
