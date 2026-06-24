import type { CSSProperties } from "react";
import type { TarotCard } from "@/lib/tarot";

type ArtworkSpec = {
  main: string;
  accents: [string, string, string];
  scene: "dawn" | "garden" | "night" | "storm" | "water" | "fire" | "earth" | "air";
  showPips?: boolean;
};

const artwork: Record<string, ArtworkSpec> = {
  fool: { main: "🎒🦋", accents: ["☀", "⛰", "🌹"], scene: "dawn" },
  magician: { main: "🪄✨", accents: ["⚗", "♾", "⚔"], scene: "fire" },
  "high-priestess": { main: "📜☾", accents: ["🌊", "🔮", "🌙"], scene: "night" },
  empress: { main: "👑🌾", accents: ["🌹", "♀", "🍇"], scene: "garden" },
  emperor: { main: "♜👑", accents: ["⛰", "⚔", "🔥"], scene: "fire" },
  hierophant: { main: "📖🔑", accents: ["⛩", "🕯", "🔑"], scene: "earth" },
  lovers: { main: "💞", accents: ["☀", "🌳", "🕊"], scene: "garden" },
  chariot: { main: "🏇", accents: ["★", "⚡", "🏁"], scene: "air" },
  strength: { main: "🦁🌹", accents: ["∞", "☀", "🫶"], scene: "dawn" },
  hermit: { main: "🏮", accents: ["⛰", "☾", "🦯"], scene: "night" },
  wheel: { main: "☸️", accents: ["⬆", "♾", "⬇"], scene: "air" },
  justice: { main: "⚖️⚔️", accents: ["📜", "♛", "◈"], scene: "air" },
  "hanged-man": { main: "🙃🌳", accents: ["🔻", "☀", "∞"], scene: "water" },
  death: { main: "🥀🌅", accents: ["☠", "🏳", "🌱"], scene: "storm" },
  temperance: { main: "🏺💧", accents: ["🪽", "☀", "🌊"], scene: "water" },
  devil: { main: "⛓️🔥", accents: ["🜏", "▽", "🔒"], scene: "fire" },
  tower: { main: "🏰⚡", accents: ["🔥", "☄", "🧱"], scene: "storm" },
  star: { main: "🌟🏺", accents: ["🌊", "✦", "🌿"], scene: "night" },
  moon: { main: "🌕🌊", accents: ["🐺", "🦞", "🗼"], scene: "night" },
  sun: { main: "☀️🌻", accents: ["🏳", "🐎", "✦"], scene: "dawn" },
  judgement: { main: "📯🪽", accents: ["☀", "⬆", "✦"], scene: "dawn" },
  world: { main: "🌍🏵️", accents: ["🦁", "🪽", "🐂"], scene: "garden" },

  "wands-ace": { main: "🌱🪄", accents: ["🔥", "☀", "✦"], scene: "dawn" },
  "wands-2": { main: "🗺️🌍", accents: ["🪄", "🏰", "🧭"], scene: "dawn" },
  "wands-3": { main: "🚢🔭", accents: ["🪄", "🌅", "🪄"], scene: "water" },
  "wands-4": { main: "🎊🏡", accents: ["🌿", "🪄", "🌿"], scene: "garden" },
  "wands-5": { main: "⚔️🔥", accents: ["🪄", "💥", "🪄"], scene: "fire" },
  "wands-6": { main: "🏆🐎", accents: ["🌿", "👑", "📯"], scene: "dawn" },
  "wands-7": { main: "🛡️🪄", accents: ["⛰", "🔥", "⚔"], scene: "fire" },
  "wands-8": { main: "☄️☄️", accents: ["💨", "🪄", "⚡"], scene: "air" },
  "wands-9": { main: "🩹🛡️", accents: ["🪄", "🔥", "🪄"], scene: "storm" },
  "wands-10": { main: "🪵🎒", accents: ["🏘", "💦", "⛰"], scene: "earth" },
  "wands-page": { main: "📜🌱", accents: ["🪄", "🦎", "🔥"], scene: "dawn" },
  "wands-knight": { main: "🐎🔥", accents: ["🪄", "💨", "☀"], scene: "fire" },
  "wands-queen": { main: "♛🌻", accents: ["🐈‍⬛", "🪄", "🔥"], scene: "garden" },
  "wands-king": { main: "♚🦁", accents: ["🪄", "🔥", "👑"], scene: "fire" },

  "cups-ace": { main: "🏆💧", accents: ["🕊", "☁", "🌸"], scene: "water" },
  "cups-2": { main: "🥂💞", accents: ["🪽", "♾", "🪽"], scene: "garden" },
  "cups-3": { main: "🥂🎉", accents: ["🍇", "💐", "🍎"], scene: "garden" },
  "cups-4": { main: "😑🏆", accents: ["☁", "🌳", "🏆"], scene: "water" },
  "cups-5": { main: "💔🥀", accents: ["🏆", "🌉", "🏆"], scene: "storm" },
  "cups-6": { main: "🧸🌼", accents: ["🏡", "🏆", "🕊"], scene: "garden" },
  "cups-7": { main: "☁️🔮", accents: ["👑", "🐉", "💎"], scene: "night" },
  "cups-8": { main: "🚶🌙", accents: ["⛰", "🏆", "🌊"], scene: "night" },
  "cups-9": { main: "😊🏆", accents: ["🎉", "🍇", "✨"], scene: "garden" },
  "cups-10": { main: "🌈🏡", accents: ["👨‍👩‍👧‍👦", "🏆", "💞"], scene: "dawn" },
  "cups-page": { main: "🐟🏆", accents: ["🌊", "📜", "🌸"], scene: "water" },
  "cups-knight": { main: "🐎💌", accents: ["🏆", "🌊", "🌹"], scene: "water" },
  "cups-queen": { main: "♛🔮", accents: ["🏆", "🌊", "🪽"], scene: "water" },
  "cups-king": { main: "♚🌊", accents: ["🏆", "⚓", "🐬"], scene: "water" },

  "swords-ace": { main: "⚔️👑", accents: ["☁", "🌿", "✦"], scene: "air" },
  "swords-2": { main: "🙈⚔️", accents: ["🌙", "🌊", "⚖"], scene: "night" },
  "swords-3": { main: "💔⚔️", accents: ["🌧", "☁", "🥀"], scene: "storm" },
  "swords-4": { main: "🛏️🙏", accents: ["🪟", "⚔", "🕯"], scene: "night" },
  "swords-5": { main: "😏⚔️", accents: ["🌊", "🚶", "☁"], scene: "storm" },
  "swords-6": { main: "⛵🌫️", accents: ["⚔", "🌊", "🏞"], scene: "water" },
  "swords-7": { main: "🤫⚔️", accents: ["⛺", "👣", "🌙"], scene: "night" },
  "swords-8": { main: "🪢🙈", accents: ["⚔", "🏰", "🌊"], scene: "storm" },
  "swords-9": { main: "😰🌙", accents: ["🛏", "⚔", "🌑"], scene: "night" },
  "swords-10": { main: "🌅🗡️", accents: ["☁", "🏞", "✦"], scene: "storm" },
  "swords-page": { main: "👀⚔️", accents: ["☁", "💨", "📜"], scene: "air" },
  "swords-knight": { main: "🐎⚔️", accents: ["💨", "☁", "⚡"], scene: "air" },
  "swords-queen": { main: "♛⚔️", accents: ["☁", "🪽", "👁"], scene: "air" },
  "swords-king": { main: "♚⚔️", accents: ["🦋", "☁", "⚖"], scene: "air" },

  "pentacles-ace": { main: "🪙🌿", accents: ["☁", "🌹", "🏔"], scene: "garden" },
  "pentacles-2": { main: "♾️🪙", accents: ["🌊", "⛵", "⚖"], scene: "water" },
  "pentacles-3": { main: "🏛️🤝", accents: ["📐", "🪙", "🔨"], scene: "earth" },
  "pentacles-4": { main: "🔒🪙", accents: ["👑", "🏙", "🪑"], scene: "earth" },
  "pentacles-5": { main: "❄️🩼", accents: ["🪟", "🪙", "🏚"], scene: "storm" },
  "pentacles-6": { main: "⚖️🎁", accents: ["🪙", "🤲", "🪙"], scene: "earth" },
  "pentacles-7": { main: "🌳⏳", accents: ["🪙", "🌱", "🪙"], scene: "garden" },
  "pentacles-8": { main: "🔨🪙", accents: ["🧰", "🏘", "✨"], scene: "earth" },
  "pentacles-9": { main: "🦅🍇", accents: ["🪙", "🏡", "🌿"], scene: "garden" },
  "pentacles-10": { main: "🏰👨‍👩‍👧", accents: ["🐕", "🪙", "🌳"], scene: "earth" },
  "pentacles-page": { main: "📚🪙", accents: ["🌿", "⛰", "✦"], scene: "earth" },
  "pentacles-knight": { main: "🐎🌾", accents: ["🪙", "🏞", "🐢"], scene: "earth" },
  "pentacles-queen": { main: "♛🌹", accents: ["🐇", "🪙", "🌿"], scene: "garden" },
  "pentacles-king": { main: "♚🏰", accents: ["🐂", "🪙", "🍇"], scene: "earth" },
};

const suitSymbols = {
  wands: "🪄",
  cups: "🏆",
  swords: "⚔",
  pentacles: "⛤",
} as const;

export function TarotArtwork({ card }: { card: TarotCard }) {
  const spec = artwork[card.id];
  const numericCount = Number(card.number);
  const pipCount = Number.isFinite(numericCount) ? numericCount : card.number === "에이스" ? 1 : 0;
  const showPips = Boolean(spec?.showPips && pipCount);
  const pips = showPips ? Array.from({ length: pipCount }, (_, index) => index) : [];

  return (
    <span
      aria-hidden="true"
      className={`tarot-artwork ${card.arcana} ${card.suit ?? ""} scene-${spec?.scene ?? "night"}`}
      style={{ "--pip-count": Math.max(pipCount, 1) } as CSSProperties}
    >
      <span className="art-glow" />
      <span className="art-horizon" />
      <span className="art-accent top">{spec?.accents[0] ?? "✦"}</span>
      <span className="art-accent left">{spec?.accents[1] ?? "☾"}</span>
      <span className="art-accent right">{spec?.accents[2] ?? "✦"}</span>
      <span className="art-main">{spec?.main ?? suitSymbols[card.suit ?? "wands"]}</span>
      {pips.length ? (
        <span className="art-pips">
          {pips.map((pip) => <i key={pip}>{suitSymbols[card.suit ?? "wands"]}</i>)}
        </span>
      ) : null}
      <span className="art-rays" />
      <span className="art-keyword">{card.keyword}</span>
    </span>
  );
}
