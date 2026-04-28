import { cards } from "../game/data/cards";
import type { Card } from "../game/types";

interface CardViewProps {
  cardId: string;
  disabled: boolean;
  onPlay: (cardId: string) => void;
}

const typeLabels: Record<Card["type"], string> = {
  action: "行动",
  item: "物品",
  evidence: "证据",
  passenger: "乘客",
  negative: "负面",
};

export function CardView({ cardId, disabled, onPlay }: CardViewProps) {
  const card = cards[cardId];

  if (!card) {
    return null;
  }

  return (
    <button
      className={`card card-${card.type}`}
      disabled={disabled}
      onClick={() => onPlay(card.id)}
      type="button"
    >
      <span className="card-cost">{card.cost}</span>
      <span className="card-art">
        <span className="card-art-symbol">{card.tags[0]}</span>
      </span>
      <span className="card-title-row">
        <strong>{card.name}</strong>
        <small>{typeLabels[card.type]}</small>
      </span>
      <span className="card-description">{card.description}</span>
      <em>{card.flavor}</em>
    </button>
  );
}
