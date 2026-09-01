import { useEffect, useMemo, useRef, useState } from "react";
import { SCALE_POINTS } from "./data/scaleData";
import {
  clamp,
  formatMeters,
  formatMultiplier,
  lerp,
  lerpColorHSL,
  mapRange,
} from "./utils";
import Starfield from "./components/Starfield";
import MiniMap from "./components/MiniMap";
import { ScaleIcon } from "./components/ScaleIcons";

const STEP_VH = 100; // ระยะสกอลล์ต่อหนึ่งจุดอ้างอิง (หน่วย vh)
const HUMAN_HEIGHT_M = 1.7;
const ICON_MIN_PX = 44;
const ICON_MAX_PX = 200;

const GLOBAL_MIN_LOG = Math.log10(SCALE_POINTS[0].meters);
const GLOBAL_MAX_LOG = Math.log10(SCALE_POINTS[SCALE_POINTS.length - 1].meters);

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** ขนาดไอคอนบนจอ อิงจากสเกลจริงเทียบกับช่วงทั้งหมด (10⁻¹⁸ ถึง 10²⁷ ม.) — ของจริงยิ่งใหญ่ ไอคอนยิ่งใหญ่ */
function iconPx(meters: number): number {
  return mapRange(Math.log10(meters), GLOBAL_MIN_LOG, GLOBAL_MAX_LOG, ICON_MIN_PX, ICON_MAX_PX);
}

export default function App() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const n = SCALE_POINTS.length;

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = trackRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const scrolled = clamp(-rect.top, 0, Math.max(total, 1));
        setProgress(total > 0 ? scrolled / total : 0);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const jumpTo = (targetProgress: number) => {
    const el = trackRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const targetY = el.offsetTop + clamp(targetProgress, 0, 1) * Math.max(total, 0);
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  const { pointA, pointB, frac, currentMeters, bgColor, activeIndex } = useMemo(() => {
    const idxFloat = progress * (n - 1);
    const i0 = clamp(Math.floor(idxFloat), 0, n - 2);
    const i1 = i0 + 1;
    const f = clamp(idxFloat - i0, 0, 1);
    const a = SCALE_POINTS[i0];
    const b = SCALE_POINTS[i1];
    const logA = Math.log10(a.meters);
    const logB = Math.log10(b.meters);
    const meters = 10 ** lerp(logA, logB, f);
    const color = lerpColorHSL(a.color, b.color, easeInOutCubic(f));
    return {
      pointA: a,
      pointB: b,
      frac: f,
      currentMeters: meters,
      bgColor: color,
      activeIndex: f < 0.5 ? i0 : i1,
    };
  }, [progress, n]);

  const eased = easeInOutCubic(frac);
  const ratioToHuman = currentMeters / HUMAN_HEIGHT_M;
  const isHumanScale = ratioToHuman > 0.85 && ratioToHuman < 1.18;
  const starOpacity = clamp((Math.log10(currentMeters) - 2) / 10, 0, 1);
  const starDrift = progress * 2400;

  // ตำแหน่งแนวตั้ง (% ของจอ): จุดพัก (ปัจจุบัน) อยู่เหนือเส้นประ, จุดถัดไปไต่ขึ้นมาจากใต้เส้น
  const restTop = 30;
  const exitTop = 12;
  const enterTop = 68;
  const topA = lerp(restTop, exitTop, eased);
  const topB = lerp(enterTop, restTop, eased);
  const opacityA = clamp(1 - eased * 1.3, 0, 1);
  const opacityB = clamp(eased * 1.3, 0, 1);
  const sizeA = iconPx(pointA.meters);
  const sizeB = iconPx(pointB.meters);

  return (
    <div className="relative">
      <div className="grain-overlay" />

      <a
        href="../"
        title="กลับหน้ารวมโปรเจกต์"
        className="fixed left-4 top-4 z-50 text-xs text-white/40 transition hover:text-white/80 sm:left-6 sm:top-6"
      >
        ← Panusbodee's Lab
      </a>

      {/* Hero */}
      <section className="relative flex h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, #2a1454 0%, #0c0620 55%, #05030f 100%)",
          }}
        />
        <Starfield opacity={0.8} />
        <div className="relative z-10">
          <p className="mb-3 text-sm tracking-[0.3em] text-purple-300/70 uppercase">
            Scale Explorer
          </p>
          <h1
            className="text-4xl font-bold leading-tight sm:text-6xl"
            style={{ textShadow: "0 0 40px rgba(232,121,249,0.45)" }}
          >
            ไล่ล่า<span className="text-fuchsia-400">สเกลจักรวาล</span>
          </h1>
          <p className="mx-auto mt-5 max-w-md text-sm text-white/60 sm:text-base">
            เลื่อนลงเพื่อซูมออกจาก <b className="text-white/90">ควาร์ก</b> อนุภาคเล็กจิ๋วที่สุดเท่าที่มนุษย์รู้จัก
            ไปจนถึง <b className="text-white/90">เอกภพทั้งใบ</b> ทีละก้าว
          </p>
          <button
            onClick={() => jumpTo(0)}
            className="mx-auto mt-10 flex flex-col items-center gap-1 text-white/50 transition hover:text-white"
          >
            <span className="text-xs">เลื่อนลงเพื่อเริ่ม</span>
            <span className="animate-bounce text-xl">⌄</span>
          </button>
        </div>
      </section>

      {/* Scroll-driven zoom track */}
      <div ref={trackRef} style={{ height: `${(n - 1) * STEP_VH + 100}vh` }} className="relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#03020a]">
          {/* พื้นหลังดำสนิท + แสงนวลสีของจุดปัจจุบันเรือง ๆ ตรงกลาง แทนการทาสีเต็มจอ */}
          <div
            className="absolute inset-0 transition-[background] duration-150"
            style={{
              background: `radial-gradient(ellipse 70% 55% at 50% 34%, ${bgColor}4d 0%, transparent 70%)`,
            }}
          />
          <Starfield opacity={0.55 + starOpacity * 0.3} drift={starDrift} />

          {/* จุดที่กำลังจะพ้นจอด้านบน */}
          <div
            className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center transition-none"
            style={{ top: `${topA}%`, opacity: opacityA }}
          >
            <div
              className="text-white drop-shadow-[0_0_28px_rgba(255,255,255,0.3)]"
              style={{ width: sizeA, height: sizeA }}
            >
              <ScaleIcon id={pointA.id} />
            </div>
            <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/70 sm:text-xs">
              {pointA.name}
            </p>
          </div>

          {/* จุดที่กำลังไต่ขึ้นมาจากด้านล่าง */}
          <div
            className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center transition-none"
            style={{ top: `${topB}%`, opacity: opacityB }}
          >
            <div
              className="text-white drop-shadow-[0_0_28px_rgba(255,255,255,0.3)]"
              style={{ width: sizeB, height: sizeB }}
            >
              <ScaleIcon id={pointB.id} />
            </div>
            <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/70 sm:text-xs">
              {pointB.name}
            </p>
          </div>

          {/* เส้นประ + ตัวเลขสเกลปัจจุบันตัวใหญ่ คั่นกลางคงที่ */}
          <div className="absolute inset-x-0" style={{ top: "62%" }}>
            <div className="border-t border-dashed border-white/25" />
            <div className="absolute inset-x-0 -translate-y-1/2 px-6 text-center">
              <p
                className="font-mono text-2xl font-extrabold tabular-nums text-white sm:text-4xl"
                style={{ textShadow: `0 0 30px ${bgColor}` }}
              >
                {formatMeters(currentMeters)}
              </p>
              <p className="mt-2 inline-block rounded-full border border-white/20 bg-black/40 px-3.5 py-1 text-[11px] text-white/80 backdrop-blur sm:text-xs">
                {isHumanScale
                  ? "นี่คือขนาดตัวคุณเองพอดี 🎉"
                  : ratioToHuman >= 1
                    ? `ใหญ่กว่าคุณ ${formatMultiplier(ratioToHuman)} เท่า`
                    : `เล็กกว่าคุณ ${formatMultiplier(1 / ratioToHuman)} เท่า`}
              </p>
            </div>
          </div>

          {/* bottom progress bar */}
          <div className="absolute inset-x-0 bottom-0 z-20 h-1 bg-white/10">
            <div
              className="h-full"
              style={{
                width: `${progress * 100}%`,
                background: "white",
                boxShadow: "0 0 10px rgba(255,255,255,0.8)",
                transition: "width 0.05s linear",
              }}
            />
          </div>
        </div>
      </div>

      <MiniMap
        points={SCALE_POINTS}
        activeIndex={activeIndex}
        progress={progress}
        color={bgColor}
        onJump={(i) => jumpTo(i / (n - 1))}
      />

      {/* Outro */}
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center gap-5 overflow-hidden bg-[#03020a] px-6 py-20 text-center">
        <Starfield opacity={0.6} />
        <div className="relative z-10">
          <div
            className="mx-auto text-white drop-shadow-[0_0_28px_rgba(255,255,255,0.3)]"
            style={{ width: 56, height: 56, animation: "float-bob 4s ease-in-out infinite" }}
          >
            <ScaleIcon id="universe" />
          </div>
          <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
            คุณเพิ่งเดินทางผ่านสเกลกว่า 10⁴⁵ เท่า
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/60">
            จากอนุภาคที่เล็กที่สุดเท่าที่มนุษย์รู้จัก ไปจนถึงขอบเขตของทุกสิ่งที่เรามองเห็นได้ในจักรวาล
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-8 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[#1a0b2e] transition hover:scale-105 hover:bg-fuchsia-200"
          >
            เริ่มใหม่อีกครั้ง
          </button>
        </div>
      </section>
    </div>
  );
}
