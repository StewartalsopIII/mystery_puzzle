'use client'

import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button"
import { Fireworks } from 'fireworks-js'
import confetti from 'canvas-confetti';

const surroundingButtons = [
  { text: "Ne cliquez pas", lang: "French", color: "bg-red-500 hover:bg-red-600" },
  { text: "Nicht klicken", lang: "German", color: "bg-blue-500 hover:bg-blue-600" },
  { text: "No hagas clic", lang: "Spanish", color: "bg-green-500 hover:bg-green-600" },
  { text: "Non cliccare", lang: "Italian", color: "bg-yellow-500 hover:bg-yellow-600" },
  { text: "Não clique", lang: "Portuguese", color: "bg-purple-500 hover:bg-purple-600" },
  { text: "Klik ikke", lang: "Danish", color: "bg-pink-500 hover:bg-pink-600" },
  { text: "Не нажимай", lang: "Russian", color: "bg-indigo-500 hover:bg-indigo-600" },
  { text: "クリックしないで", lang: "Japanese", color: "bg-teal-500 hover:bg-teal-600" },
  { text: "不要点击", lang: "Chinese", color: "bg-orange-500 hover:bg-orange-600" },
  { text: "Älä klikkaa", lang: "Finnish", color: "bg-cyan-500 hover:bg-cyan-600" },
]

export function MultiLanguageButtons() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fireworksRef = useRef<Fireworks | null>(null);

  useEffect(() => {
    if (containerRef.current && !fireworksRef.current) {
      fireworksRef.current = new Fireworks(containerRef.current, {
        autoresize: true,
        opacity: 0.5,
        acceleration: 1.05,
        friction: 0.97,
        gravity: 1.5,
        particles: 50,
        traceLength: 3,
        traceSpeed: 10,
        explosion: 5,
        intensity: 30,
        flickering: 50,
        lineStyle: 'round',
        hue: {
          min: 0,
          max: 360
        },
      });
    }

    return () => {
      if (fireworksRef.current) {
        fireworksRef.current.stop();
      }
    };
  }, []);

  const handleFireworksClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (fireworksRef.current) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      fireworksRef.current.launch(1, { x, y });
      console.log('Firework launched at:', x, y); // Debug log
    } else {
      console.log('Fireworks not initialized'); // Debug log
    }
  };

  const handleConfettiClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left / window.innerWidth;
    const y = rect.top / window.innerHeight;
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x, y }
    });
    console.log('Confetti launched at:', x, y); // Debug log
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen" style={{ zIndex: 10 }}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Button variant="outline" className="text-lg font-bold" onClick={handleFireworksClick}>
          Don't click me
        </Button>
      </div>
      {surroundingButtons.map((btn, index) => (
        <div
          key={btn.lang}
          className="absolute"
          style={{
            top: `${50 + 40 * Math.sin(index * (2 * Math.PI) / 10)}%`,
            left: `${50 + 40 * Math.cos(index * (2 * Math.PI) / 10)}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Button
            className={`${btn.color} text-white`}
            title={`${btn.text} (${btn.lang})`}
            onClick={handleConfettiClick}
          >
            {btn.text}
          </Button>
        </div>
      ))}
    </div>
  )
}