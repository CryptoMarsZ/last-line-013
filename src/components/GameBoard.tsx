import type { Dispatch } from "react";
import { cards } from "../game/data/cards";
import { stations } from "../game/data/stations";
import { getSliceResult, isCurrentEventResolved } from "../game/engine/reducer";
import type { GameAction, RunState } from "../game/types";
import { CardView } from "./CardView";
import { EventPanel } from "./EventPanel";
import { StatusPanel } from "./StatusPanel";

interface GameBoardProps {
  state: RunState;
  dispatch: Dispatch<GameAction>;
}

const passengerPortraits: Record<string, string> = {
  shen_mian: "/assets/characters/char_shenmian_memory.png",
};

export function GameBoard({ state, dispatch }: GameBoardProps) {
  if (state.phase === "intro") {
    return <IntroScreen dispatch={dispatch} />;
  }

  if (state.phase === "complete") {
    return <CompleteScreen state={state} dispatch={dispatch} />;
  }

  const station = stations[state.currentStationId];
  const isResolved = isCurrentEventResolved(state);

  return (
    <main className="game-shell">
      <div className="game-frame">
        <header className="line-map">
          <div className="clock-card">
            <span>末班车</span>
            <strong>0:13</strong>
          </div>
          <ol>
            <li className="active">起点站</li>
            <li>城郊站</li>
            <li>老街站</li>
            <li>市场站</li>
            <li>医院站</li>
            <li className="locked">图书馆站</li>
            <li className="locked">大学城站</li>
            <li className="locked">终点站</li>
          </ol>
        </header>

        <section className="board-grid">
          <PassengerPanel state={state} />
          <EventPanel state={state} dispatch={dispatch} />
          <StatusPanel state={state} />
        </section>

        <section className="hand-area">
          <div className="action-points">
            <span>行动点</span>
            <strong>{state.actionPoints}/3</strong>
            <i />
            <i />
            <i />
          </div>
          <div className="hand">
            {state.hand.map((cardId, index) => {
              const card = cards[cardId];
              const disabled = isResolved || !card || card.cost > state.actionPoints;

              return (
                <CardView
                  cardId={cardId}
                  disabled={disabled}
                  key={`${cardId}-${index}`}
                  onPlay={(playedCardId) => dispatch({ type: "PLAY_CARD", cardId: playedCardId })}
                />
              );
            })}
          </div>
        </section>

        <LogPanel state={state} />
      </div>
    </main>
  );
}

function IntroScreen({ dispatch }: { dispatch: Dispatch<GameAction> }) {
  return (
    <main className="intro-screen">
      <div className="intro-card">
        <p className="eyebrow">零点十三分末班线</p>
        <h1>Last Line 0:13</h1>
        <p>
          林澈在凌晨 0:13 赶上末班车。车厢空荡，线路图消失，广播反复提醒：
          “请保管好随身物品，遗失的记忆本站不予招领。”
        </p>
        <button onClick={() => dispatch({ type: "START_RUN" })} type="button">
          上车
        </button>
      </div>
    </main>
  );
}

function CompleteScreen({ state, dispatch }: { state: RunState; dispatch: Dispatch<GameAction> }) {
  const result = getSliceResult(state);

  return (
    <main className={`complete-screen complete-${result.tone}`}>
      <div className="intro-card">
        <p className="eyebrow">垂直切片结算</p>
        <h1>{result.title}</h1>
        <p>{result.description}</p>
        <div className="result-stats">
          <span>成功事件：{state.resolvedEvents.filter((event) => event.outcome === "success").length}</span>
          <span>理智：{state.sanity}</span>
          <span>压力：{state.pressure}</span>
          <span>许向东关系：{state.passengers.xu_xiangdong.relation}</span>
        </div>
        <button onClick={() => dispatch({ type: "RESTART" })} type="button">
          重新开始
        </button>
      </div>
    </main>
  );
}

function PassengerPanel({ state }: { state: RunState }) {
  return (
    <aside className="passenger-panel">
      <h2>乘客关系</h2>
      {Object.values(state.passengers).map((passenger) => (
        <article className="passenger-card" key={passenger.id}>
          <div className="portrait-placeholder">
            {passengerPortraits[passenger.id] ? (
              <img alt={passenger.name} src={passengerPortraits[passenger.id]} />
            ) : (
              passenger.name.slice(0, 1)
            )}
          </div>
          <div>
            <strong>{passenger.name}</strong>
            <p>{passenger.description}</p>
            <div className="hearts" aria-label={`关系 ${passenger.relation}`}>
              {Array.from({ length: 3 }, (_, index) => (
                <span className={index < Math.max(1, passenger.relation + 1) ? "filled" : undefined} key={index}>
                  ♥
                </span>
              ))}
            </div>
          </div>
        </article>
      ))}
      <button className="archive-button" type="button">
        查看乘客档案
      </button>
    </aside>
  );
}

function LogPanel({ state }: { state: RunState }) {
  return (
    <aside className="log-panel">
      <h2>行驶记录</h2>
      <ul>
        {state.log.slice(0, 6).map((entry) => (
          <li className={entry.tone ? `log-${entry.tone}` : undefined} key={entry.id}>
            {entry.text}
          </li>
        ))}
      </ul>
    </aside>
  );
}
