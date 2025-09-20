import React, { useState } from 'react';

export default function App() {
  const [scene, setScene] = useState('A serene beach at sunset with soft waves.');
  const [response, setResponse] = useState<any>(null);

  async function handleGenerate() {
    try {
      const res = await fetch('http://YOUR_DEVICE_IP:5000/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: scene })
      });
      const data = await res.json();
      setResponse(data);
    } catch (err: any) {
      setResponse({ error: err.message });
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Veo3 Frontend (GitHub Pages)</h1>
      <textarea value={scene} onChange={e=>setScene(e.target.value)} className="w-full border p-2 rounded mb-4" rows={3} />
      <button onClick={handleGenerate} className="px-4 py-2 bg-blue-600 text-white rounded">Generate</button>
      <pre className="mt-4 bg-black text-white p-3 rounded text-sm">{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
}
