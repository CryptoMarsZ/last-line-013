import type { RunState } from "../game/types";

interface StatusPanelProps {
  state: RunState;
}

const evidenceNames: Record<string, string> = {
  white_flower: "白花",
};

const itemNames: Record<string, string> = {
  old_ticket: "旧车票",
  old_ticket_clue: "旧车票线索",
  broken_phone: "破碎手机",
};

export function StatusPanel({ state }: StatusPanelProps) {
  const sanityValue = Math.round((state.sanity / state.maxSanity) * 100);
  const pressureValue = Math.round((state.pressure / state.maxPressure) * 100);

  return (
    <aside className="status-panel">
      <h2>你的状态</h2>
      <Resource label="理智" icon="/assets/icons/icon_sanity.svg" value={sanityValue} tone="sanity" />
      <Resource label="压力" icon="/assets/icons/icon_pressure.svg" value={pressureValue} tone="pressure" />

      <div className="evidence-meter">
        <div className="evidence-header">
          <span className="label-with-icon">
            <img alt="" src="/assets/icons/icon_evidence.svg" />
            证据
          </span>
          <strong>{state.evidence.length} / 6</strong>
        </div>
        <div className="evidence-dots">
          {Array.from({ length: 6 }, (_, index) => (
            <span className={index < state.evidence.length ? "filled" : undefined} key={index} />
          ))}
        </div>
      </div>

      <section className="status-section">
        <h3>已收集的线索</h3>
        <ul className="compact-list">
          {state.evidence.length === 0 ? <li>暂无</li> : null}
          {state.evidence.map((evidenceId) => (
            <li key={evidenceId}>{evidenceNames[evidenceId] ?? evidenceId}</li>
          ))}
        </ul>
      </section>

      <section className="status-section">
        <h3>物品</h3>
        <ul className="compact-list">
          {state.items.length === 0 ? <li>空空如也</li> : null}
          {state.items.map((itemId) => (
            <li key={itemId}>{itemNames[itemId] ?? itemId}</li>
          ))}
        </ul>
      </section>

      <div className="pile-column">
        <PileStat label="牌库" value={state.deck.length} />
        <PileStat label="弃牌堆" value={state.discardPile.length} />
        <PileStat label="崩溃" value={`${state.collapseCount}/3`} />
        <PileStat label="负面牌" value={state.negativeCardsAdded} />
      </div>
    </aside>
  );
}

function Resource({
  label,
  icon,
  value,
  tone,
}: {
  label: string;
  icon: string;
  value: number;
  tone: "sanity" | "pressure";
}) {
  return (
    <div className={`resource resource-${tone}`}>
      <div className="resource-icon">
        <img alt="" src={icon} />
      </div>
      <div className="resource-body">
        <div className="resource-title">
          <span>{label}</span>
          <strong>{value}/100</strong>
        </div>
        <div className="resource-bar">
          <span style={{ width: `${value}%` }} />
        </div>
      </div>
    </div>
  );
}

function PileStat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="pile-stat">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
