import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outDir = join(root, "public/assets/cards/full");
mkdirSync(outDir, { recursive: true });

const typeStyles = {
  action: {
    label: "社交",
    stroke: "#344750",
    glow: "#5f9aae",
    panel: "#0b1116",
    accent: "#456d7a",
    dark: "#020405",
  },
  item: {
    label: "证据",
    stroke: "#51452c",
    glow: "#8d7445",
    panel: "#110d08",
    accent: "#635235",
    dark: "#030201",
  },
  skill: {
    label: "技能",
    stroke: "#334f45",
    glow: "#5e927f",
    panel: "#09110e",
    accent: "#426b5b",
    dark: "#020504",
  },
  evade: {
    label: "欺瞒",
    stroke: "#4c2d2a",
    glow: "#7f453f",
    panel: "#120807",
    accent: "#613631",
    dark: "#030101",
  },
};

const cards = [
  {
    file: "card_action_inquire.svg",
    art: "../card_action_inquire_art.png",
    cost: 1,
    name: "询问",
    type: "action",
    description: ["询问当前乘客的情况。", "获得 1 点线索。"],
  },
  {
    file: "card_item_old_ticket.svg",
    art: "../card_item_old_ticket_art.png",
    cost: 1,
    name: "旧车票",
    type: "item",
    description: ["出示一张旧车票。", "降低 10 点怀疑度。"],
  },
  {
    file: "card_action_breathe.svg",
    art: "../card_action_breathe_art.png",
    cost: 1,
    name: "深呼吸",
    type: "skill",
    description: ["平复心情，缓解压力。", "降低 15 点压力。"],
  },
  {
    file: "card_action_lie.svg",
    art: "../card_action_lie_art.png",
    cost: 1,
    name: "撒谎",
    type: "evade",
    description: ["编造一个合理的理由。", "成功：降低 15 点怀疑度。", "失败：增加 15 点怀疑度。"],
  },
  {
    file: "card_item_broken_phone.svg",
    art: "../card_item_broken_phone_art.png",
    cost: 1,
    name: "破碎手机",
    type: "item",
    description: ["展示破碎的手机。", "获得 1 点线索。"],
  },
];

function textLines(lines, x, y, size = 19, lineHeight = 28) {
  return lines
    .map(
      (line, index) =>
        `<text x="${x}" y="${y + index * lineHeight}" class="body" font-size="${size}">${escapeXml(line)}</text>`,
    )
    .join("\n");
}

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderCard(card) {
  const style = typeStyles[card.type];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="896" viewBox="0 0 300 448" role="img" aria-label="${escapeXml(card.name)}">
  <defs>
    <linearGradient id="edge" x1="18" y1="10" x2="282" y2="438" gradientUnits="userSpaceOnUse">
      <stop stop-color="#141819"/>
      <stop offset=".36" stop-color="#090c0d"/>
      <stop offset=".74" stop-color="#060707"/>
      <stop offset="1" stop-color="#010202"/>
    </linearGradient>
    <linearGradient id="surface" x1="28" y1="26" x2="272" y2="422" gradientUnits="userSpaceOnUse">
      <stop stop-color="${style.panel}"/>
      <stop offset=".48" stop-color="#06090c"/>
      <stop offset="1" stop-color="${style.dark}"/>
    </linearGradient>
    <linearGradient id="titlePlate" x1="48" y1="30" x2="260" y2="79" gradientUnits="userSpaceOnUse">
      <stop stop-color="#11171a"/>
      <stop offset=".55" stop-color="${style.panel}"/>
      <stop offset="1" stop-color="#020304"/>
    </linearGradient>
    <linearGradient id="textPlate" x1="28" y1="286" x2="272" y2="408" gradientUnits="userSpaceOnUse">
      <stop stop-color="#0b1012"/>
      <stop offset=".55" stop-color="#06090a"/>
      <stop offset="1" stop-color="#020303"/>
    </linearGradient>
    <radialGradient id="vignette" cx="50%" cy="42%" r="66%">
      <stop offset=".38" stop-color="#000" stop-opacity=".12"/>
      <stop offset=".75" stop-color="#000" stop-opacity=".62"/>
      <stop offset="1" stop-color="#000" stop-opacity=".9"/>
    </radialGradient>
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="1.2" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="grime" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="4" seed="13" result="noise"/>
      <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0.52 0 0 0 0 0.48 0 0 0 0 0.38 0 0 0 .2 0"/>
    </filter>
    <filter id="agedArt">
      <feColorMatrix type="saturate" values=".45"/>
      <feComponentTransfer>
        <feFuncR type="linear" slope=".46" intercept=".015"/>
        <feFuncG type="linear" slope=".45" intercept=".012"/>
        <feFuncB type="linear" slope=".42" intercept=".008"/>
      </feComponentTransfer>
      <feColorMatrix type="matrix" values="1.05 0 0 0 -0.03 0 1.02 0 0 -0.025 0 0 .96 0 -0.015 0 0 0 1 0"/>
    </filter>
    <filter id="innerShadow">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity=".85"/>
    </filter>
    <clipPath id="artClip">
      <rect x="28" y="92" width="244" height="184" rx="3"/>
    </clipPath>
    <style>
      .title { fill: #f2ead8; font-family: "Songti SC", "Noto Serif CJK SC", serif; font-weight: 800; text-anchor: middle; letter-spacing: 2px; paint-order: stroke; stroke: #110d09; stroke-width: 2px; }
      .type { fill: #d1c2a6; font-family: "Songti SC", "Noto Serif CJK SC", serif; text-anchor: middle; letter-spacing: 2px; }
      .body { fill: #e7dfcf; font-family: "Songti SC", "Noto Serif CJK SC", serif; text-anchor: middle; paint-order: stroke; stroke: #090b0d; stroke-width: 1px; }
    </style>
  </defs>
  <rect x="6" y="6" width="288" height="436" rx="13" fill="#010202"/>
  <rect x="10" y="10" width="280" height="428" rx="13" fill="url(#edge)"/>
  <rect x="10.5" y="10.5" width="279" height="427" rx="12" fill="none" stroke="${style.glow}" stroke-width=".75" opacity=".38"/>
  <rect x="13" y="13" width="274" height="422" rx="11" fill="none" stroke="#8a7b61" stroke-width=".55" opacity=".18"/>
  <rect x="16" y="16" width="268" height="416" rx="10" fill="url(#surface)"/>
  <rect x="18" y="18" width="264" height="412" rx="9" fill="url(#vignette)"/>
  <rect x="22" y="22" width="256" height="404" rx="7" fill="none" stroke="#4d4638" stroke-width=".75" opacity=".24"/>
  <rect x="26" y="28" width="248" height="386" rx="4" fill="none" stroke="${style.stroke}" stroke-width=".95" opacity=".42"/>

  <rect x="51" y="30" width="221" height="48" rx="4" fill="url(#titlePlate)" stroke="${style.stroke}" stroke-width="1" opacity=".96"/>
  <path d="M55 77h214" stroke="#020303" stroke-width="3"/>
  <circle cx="38" cy="45" r="24" fill="#071018" stroke="#080b0e" stroke-width="4"/>
  <circle cx="38" cy="45" r="21" fill="#070b0e" stroke="${style.stroke}" stroke-width="1.5"/>
  <circle cx="38" cy="45" r="17" fill="#030506" stroke="#625741" stroke-width=".65" opacity=".42"/>
  <text x="38" y="56" fill="#d9cfb8" font-family="Georgia, serif" font-size="32" text-anchor="middle" paint-order="stroke" stroke="#020303" stroke-width="2">${card.cost}</text>
  <text x="162" y="61" class="title" font-size="27">${escapeXml(card.name)}</text>

  <rect x="59" y="78" width="182" height="22" fill="#050606" stroke="#40372b" stroke-width=".85"/>
  <text x="150" y="94" class="type" font-size="12">${escapeXml(style.label)}</text>

  <rect x="24" y="88" width="252" height="193" rx="4" fill="#020303" stroke="#030404" stroke-width="4"/>
  <image href="${card.art}" x="28" y="92" width="244" height="184" preserveAspectRatio="xMidYMid slice" clip-path="url(#artClip)" filter="url(#agedArt)"/>
  <rect x="28" y="92" width="244" height="184" rx="3" fill="url(#vignette)" opacity=".82"/>
  <rect x="28" y="92" width="244" height="184" rx="3" fill="#000" opacity=".14"/>
  <rect x="28" y="92" width="244" height="184" rx="3" fill="none" stroke="${style.stroke}" stroke-width=".95" opacity=".86"/>
  <path d="M30 94h38M230 94h38M30 274h38M230 274h38" stroke="#8a7a5f" stroke-width="1" opacity=".28"/>
  <path d="M32 98c10 0 18-2 28-8M268 98c-10 0-18-2-28-8M32 270c10 0 18 2 28 8M268 270c-10 0-18 2-28 8" fill="none" stroke="${style.stroke}" stroke-width="1" opacity=".28"/>

  <rect x="28" y="291" width="244" height="94" rx="3" fill="url(#textPlate)" stroke="#020303" stroke-width="3" filter="url(#innerShadow)"/>
  <rect x="32" y="295" width="236" height="86" rx="2" fill="none" stroke="${style.stroke}" stroke-width=".8" opacity=".34"/>
  ${textLines(card.description, 150, 323, 18, 27)}
  <path d="M39 405h222" stroke="${style.stroke}" stroke-width=".8" opacity=".28"/>
  <path d="M65 416h170" stroke="${style.accent}" stroke-width="1.6" opacity=".18" stroke-linecap="round"/>
  <path d="M22 24h42M236 24h42M22 424h42M236 424h42" stroke="${style.glow}" stroke-width=".8" opacity=".14"/>
  <g opacity=".23" filter="url(#grime)">
    <rect x="18" y="18" width="264" height="412" rx="9" fill="#8b806a"/>
  </g>
  <rect x="18" y="18" width="264" height="412" rx="9" fill="url(#vignette)" opacity=".6"/>
  <g opacity=".32" stroke="#020303" stroke-width=".8">
    <path d="M47 118c18-5 44-6 78-3M190 86c24-4 43-4 58 1M44 396c31-7 64-7 99-1M204 307c15 2 32 1 53-3"/>
    <path d="M67 36c-11 7-16 15-18 27M254 36c9 7 13 17 13 31M41 358c9 5 17 7 24 6M236 414c15-2 26-6 34-12"/>
  </g>
</svg>
`;
}

for (const card of cards) {
  writeFileSync(join(outDir, card.file), renderCard(card));
}
