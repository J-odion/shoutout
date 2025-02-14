import React, { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";

interface Shoutout {
  name: string; // Required field
  message: string;
}

interface ShoutoutDisplayProps {
  shoutouts: Shoutout[];
}

const ShoutoutsDisplay: React.FC<ShoutoutDisplayProps> = ({ shoutouts }) => {
  const [positions, setPositions] = useState<
    { top: number; left: number; rotate: number; color: string }[]
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const randomizePositions = shoutouts.map(() => ({
      top: Math.random() * 60 + 20,
      left: Math.random() * 80 + 10,
      rotate: Math.random() * 30 - 15,
      color: ["#ff7675", "#fdcb6e", "#00cec9", "#6c5ce7", "#e84393"][
        Math.floor(Math.random() * 5)
      ],
    }));
    setPositions(randomizePositions);
  }, [shoutouts]);

  const downloadShoutouts = async () => {
    if (!containerRef.current) return;

    const canvas = await html2canvas(containerRef.current, {
      backgroundColor: null,
      scale: 2,
    });

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "shoutouts.png";
    link.click();
  };

  return (
    <div className="relative min-h-screen bg-none flex flex-col items-center justify-center">
      <div ref={containerRef} className="relative w-[70vw] h-[60vh] bg-[#161b22]/60 rounded-lg shadow-lg overflow-hidden">
        <h2 className="text-white text-lg font-semibold text-center py-4">
          Your Shoutouts
        </h2>
        {shoutouts.map((shoutout, index) => (
          <div
            key={index}
            className="absolute p-3 bg-[#22272e] rounded-md shadow-md"
            style={{
              top: `${positions[index]?.top}%`,
              left: `${positions[index]?.left}%`,
              transform: `rotate(${positions[index]?.rotate}deg)`,
              color: positions[index]?.color,
            }}
          >
            {shoutout.message}
          </div>
        ))}
      </div>
      <button
        onClick={downloadShoutouts}
        className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700"
      >
        Download Shoutouts
      </button>
    </div>
  );
};

export default ShoutoutsDisplay;
