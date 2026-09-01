import type { JSX } from "react";

/**
 * ไอคอนภาพประกอบเส้น (line-art) สำหรับจุดอ้างอิงสเกลแต่ละจุด
 * แทนที่การใช้อีโมจิ — ทุกไอคอนใช้ viewBox 0 0 100 100, stroke="currentColor"
 * เพื่อให้ปรับสี/ขนาดผ่าน CSS ของ container ได้อิสระ
 */

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 3,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Quark() {
  return (
    <>
      <circle cx={50} cy={50} r={6} fill="currentColor" />
      <g {...common} strokeWidth={3.5}>
        <path d="M50 22 L50 34" />
        <path d="M50 66 L50 78" />
        <path d="M22 50 L34 50" />
        <path d="M66 50 L78 50" />
        <path d="M30 30 L38 38" />
        <path d="M62 62 L70 70" />
        <path d="M70 30 L62 38" />
        <path d="M38 62 L30 70" />
      </g>
    </>
  );
}

function Proton() {
  return (
    <>
      <circle cx={50} cy={50} r={9} fill="currentColor" />
      <ellipse cx={50} cy={50} rx={40} ry={16} {...common} />
      <ellipse cx={50} cy={50} rx={40} ry={16} {...common} transform="rotate(60 50 50)" />
    </>
  );
}

function Atom() {
  return (
    <>
      <circle cx={50} cy={50} r={7} fill="currentColor" />
      <ellipse cx={50} cy={50} rx={42} ry={17} {...common} strokeWidth={2.5} />
      <ellipse cx={50} cy={50} rx={42} ry={17} {...common} strokeWidth={2.5} transform="rotate(60 50 50)" />
      <ellipse cx={50} cy={50} rx={42} ry={17} {...common} strokeWidth={2.5} transform="rotate(120 50 50)" />
      <circle cx={91} cy={50} r={4} fill="currentColor" />
      <circle cx={29.5} cy={35.3} r={4} fill="currentColor" opacity={0.85} />
    </>
  );
}

function Dna() {
  return (
    <g {...common} strokeWidth={3}>
      <path d="M32 2 C54 16,46 34,32 50 C18 66,54 84,32 98" />
      <path d="M68 2 C46 16,54 34,68 50 C82 66,46 84,68 98" />
      <path d="M35 12 L65 12" opacity={0.55} strokeWidth={2} />
      <path d="M33 30 L67 30" opacity={0.55} strokeWidth={2} />
      <path d="M32 50 L68 50" opacity={0.55} strokeWidth={2} />
      <path d="M33 70 L67 70" opacity={0.55} strokeWidth={2} />
      <path d="M35 88 L65 88" opacity={0.55} strokeWidth={2} />
    </g>
  );
}

function Virus() {
  const spikes = [0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
    const rad = (deg * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const inner = { x: 50 + 27 * cos, y: 50 + 27 * sin };
    const outer = { x: 50 + 37 * cos, y: 50 + 37 * sin };
    const tip = { x: 50 + 40 * cos, y: 50 + 40 * sin };
    return (
      <g key={deg}>
        <line x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" />
        <circle cx={tip.x} cy={tip.y} r={3.5} fill="currentColor" />
      </g>
    );
  });
  return (
    <>
      <circle cx={50} cy={50} r={26} {...common} strokeWidth={2.5} />
      <circle cx={50} cy={50} r={26} fill="currentColor" opacity={0.12} />
      {spikes}
    </>
  );
}

function BloodCell() {
  return (
    <>
      <ellipse cx={50} cy={50} rx={37} ry={25} fill="currentColor" opacity={0.15} />
      <ellipse cx={50} cy={50} rx={37} ry={25} {...common} strokeWidth={2.5} />
      <ellipse cx={50} cy={50} rx={15} ry={9} fill="none" stroke="currentColor" strokeWidth={1.5} opacity={0.55} />
    </>
  );
}

function Hair() {
  return (
    <g {...common} strokeWidth={2.5}>
      <path d="M22 92 C34 64,44 44,40 12" />
      <path d="M32 90 C42 66,50 48,47 18" opacity={0.35} strokeWidth={1.8} />
    </g>
  );
}

function Sand() {
  return (
    <>
      <ellipse cx={38} cy={57} rx={11} ry={7} transform="rotate(-18 38 57)" fill="currentColor" opacity={0.9} />
      <ellipse cx={62} cy={46} rx={8} ry={5.5} transform="rotate(20 62 46)" fill="currentColor" opacity={0.65} />
      <ellipse cx={54} cy={68} rx={6.5} ry={4.5} transform="rotate(-8 54 68)" fill="currentColor" opacity={0.5} />
    </>
  );
}

function Ant() {
  return (
    <g>
      <g {...common} strokeWidth={2.2}>
        <path d="M20 40 L12 30" />
        <path d="M20 40 L14 42" />
        <path d="M40 55 L34 70 M40 55 L44 72 M40 55 L48 68" />
        <path d="M67 58 L62 74 M67 58 L70 76 M67 58 L76 70" />
      </g>
      <circle cx={20} cy={42} r={7} fill="currentColor" />
      <circle cx={40} cy={45} r={9} fill="currentColor" />
      <ellipse cx={66} cy={50} rx={15} ry={11} fill="currentColor" />
    </g>
  );
}

function Hand() {
  return (
    <g {...common} strokeWidth={3} fill="none">
      <path d="M32 95 C25 95 22 88 22 80 L22 55 C22 51 28 51 28 55 L28 68" />
      <path d="M28 68 L28 40 C28 36 34 36 34 40 L34 62" />
      <path d="M34 62 L34 34 C34 30 40 30 40 34 L40 62" />
      <path d="M40 62 L40 38 C40 34 46 34 46 38 L46 64" />
      <path d="M46 64 L46 48 C46 44 52 44 52 48 L52 78 C52 90 45 95 32 95 Z" />
      <path d="M22 62 C14 58 8 50 12 44 C15 40 20 42 22 47" />
    </g>
  );
}

function Human() {
  return (
    <g {...common} strokeWidth={4}>
      <circle cx={50} cy={17} r={10} fill="currentColor" stroke="none" />
      <path d="M50 27 L50 62" />
      <path d="M50 36 L28 50" />
      <path d="M50 36 L72 50" />
      <path d="M50 62 L33 96" />
      <path d="M50 62 L67 96" />
    </g>
  );
}

function Elephant() {
  return (
    <g {...common} strokeWidth={2.5}>
      <ellipse cx={22} cy={44} rx={15} ry={19} transform="rotate(-12 22 44)" />
      <ellipse cx={78} cy={44} rx={15} ry={19} transform="rotate(12 78 44)" />
      <ellipse cx={50} cy={45} rx={27} ry={24} fill="currentColor" opacity={0.06} />
      <ellipse cx={50} cy={45} rx={27} ry={24} />
      <path d="M50 63 C47 74,52 82,47 90 C45 94,39 93,40 88" />
      <path d="M40 55 C38 60,38 64,41 67" opacity={0.6} />
      <path d="M60 55 C62 60,62 64,59 67" opacity={0.6} />
      <circle cx={39} cy={39} r={2.4} fill="currentColor" stroke="none" />
      <circle cx={61} cy={39} r={2.4} fill="currentColor" stroke="none" />
    </g>
  );
}

function Whale() {
  return (
    <g {...common} strokeWidth={2.5}>
      <path d="M6 55 C10 38 30 26 52 26 C72 26 86 34 92 44 C86 46 78 44 74 40 C76 46 74 52 68 54 C60 56 40 58 24 56 C16 55 10 58 6 55 Z" />
      <path d="M92 44 L100 36 M92 46 L100 52" opacity={0.8} />
      <path d="M18 56 C14 62 8 64 2 62 C6 60 8 57 8 54" />
      <circle cx={30} cy={36} r={1.6} fill="currentColor" stroke="none" />
      <path d="M46 30 C48 32 48 36 46 38" opacity={0.5} />
    </g>
  );
}

function Field() {
  return (
    <g {...common} strokeWidth={2.5}>
      <rect x={8} y={32} width={84} height={36} rx={2} />
      <line x1={50} y1={32} x2={50} y2={68} />
      <circle cx={50} cy={50} r={9} />
      <line x1={18} y1={32} x2={18} y2={68} opacity={0.6} />
      <line x1={82} y1={32} x2={82} y2={68} opacity={0.6} />
      <line x1={8} y1={44} x2={14} y2={44} opacity={0.4} />
      <line x1={8} y1={56} x2={14} y2={56} opacity={0.4} />
      <line x1={86} y1={44} x2={92} y2={44} opacity={0.4} />
      <line x1={86} y1={56} x2={92} y2={56} opacity={0.4} />
    </g>
  );
}

function Eiffel() {
  return (
    <g {...common} strokeWidth={2.5}>
      <path d="M50 6 L50 20" />
      <path d="M38 34 L62 34 L56 20 L44 20 Z" />
      <path d="M26 60 L74 60 L58 34 L42 34 Z" />
      <path d="M14 96 L86 96 L60 60 L40 60 Z" />
      <path d="M50 20 L38 60 M50 20 L62 60" opacity={0.5} />
      <path d="M42 34 L26 60 M58 34 L74 60" opacity={0.5} />
      <line x1={14} y1={80} x2={86} y2={80} opacity={0.6} />
      <line x1={20} y1={96} x2={80} y2={60} opacity={0.35} />
      <line x1={80} y1={96} x2={20} y2={60} opacity={0.35} />
    </g>
  );
}

function Burj() {
  return (
    <g {...common} strokeWidth={2.5}>
      <path d="M50 4 L50 16" />
      <path d="M44 16 L56 16 L56 34 L44 34 Z" />
      <path d="M38 34 L62 34 L64 56 L36 56 Z" />
      <path d="M30 56 L70 56 L74 96 L26 96 Z" />
      <line x1={38} y1={68} x2={62} y2={68} opacity={0.4} />
      <line x1={34} y1={80} x2={66} y2={80} opacity={0.4} />
    </g>
  );
}

function Everest() {
  return (
    <g {...common} strokeWidth={2.5}>
      <path d="M4 90 L36 34 L52 58 L68 26 L96 90 Z" />
      <path d="M68 26 L76 40 L64 40 Z" fill="currentColor" opacity={0.85} />
      <path d="M52 58 L58 50 L64 58" opacity={0.6} />
    </g>
  );
}

function Earth() {
  return (
    <>
      <circle cx={50} cy={50} r={38} {...common} strokeWidth={2.5} />
      <ellipse cx={50} cy={50} rx={38} ry={13} fill="none" stroke="currentColor" strokeWidth={1.2} opacity={0.4} />
      <path d="M20 34 C30 28 40 30 38 40 C36 48 24 46 22 54 C20 60 30 62 28 70" fill="currentColor" opacity={0.45} stroke="none" />
      <path d="M62 24 C74 26 80 36 74 44 C82 46 84 58 74 62 C70 64 66 70 70 78" fill="currentColor" opacity={0.45} stroke="none" />
    </>
  );
}

function MoonDistance() {
  return (
    <>
      <circle cx={25} cy={56} r={17} {...common} strokeWidth={2.5} />
      <circle cx={25} cy={56} r={17} fill="currentColor" opacity={0.12} />
      <line x1={44} y1={54} x2={76} y2={44} stroke="currentColor" strokeWidth={2} strokeDasharray="4 6" opacity={0.7} />
      <circle cx={82} cy={42} r={9} {...common} strokeWidth={2} />
      <circle cx={79} cy={39} r={1.6} fill="currentColor" opacity={0.6} />
      <circle cx={85.5} cy={44.5} r={1.1} fill="currentColor" opacity={0.6} />
      <circle cx={80} cy={46} r={0.9} fill="currentColor" opacity={0.5} />
    </>
  );
}

function Sun() {
  const rays = [0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
    const rad = (deg * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const inner = { x: 50 + 26 * cos, y: 50 + 26 * sin };
    const outer = { x: 50 + 38 * cos, y: 50 + 38 * sin };
    return <line key={deg} x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} stroke="currentColor" strokeWidth={3} strokeLinecap="round" />;
  });
  return (
    <>
      <circle cx={50} cy={50} r={22} fill="currentColor" opacity={0.15} />
      <circle cx={50} cy={50} r={22} {...common} strokeWidth={2.5} />
      {rays}
    </>
  );
}

function Au() {
  return (
    <>
      <g transform="translate(20,50)">
        <circle r={13} fill="currentColor" opacity={0.15} />
        <circle r={13} {...common} strokeWidth={2.2} />
        {[0, 60, 120, 180, 240, 300].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const cos = Math.cos(rad);
          const sin = Math.sin(rad);
          return (
            <line
              key={deg}
              x1={cos * 16}
              y1={sin * 16}
              x2={cos * 21}
              y2={sin * 21}
              stroke="currentColor"
              strokeWidth={2.2}
              strokeLinecap="round"
            />
          );
        })}
      </g>
      <line x1={40} y1={50} x2={72} y2={50} stroke="currentColor" strokeWidth={2} strokeDasharray="4 6" opacity={0.7} />
      <circle cx={82} cy={50} r={10} {...common} strokeWidth={2.2} />
      <path d="M76 45 C80 43 84 45 82 49 C86 49 86 54 82 55" fill="currentColor" opacity={0.4} stroke="none" />
    </>
  );
}

function SolarSystem() {
  return (
    <g {...common} strokeWidth={1.6} opacity={0.85}>
      <circle cx={50} cy={50} r={7} fill="currentColor" stroke="none" />
      <ellipse cx={50} cy={50} rx={20} ry={8} />
      <circle cx={70} cy={50} r={2.2} fill="currentColor" stroke="none" />
      <ellipse cx={50} cy={50} rx={32} ry={13} />
      <circle cx={18} cy={50} r={2.6} fill="currentColor" stroke="none" />
      <ellipse cx={50} cy={50} rx={44} ry={18} />
      <circle cx={50} cy={68} r={2} fill="currentColor" stroke="none" />
    </g>
  );
}

function LightYear() {
  return (
    <>
      <path
        d="M18 82 C34 70 44 58 54 42"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        opacity={0.55}
      />
      <path d="M64 32 L67 41 L76 44 L67 47 L64 56 L61 47 L52 44 L61 41 Z" fill="currentColor" />
      <circle cx={64} cy={44} r={13} fill="currentColor" opacity={0.12} />
    </>
  );
}

function Proxima() {
  return (
    <>
      <circle cx={50} cy={50} r={20} fill="currentColor" opacity={0.12} />
      <path d="M50 22 L55 42 L75 47 L55 52 L50 72 L45 52 L25 47 L45 42 Z" fill="currentColor" />
      <path d="M76 24 L78 30 L84 32 L78 34 L76 40 L74 34 L68 32 L74 30 Z" fill="currentColor" opacity={0.6} />
    </>
  );
}

function MilkyWay() {
  return (
    <>
      <ellipse cx={50} cy={50} rx={11} ry={6} fill="currentColor" opacity={0.85} />
      <path
        d="M50 50 C30 42 18 46 14 62 C24 58 34 60 42 66"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        opacity={0.75}
      />
      <path
        d="M50 50 C70 58 82 54 86 38 C76 42 66 40 58 34"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        opacity={0.75}
      />
      {[[18, 30], [82, 68], [30, 78], [70, 22], [12, 50]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={1.3} fill="currentColor" opacity={0.6} />
      ))}
    </>
  );
}

function Andromeda() {
  return (
    <g transform="rotate(-16 50 50)">
      <ellipse cx={50} cy={50} rx={44} ry={11} fill="currentColor" opacity={0.12} />
      <ellipse cx={50} cy={50} rx={44} ry={11} fill="none" stroke="currentColor" strokeWidth={2} opacity={0.7} />
      <ellipse cx={50} cy={50} rx={11} ry={4.5} fill="currentColor" opacity={0.9} />
      <circle cx={22} cy={50} r={1.2} fill="currentColor" opacity={0.6} />
      <circle cx={78} cy={50} r={1.2} fill="currentColor" opacity={0.6} />
    </g>
  );
}

function Universe() {
  const dots: [number, number, number][] = [
    [30, 25, 1.6], [68, 20, 1.2], [80, 40, 1.8], [85, 65, 1.3],
    [65, 82, 1.6], [35, 85, 1.2], [16, 65, 1.7], [18, 35, 1.3],
    [50, 15, 1.2], [50, 85, 1.2], [15, 50, 1.2], [85, 50, 1.2],
    [40, 45, 1.8], [62, 55, 1.5], [45, 65, 1.2],
  ];
  return (
    <>
      <circle cx={50} cy={50} r={44} fill="none" stroke="currentColor" strokeWidth={1.5} strokeDasharray="3 6" opacity={0.5} />
      {dots.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="currentColor" opacity={0.75} />
      ))}
      <circle cx={50} cy={50} r={3} fill="currentColor" />
    </>
  );
}

const SCALE_ICONS: Record<string, () => JSX.Element> = {
  quark: Quark,
  proton: Proton,
  atom: Atom,
  dna: Dna,
  virus: Virus,
  "blood-cell": BloodCell,
  hair: Hair,
  sand: Sand,
  ant: Ant,
  hand: Hand,
  human: Human,
  elephant: Elephant,
  whale: Whale,
  field: Field,
  eiffel: Eiffel,
  burj: Burj,
  everest: Everest,
  earth: Earth,
  "moon-distance": MoonDistance,
  sun: Sun,
  au: Au,
  "solar-system": SolarSystem,
  "light-year": LightYear,
  proxima: Proxima,
  "milky-way": MilkyWay,
  andromeda: Andromeda,
  universe: Universe,
};

export function ScaleIcon({ id }: { id: string }) {
  const IconComponent = SCALE_ICONS[id];
  if (!IconComponent) return null;
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden>
      <IconComponent />
    </svg>
  );
}
