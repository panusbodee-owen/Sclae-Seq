const SUPERSCRIPT: Record<string, string> = {
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
  "-": "⁻",
};

function toSuperscript(n: number): string {
  return String(n)
    .split("")
    .map((c) => SUPERSCRIPT[c] ?? c)
    .join("");
}

/** จัดรูปแบบความยาวเป็นเมตรให้อ่านง่าย เช่น "8,849 เมตร" หรือ "1.70 × 10⁻¹⁵ เมตร" */
export function formatMeters(meters: number): string {
  if (meters >= 1e-3 && meters < 1e6) {
    if (meters < 1) return `${meters.toFixed(meters < 0.01 ? 4 : 3)} เมตร`;
    if (meters < 100) return `${meters.toFixed(2)} เมตร`;
    return `${Math.round(meters).toLocaleString("th-TH")} เมตร`;
  }
  const exp = Math.floor(Math.log10(meters));
  const mantissa = meters / 10 ** exp;
  return `${mantissa.toFixed(2)} × 10${toSuperscript(exp)} เมตร`;
}

/** จัดรูปแบบตัวเลขจำนวนเท่า เช่น "1,204 เท่า" หรือ "≈ 10⁴³ เท่า" */
export function formatMultiplier(ratio: number): string {
  if (ratio < 10) return `${ratio.toFixed(1)}`;
  if (ratio < 1e6) return Math.round(ratio).toLocaleString("th-TH");
  const exp = Math.floor(Math.log10(ratio));
  return `≈ 10${toSuperscript(exp)}`;
}

export function clamp(v: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, v));
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** แปลงค่า v จากช่วง [inMin, inMax] ไปยัง [outMin, outMax] แบบ clamp ไม่ให้หลุดช่วง */
export function mapRange(
  v: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  const t = clamp((v - inMin) / (inMax - inMin), 0, 1);
  return lerp(outMin, outMax, t);
}

function hexToRgb(hex: string): [number, number, number] {
  const v = hex.replace("#", "");
  return [
    parseInt(v.slice(0, 2), 16),
    parseInt(v.slice(2, 4), 16),
    parseInt(v.slice(4, 6), 16),
  ];
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  switch (max) {
    case r:
      h = (g - b) / d + (g < b ? 6 : 0);
      break;
    case g:
      h = (b - r) / d + 2;
      break;
    default:
      h = (r - g) / d + 4;
  }
  return [h * 60, s, l];
}

function hexToHsl(hex: string): [number, number, number] {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHsl(r, g, b);
}

/** วนหา “ทางลัด” ของมุมสี (hue) เพื่อไม่ให้ไล่สีวนอ้อมทิศตรงข้าม */
function lerpHue(h1: number, h2: number, t: number): number {
  const diff = ((h2 - h1 + 540) % 360) - 180;
  return (h1 + diff * t + 360) % 360;
}

/** ไล่สีแบบ HSL ให้ผ่านโทนสดตลอดทาง แทนที่จะเละเป็นสีเทากลางทางแบบ RGB lerp ตรงๆ */
export function lerpColorHSL(hexA: string, hexB: string, t: number): string {
  const [h1, s1, l1] = hexToHsl(hexA);
  const [h2, s2, l2] = hexToHsl(hexB);
  const h = lerpHue(h1, h2, t);
  const s = lerp(s1, s2, t) * 100;
  const l = lerp(l1, l2, t) * 100;
  return `hsl(${h.toFixed(1)}, ${s.toFixed(1)}%, ${l.toFixed(1)}%)`;
}
