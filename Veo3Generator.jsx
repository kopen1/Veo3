import React, { useState } from 'react';

export default function Veo3Generator() {
  const [scene, setScene] = useState('A serene beach at sunset with soft waves.');
  const [duration, setDuration] = useState(8);
  const [aspect, setAspect] = useState('16:9');
  const [voiceText, setVoiceText] = useState('Welcome to our short film.');
  const [voiceModel, setVoiceModel] = useState('female_1');
  const [music, setMusic] = useState('soft_ambient');
  const [sfx, setSfx] = useState('waves');
  const [seed, setSeed] = useState('');
  const [apiKey, setApiKey] = useState(''); // 🔑 kolom Google API Key
  const [responsePreview, setResponsePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  function buildVeoPrompt() {
    return {
      model: 'veo-3.0-generate-preview',
      generate: {
        duration_seconds: Number(duration),
        aspect_ratio: aspect,
        resolution: aspect === '9:16' ? '720x1280' : '1280x720',
        seed: seed || undefined,
      },
      instructions: {
        visual: {
          description: scene,
          camera: {
            shots: [
              { type: 'establishing', motion: 'slow_dolly_out', duration: 2 },
              { type: 'closeup', subject: 'waves_and_hands', duration: 3 },
              { type: 'wide', motion: 'pan_left', duration: 3 }
            ]
          },
          style: {
            cinematography: 'cinematic, golden_hour',
            color_grade: 'warm',
            realism: 'photorealistic'
          }
        },
        audio: {
          dialogue: {
            text: voiceText,
            voice: voiceModel,
            controls: { rate: 1.0, pitch: 0.0, emotion: 'calm' }
          },
          music: { mood: music, volume: 0.3 },
          sfx: [{ name: sfx, timing: 'natural', mix: 0.6 }]
        }
      },
      options: {
        watermark: true,
        allow_choreography: true
      }
    };
  }

  async function handleGenerate() {
    setLoading(true);
    setResponsePreview(null);
    const payload = buildVeoPrompt();

    try {
      const res = await fetch('/generate', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}` // 🔑 API Key ikut dikirim
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      setResponsePreview(data);
    } catch (err) {
      setResponsePreview({ error: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Veo 3 Prompt Generator</h1>

      {/* Kolom API Key */}
      <label className="block mb-2">Google API Key</label>
      <input
        type="password"
        value={apiKey}
        onChange={e => setApiKey(e.target.value)}
        placeholder="Masukkan Google API Key"
        className="w-full p-2 border rounded mb-4"
      />

      <label className="block mb-2">Scene description</label>
      <textarea value={scene} onChange={e=>setScene(e.target.value)} className="w-full p-2 border rounded mb-4" rows={3} />

      {/* kolom lain tetap sama */}
      ...
    </div>
  );
}
