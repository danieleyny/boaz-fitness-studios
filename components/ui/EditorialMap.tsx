"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { brand } from "@/lib/copy";

/**
 * Upper East Side — top-down architectural plan view.
 *
 * Each avenue-street block is filled with individual building footprints:
 * brownstone rows on the side-street frontages (west of Park Ave), prewar
 * apartment buildings on the east avenues (3rd / 2nd / 1st), and larger
 * corner buildings at the intersections. Central Park sits on the left with
 * the Lake and winding paths; the East River laps the right edge.
 *
 * Generally accurate to the neighborhood, stylized for legibility. The Boaz
 * footprint is highlighted in gold between 5th and Madison on 73rd.
 */

const V = {
  width: 1000,
  height: 620,
  avenues: [
    { x: 305, name: "5th Ave" },
    { x: 390, name: "Madison" },
    { x: 480, name: "Park Ave" },
    { x: 570, name: "Lexington" },
    { x: 660, name: "3rd Ave" },
    { x: 750, name: "2nd Ave" },
    { x: 840, name: "1st Ave" },
  ],
  streets: [
    { y: 70, name: "77th St" },
    { y: 135, name: "76th St" },
    { y: 200, name: "75th St" },
    { y: 265, name: "74th St" },
    { y: 330, name: "73rd St", highlight: true },
    { y: 395, name: "72nd St" },
    { y: 460, name: "71st St" },
    { y: 525, name: "70th St" },
  ],
  parkRightEdge: 290,
  riverLeftEdge: 905,
};

// Boaz footprint: south edge of the 74–73rd block, a few lots east of 5th Ave.
// Facing south onto 73rd Street.
const BOAZ = { x: 326, y: 318, w: 7, h: 12 };
const MARKER = { x: BOAZ.x + BOAZ.w / 2, y: BOAZ.y + BOAZ.h / 2 };

// Seeded PRNG so building layouts are stable between SSR and CSR (and across
// re-renders). Building widths/heights vary per block without hydration drift.
function rng(seed: number) {
  let s = Math.abs(seed) % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

type Building = {
  x: number;
  y: number;
  w: number;
  h: number;
  kind: "brownstone" | "corner" | "apartment";
};

function blockBuildings(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  colIdx: number,
  rowIdx: number
): Building[] {
  const w = x2 - x1;
  const h = y2 - y1;
  if (w < 8 || h < 8) return [];
  const r = rng(colIdx * 1000 + rowIdx * 37 + 91);
  const out: Building[] = [];

  // UES character by column: west avenues (5th / Madison / Park) are mostly
  // townhouses & brownstones; east avenues (Lex / 3rd / 2nd / 1st) shift to
  // prewar and modern apartment towers.
  const isWest = colIdx <= 1;
  const isEast = colIdx >= 4;

  const cornerSize = Math.min(11, Math.min(w, h) * 0.22);
  const brownstoneW = isWest ? 6 : isEast ? 9 : 7;
  const rowDepth = Math.min(h / 2 - 1.6, isEast ? 18 : 14);
  const colDepth = Math.min(w / 2 - 1.6, isEast ? 18 : 14);

  // Corner buildings (4 per block, slightly larger)
  for (const c of [
    { x: x1 + 0.5, y: y1 + 0.5 },
    { x: x2 - cornerSize - 0.5, y: y1 + 0.5 },
    { x: x1 + 0.5, y: y2 - cornerSize - 0.5 },
    { x: x2 - cornerSize - 0.5, y: y2 - cornerSize - 0.5 },
  ]) {
    out.push({
      x: c.x,
      y: c.y,
      w: cornerSize,
      h: cornerSize,
      kind: "corner",
    });
  }

  // Top row (facing north side street)
  const edgeS = x1 + cornerSize + 1;
  const edgeE = x2 - cornerSize - 1;
  if (edgeE - edgeS > 4) {
    const count = Math.max(2, Math.floor((edgeE - edgeS) / brownstoneW));
    const bw = (edgeE - edgeS) / count;
    for (let i = 0; i < count; i++) {
      const bh = rowDepth * (0.72 + r() * 0.38);
      const isApt = isEast && r() > 0.58;
      out.push({
        x: edgeS + i * bw + 0.3,
        y: y1 + 0.5,
        w: bw - 0.6,
        h: isApt ? bh * 1.15 : bh,
        kind: isApt ? "apartment" : "brownstone",
      });
    }
  }

  // Bottom row (facing south side street)
  if (edgeE - edgeS > 4) {
    const count = Math.max(2, Math.floor((edgeE - edgeS) / brownstoneW));
    const bw = (edgeE - edgeS) / count;
    for (let i = 0; i < count; i++) {
      const bh = rowDepth * (0.72 + r() * 0.38);
      const isApt = isEast && r() > 0.58;
      const fh = isApt ? bh * 1.15 : bh;
      out.push({
        x: edgeS + i * bw + 0.3,
        y: y2 - fh - 0.5,
        w: bw - 0.6,
        h: fh,
        kind: isApt ? "apartment" : "brownstone",
      });
    }
  }

  // Left edge (along west avenue)
  const sideS = y1 + cornerSize + 1;
  const sideE = y2 - cornerSize - 1;
  if (sideE - sideS > 4 && h > 48) {
    const count = Math.max(2, Math.floor((sideE - sideS) / brownstoneW));
    const bh = (sideE - sideS) / count;
    for (let i = 0; i < count; i++) {
      const bw = colDepth * (0.6 + r() * 0.45);
      out.push({
        x: x1 + 0.5,
        y: sideS + i * bh + 0.3,
        w: bw,
        h: bh - 0.6,
        kind: isEast ? "apartment" : "brownstone",
      });
    }
  }

  // Right edge (along east avenue)
  if (sideE - sideS > 4 && h > 48) {
    const count = Math.max(2, Math.floor((sideE - sideS) / brownstoneW));
    const bh = (sideE - sideS) / count;
    for (let i = 0; i < count; i++) {
      const bw = colDepth * (0.6 + r() * 0.45);
      out.push({
        x: x2 - bw - 0.5,
        y: sideS + i * bh + 0.3,
        w: bw,
        h: bh - 0.6,
        kind: isEast ? "apartment" : "brownstone",
      });
    }
  }

  return out;
}

function allBuildings(): Building[] {
  const cols = V.avenues.length - 1;
  const rows: { y1: number; y2: number }[] = [];
  rows.push({ y1: 0, y2: V.streets[0].y });
  for (let i = 0; i < V.streets.length - 1; i++) {
    rows.push({ y1: V.streets[i].y, y2: V.streets[i + 1].y });
  }
  rows.push({ y1: V.streets[V.streets.length - 1].y, y2: V.height });
  const all: Building[] = [];
  for (let c = 0; c < cols; c++) {
    for (let ri = 0; ri < rows.length; ri++) {
      all.push(
        ...blockBuildings(
          V.avenues[c].x,
          rows[ri].y1,
          V.avenues[c + 1].x,
          rows[ri].y2,
          c,
          ri
        )
      );
    }
  }
  return all;
}

const BUILDINGS = allBuildings();

// Styling per building kind (fill opacity, stroke opacity, stroke width)
const KIND_STYLES = {
  brownstone: { fill: 0.05, stroke: 0.22, sw: 0.55 },
  corner: { fill: 0.075, stroke: 0.3, sw: 0.7 },
  apartment: { fill: 0.085, stroke: 0.32, sw: 0.75 },
} as const;

// Boaz overlaps a generated building near 5th/73rd — hide any generated rect
// that would clash with the highlighted footprint.
function overlapsBoaz(b: Building) {
  return (
    b.x < BOAZ.x + BOAZ.w + 1 &&
    b.x + b.w > BOAZ.x - 1 &&
    b.y < BOAZ.y + BOAZ.h + 1 &&
    b.y + b.h > BOAZ.y - 1
  );
}

export default function EditorialMap({
  height = "640px",
  className = "",
}: {
  height?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const anim = (delay: number) =>
    reduce
      ? { initial: {}, animate: {}, transition: { duration: 0 } }
      : {
          initial: { pathLength: 0, opacity: 0 },
          whileInView: { pathLength: 1, opacity: 1 },
          viewport: { once: true, amount: 0.3 },
          transition: {
            duration: 1.1,
            delay,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          },
        };
  const fade = (delay: number) =>
    reduce
      ? { initial: {}, animate: {}, transition: { duration: 0 } }
      : {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true, amount: 0.3 },
          transition: {
            duration: 0.9,
            delay,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          },
        };

  return (
    <a
      href={brand.directionsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block w-full overflow-hidden bg-obsidian ${className}`}
      style={{ height, border: "1px solid var(--line)" }}
      aria-label={`Open Google Maps directions to ${brand.addressFull}`}
    >
      <svg
        viewBox={`0 0 ${V.width} ${V.height}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        role="img"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="parkFill" cx="0.4" cy="0.5" r="0.8">
            <stop offset="0%" stopColor="rgba(122,168,112,0.2)" />
            <stop offset="60%" stopColor="rgba(122,168,112,0.09)" />
            <stop offset="100%" stopColor="rgba(122,168,112,0.02)" />
          </radialGradient>
          <linearGradient id="riverFill" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(104,144,176,0.02)" />
            <stop offset="40%" stopColor="rgba(104,144,176,0.12)" />
            <stop offset="100%" stopColor="rgba(104,144,176,0.22)" />
          </linearGradient>
          <radialGradient id="lakeFill" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="rgba(104,144,176,0.42)" />
            <stop offset="100%" stopColor="rgba(104,144,176,0.1)" />
          </radialGradient>
          <radialGradient id="markerPulse" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="rgba(240,188,0,0.55)" />
            <stop offset="60%" stopColor="rgba(240,188,0,0.1)" />
            <stop offset="100%" stopColor="rgba(240,188,0,0)" />
          </radialGradient>
          <radialGradient id="boazGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="rgba(240,188,0,0.9)" />
            <stop offset="100%" stopColor="rgba(240,188,0,0.2)" />
          </radialGradient>
          <filter id="softGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          <pattern
            id="waveHatch"
            x="0"
            y="0"
            width="18"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 0 5 Q 4.5 0 9 5 T 18 5"
              fill="none"
              stroke="rgba(104,144,176,0.35)"
              strokeWidth="0.6"
            />
          </pattern>
        </defs>

        <rect x="0" y="0" width={V.width} height={V.height} fill="var(--obsidian)" />

        {/* ─── Central Park ─────────────────────────────────────────── */}
        <motion.path
          d="
            M 0 10
            C 70 18, 140 28, 210 46
            C 260 64, 288 120, 285 200
            C 282 280, 294 340, 286 420
            C 274 500, 230 560, 160 590
            C 100 602, 40 598, 0 604
            Z
          "
          fill="url(#parkFill)"
          stroke="rgba(240,188,0,0.34)"
          strokeWidth={1}
          strokeDasharray="3 5"
          {...anim(0.1)}
        />
        {/* Winding paths */}
        <motion.path
          d="M 0 440 C 60 400, 120 378, 180 340 S 240 260, 272 196"
          fill="none"
          stroke="rgba(243,255,251,0.14)"
          strokeWidth={1}
          strokeDasharray="2 4"
          {...anim(0.55)}
        />
        <motion.path
          d="M 20 120 C 80 140, 140 180, 200 220 S 258 322, 268 400"
          fill="none"
          stroke="rgba(243,255,251,0.1)"
          strokeWidth={1}
          strokeDasharray="2 4"
          {...anim(0.65)}
        />
        <motion.path
          d="M 40 560 C 110 500, 190 460, 248 400"
          fill="none"
          stroke="rgba(243,255,251,0.1)"
          strokeWidth={1}
          strokeDasharray="2 4"
          {...anim(0.7)}
        />
        {/* The Lake — irregular organic water body */}
        <motion.path
          d="
            M 50 240
            C 40 212, 80 198, 130 206
            C 180 214, 226 232, 244 268
            C 256 302, 240 338, 200 346
            C 160 354, 114 340, 78 322
            C 52 308, 44 274, 50 240
            Z
          "
          fill="url(#lakeFill)"
          stroke="rgba(104,144,176,0.5)"
          strokeWidth={0.8}
          {...anim(0.8)}
        />
        {/* Conservatory Water — smaller pond, asymmetric */}
        <motion.path
          d="M 140 108 C 132 96, 160 92, 184 100 C 204 110, 206 128, 190 138 C 172 146, 150 140, 140 124 Z"
          fill="url(#lakeFill)"
          stroke="rgba(104,144,176,0.38)"
          strokeWidth={0.6}
          {...anim(0.85)}
        />
        {/* A scatter of park greenspace dots (softens the park interior) */}
        {PARK_SPECKS.map((p, i) => (
          <motion.circle
            key={`pk-${i}`}
            cx={p.x}
            cy={p.y}
            r={p.r}
            fill="rgba(122,168,112,0.22)"
            {...fade(1.0 + i * 0.015)}
          />
        ))}

        {/* ─── Avenue grid lines (thicker — avenues are wider) ─────── */}
        {V.avenues.map((a, i) => (
          <g key={a.name}>
            <motion.line
              x1={a.x}
              y1={0}
              x2={a.x}
              y2={V.height}
              stroke="rgba(240,188,0,0.28)"
              strokeWidth={1.4}
              {...anim(0.25 + i * 0.04)}
            />
            <text
              x={a.x + 5}
              y={22}
              fill="rgba(243,255,251,0.45)"
              fontFamily="Inter, system-ui, sans-serif"
              fontSize={9}
              fontWeight={500}
              letterSpacing={2}
              style={{ textTransform: "uppercase" }}
            >
              {a.name}
            </text>
          </g>
        ))}

        {/* ─── Street grid lines (thinner — side streets) ──────────── */}
        {V.streets.map((s, i) => (
          <g key={s.name}>
            <motion.line
              x1={V.parkRightEdge}
              y1={s.y}
              x2={V.riverLeftEdge}
              y2={s.y}
              stroke={
                s.highlight
                  ? "rgba(240,188,0,0.38)"
                  : "rgba(243,255,251,0.14)"
              }
              strokeWidth={s.highlight ? 1.2 : 0.8}
              {...anim(0.5 + i * 0.04)}
            />
            <text
              x={V.riverLeftEdge - 6}
              y={s.y - 5}
              textAnchor="end"
              fill={
                s.highlight
                  ? "rgba(240,188,0,0.75)"
                  : "rgba(243,255,251,0.36)"
              }
              fontFamily="Inter, system-ui, sans-serif"
              fontSize={9}
              fontWeight={500}
              letterSpacing={2}
              style={{ textTransform: "uppercase" }}
            >
              {s.name}
            </text>
          </g>
        ))}

        {/* ─── Building footprints ────────────────────────────────── */}
        <motion.g {...fade(0.4)}>
          {BUILDINGS.map((b, i) => {
            if (overlapsBoaz(b)) return null;
            const s = KIND_STYLES[b.kind];
            return (
              <rect
                key={i}
                x={b.x}
                y={b.y}
                width={b.w}
                height={b.h}
                fill={`rgba(243,255,251,${s.fill})`}
                stroke={`rgba(240,188,0,${s.stroke})`}
                strokeWidth={s.sw}
              />
            );
          })}
        </motion.g>

        {/* ─── East River ──────────────────────────────────────────── */}
        <motion.rect
          x={V.riverLeftEdge}
          y={0}
          width={V.width - V.riverLeftEdge}
          height={V.height}
          fill="url(#riverFill)"
          {...fade(0.3)}
        />
        <motion.rect
          x={V.riverLeftEdge}
          y={0}
          width={V.width - V.riverLeftEdge}
          height={V.height}
          fill="url(#waveHatch)"
          {...fade(0.5)}
        />
        {/* FDR Drive — thin dashed hairline along the west bank */}
        <motion.line
          x1={V.riverLeftEdge - 6}
          y1={0}
          x2={V.riverLeftEdge - 6}
          y2={V.height}
          stroke="rgba(240,188,0,0.2)"
          strokeWidth={1}
          strokeDasharray="6 3"
          {...anim(0.7)}
        />

        {/* ─── Boaz footprint — highlighted ─────────────────────────── */}
        <motion.g {...fade(1.15)}>
          <rect
            x={BOAZ.x - 0.8}
            y={BOAZ.y - 0.8}
            width={BOAZ.w + 1.6}
            height={BOAZ.h + 1.6}
            fill="rgba(240,188,0,0.3)"
            stroke="var(--gold)"
            strokeWidth={1.1}
            filter="url(#softGlow)"
          />
          <rect
            x={BOAZ.x}
            y={BOAZ.y}
            width={BOAZ.w}
            height={BOAZ.h}
            fill="rgba(240,188,0,0.55)"
            stroke="var(--gold)"
            strokeWidth={1.2}
          />
        </motion.g>

        {/* ─── Marker + label ──────────────────────────────────────── */}
        <g transform={`translate(${MARKER.x}, ${MARKER.y})`}>
          {!reduce && (
            <motion.circle
              r={44}
              fill="url(#markerPulse)"
              animate={{ scale: [0.85, 1.25, 0.85], opacity: [0.75, 0.18, 0.75] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <motion.circle
            r={18}
            fill="none"
            stroke="rgba(240,188,0,0.55)"
            strokeWidth={0.9}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.line
            x1={10}
            y1={0}
            x2={52}
            y2={0}
            stroke="var(--gold)"
            strokeWidth={1}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          />
          <motion.g
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <text
              x={60}
              y={-4}
              fill="var(--ivory)"
              fontFamily="'Cormorant Garamond', Georgia, serif"
              fontSize={22}
              fontWeight={500}
              letterSpacing={1}
            >
              Boaz Studios
            </text>
            <text
              x={60}
              y={16}
              fill="rgba(240,188,0,0.9)"
              fontFamily="Inter, system-ui, sans-serif"
              fontSize={10}
              fontWeight={500}
              letterSpacing={2}
              style={{ textTransform: "uppercase" }}
            >
              29 East 73rd
            </text>
          </motion.g>
        </g>

        {/* Compass rose */}
        <g transform={`translate(${V.width - 58}, ${V.height - 58})`} opacity={0.55}>
          <circle r={20} fill="none" stroke="rgba(240,188,0,0.35)" strokeWidth={1} />
          <line x1={0} y1={-24} x2={0} y2={-10} stroke="var(--gold)" strokeWidth={1} />
          <text
            x={0}
            y={-26}
            textAnchor="middle"
            fill="var(--gold)"
            fontFamily="Inter, system-ui, sans-serif"
            fontSize={9}
            fontWeight={500}
            letterSpacing={1}
          >
            N
          </text>
        </g>

        {/* Scale bar */}
        <g transform={`translate(32, ${V.height - 36})`} opacity={0.55}>
          <line x1={0} y1={0} x2={80} y2={0} stroke="rgba(243,255,251,0.5)" strokeWidth={1} />
          <line x1={0} y1={-3} x2={0} y2={3} stroke="rgba(243,255,251,0.5)" strokeWidth={1} />
          <line x1={80} y1={-3} x2={80} y2={3} stroke="rgba(243,255,251,0.5)" strokeWidth={1} />
          <text
            x={0}
            y={18}
            fill="rgba(243,255,251,0.5)"
            fontFamily="Inter, system-ui, sans-serif"
            fontSize={9}
            fontWeight={500}
            letterSpacing={2}
            style={{ textTransform: "uppercase" }}
          >
            500 ft
          </text>
        </g>
      </svg>

      <div className="absolute inset-0 pointer-events-none flex items-end p-6 md:p-10">
        <div className="flex items-end justify-between w-full">
          <div>
            <p
              className="uppercase text-gold"
              style={{
                fontSize: "0.625rem",
                letterSpacing: "0.35em",
                fontWeight: 500,
              }}
            >
              Upper East Side · NYC
            </p>
            <p
              className="font-display text-ivory mt-2"
              style={{ fontSize: "1.125rem", fontWeight: 500 }}
            >
              {brand.address}
            </p>
          </div>

          <div
            className="inline-flex items-center gap-2 text-ivory/80 group-hover:text-gold transition-colors duration-250 uppercase"
            style={{
              fontSize: "0.625rem",
              letterSpacing: "0.3em",
              fontWeight: 500,
            }}
          >
            Get Directions
            <ArrowUpRight
              size={12}
              strokeWidth={1.25}
              className="transition-transform duration-250 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
            />
          </div>
        </div>
      </div>

      <span className="grain-overlay" aria-hidden="true" />
    </a>
  );
}

// Scattered greenspace pixels inside the park — deterministic so SSR matches.
const PARK_SPECKS = (() => {
  const r = rng(42);
  const specks: { x: number; y: number; r: number }[] = [];
  // Avoid the lake/pond regions so we don't speck over water.
  for (let i = 0; i < 90; i++) {
    const x = r() * 270 + 10;
    const y = r() * 580 + 20;
    const inLake = x > 50 && x < 244 && y > 196 && y < 350;
    const inPond = x > 140 && x < 200 && y > 96 && y < 140;
    if (inLake || inPond) continue;
    specks.push({ x, y, r: 0.6 + r() * 1.2 });
  }
  return specks;
})();
