"use client"

import { useState } from "react";

import BlurText from "@/components/ui/BlurText";
import MagnetLines from "@/components/ui/MagnetLines";

export default function HomePage() {

  const [prompt, setPrompt] =
    useState("");

  const [response, setResponse] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleAskGemini = async () => {
    if (!prompt.trim()) return;

    try {
      setLoading(true);

      setResponse("");

      const res = await fetch(
        "/api/gemini",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            prompt,
          }),
        }
      );

      const data = await res.json();

      setResponse(data.text);
    } catch (error) {
      console.error(error);

      setResponse(
        "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
       <div className="mx-auto flex max-w-6xl flex-col gap-32 px-6 py-20">
        
        {/* Blur Text */}
        <section className="space-y-6">
          <BlurText
            text="Modern UI Components"
            reveal={false}
            className="text-center"
          />

          <p className="text-center text-white/60">
            Hover over the text to reveal clarity.
          </p>
        </section>

        {/* Magnet Lines */}
        <section className="rounded-3xl border border-white/10 p-10">
          <h2 className="mb-10 text-3xl font-semibold">
            Magnetic Lines
          </h2>

          <MagnetLines
            rows={14}
            className="py-10"
          />
        </section>


      <div className="w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">

        <h1 className="mb-6 text-4xl font-bold">
          Gemini 2.0 Flash
        </h1>

        <div className="space-y-4">
          <textarea
            value={prompt}
            onChange={(e) =>
              setPrompt(e.target.value)
            }
            placeholder="Ask something..."
            className="min-h-[160px] w-full rounded-2xl border border-white/10 bg-black/40 p-4 outline-none focus:border-white/30"
          />

          <button
            onClick={handleAskGemini}
            disabled={loading}
            className="rounded-2xl bg-white px-6 py-3 font-medium text-black transition hover:scale-[1.02] disabled:opacity-50"
          >
            {loading
              ? "Thinking..."
              : "Ask Gemini"}
          </button>

          {response && (
            <div className="rounded-2xl border border-white/10 bg-black/40 p-5 whitespace-pre-wrap text-white/90">
              {response}
            </div>
          )}
        </div>
      </div>


      </div>
    </main>
  );
}