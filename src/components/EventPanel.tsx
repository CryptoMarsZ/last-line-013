import type { Dispatch } from "react";
import { events } from "../game/data/events";
import { stations } from "../game/data/stations";
import { isCurrentEventResolved } from "../game/engine/reducer";
import type { GameAction, RunState } from "../game/types";

interface EventPanelProps {
  state: RunState;
  dispatch: Dispatch<GameAction>;
}

const eventArt: Record<string, string> = {
  emptyCarriage: "/assets/backgrounds/bg_empty_carriage.png",
  facelessConductor: "/assets/events/event_faceless_ticket_inspector.png",
};

export function EventPanel({ state, dispatch }: EventPanelProps) {
  const station = stations[state.currentStationId];
  const event = events[station.eventIds[state.currentEventIndex]];
  const isResolved = isCurrentEventResolved(state);
  const resolvedEvent = state.resolvedEvents.find((entry) => entry.eventId === event.id);
  const progress = Math.round((state.currentObjective / event.objectiveValue) * 100);
  const artSrc = eventArt[event.id] ?? "/assets/backgrounds/bg_empty_carriage.png";

  return (
    <section className="event-panel">
      <div className="event-illustration has-art" aria-hidden="true">
        <img alt="" className="event-art-image" src={artSrc} />
        <div className="carriage-perspective" />
        <div className="conductor-silhouette" />
        <div className="old-man-silhouette" />
        <span>0:13</span>
      </div>

      <div className="event-card-panel">
        <div className="event-copy">
          <p className="eyebrow">
            {station.chapter} / {station.name}
          </p>
          <h1>{event.name}</h1>
          <p>{isResolved ? (resolvedEvent?.outcome === "success" ? event.successText : event.failureText) : event.intro}</p>
        </div>

        <div className="objective">
          <div className="objective-header">
            <span>{event.objectiveName}</span>
            <strong>
              {Math.min(state.currentObjective, event.objectiveValue)} / {event.objectiveValue}
            </strong>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${Math.min(progress, 100)}%` }} />
          </div>
          <div className="objective-footer">
            <span>剩余回合</span>
            <strong>{state.turnsRemaining}</strong>
          </div>
        </div>

        <div className="event-actions">
          {isResolved ? (
            <button onClick={() => dispatch({ type: "NEXT_EVENT" })} type="button">
              继续行驶
            </button>
          ) : (
            <button onClick={() => dispatch({ type: "END_TURN" })} type="button">
              结束回合
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
