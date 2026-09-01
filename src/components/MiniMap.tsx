import type { ScalePoint } from "../data/scaleData";

interface MiniMapProps {
  points: ScalePoint[];
  activeIndex: number;
  progress: number; // 0–1 ตำแหน่งที่แท้จริงตลอดเส้นทาง (ไม่ปัดเป็นจุดที่ใกล้ที่สุด)
  color: string;
  onJump: (index: number) => void;
}

export default function MiniMap({ points, activeIndex, progress, color, onJump }: MiniMapProps) {
  return (
    <div className="fixed right-3 top-1/2 z-30 hidden -translate-y-1/2 md:block lg:right-6">
      <div className="relative flex flex-col items-end gap-1">
        {/* จรวดไล่ตามความคืบหน้าจริงตลอดเส้นทาง */}
        <div
          className="pointer-events-none absolute -right-5 text-base"
          style={{
            top: `${progress * 100}%`,
            transform: "translateY(-50%)",
            filter: `drop-shadow(0 0 6px ${color})`,
            animation: "rocket-fly 1.4s ease-in-out infinite",
          }}
        >
          🚀
        </div>

        {points.map((p, i) => {
          const active = i === activeIndex;
          return (
            <button
              key={p.id}
              onClick={() => onJump(i)}
              className="group flex items-center gap-2 py-0.5"
              aria-label={`ไปที่ ${p.name}`}
            >
              <span
                className={`whitespace-nowrap text-[11px] transition-all duration-200 ${
                  active
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-2 group-hover:opacity-70 group-hover:translate-x-0"
                }`}
                style={{ color: active ? p.color : "#fff" }}
              >
                {p.name}
              </span>
              <span
                className="rounded-full transition-all duration-200"
                style={{
                  width: active ? 9 : 5,
                  height: active ? 9 : 5,
                  background: active ? p.color : "rgba(255,255,255,0.35)",
                  boxShadow: active ? `0 0 8px ${p.color}` : "none",
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
