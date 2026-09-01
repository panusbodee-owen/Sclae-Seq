import { useState } from "react";

interface StarfieldProps {
  opacity: number;
  /** ระยะเลื่อนแนวตั้ง (px) สำหรับเอฟเฟกต์พารัลแลกซ์ตามสกอลล์ — ไม่ใส่ก็ได้ (ดาวนิ่ง) */
  drift?: number;
}

interface Star {
  top: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  depth: number; // 0 = ไกล/เล็ก/ขยับน้อย, 1 = ใกล้/ใหญ่/ขยับเยอะ
}

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, () => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    delay: Math.random() * 4,
    duration: Math.random() * 3 + 2,
    depth: Math.random(),
  }));
}

export default function Starfield({ opacity, drift = 0 }: StarfieldProps) {
  // lazy initializer: สุ่มตำแหน่งดาวแค่ครั้งเดียวตอน mount ไม่คำนวณใหม่ทุก render
  const [stars] = useState<Star[]>(() => generateStars(160));

  return (
    <div
      className="pointer-events-none absolute inset-0 transition-opacity duration-500"
      style={{ opacity }}
      aria-hidden
    >
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size * (0.6 + s.depth),
            height: s.size * (0.6 + s.depth),
            opacity: 0.4 + s.depth * 0.6,
            transform: `translateY(${drift * (0.3 + s.depth * 0.9)}px)`,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
