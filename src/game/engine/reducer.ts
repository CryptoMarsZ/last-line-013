import { cards } from "../data/cards";
import { events } from "../data/events";
import { stations } from "../data/stations";
import type { Effect, GameAction, GameLogEntry, RunState } from "../types";
import { createRun } from "./createRun";

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function log(text: string, tone?: GameLogEntry["tone"]): GameLogEntry {
  return {
    id: Date.now() + Math.floor(Math.random() * 1000),
    text,
    tone,
  };
}

function getCurrentEvent(state: RunState) {
  const station = stations[state.currentStationId];
  return events[station.eventIds[state.currentEventIndex]];
}

export function isCurrentEventResolved(state: RunState): boolean {
  const currentEvent = getCurrentEvent(state);
  return state.resolvedEvents.some((event) => event.eventId === currentEvent.id);
}

export function getSliceResult(state: RunState): {
  title: string;
  description: string;
  tone: "good" | "bad";
} {
  const successCount = state.resolvedEvents.filter((event) => event.outcome === "success").length;
  const relation = state.passengers.xu_xiangdong?.relation ?? 0;

  if (successCount >= 2 && state.sanity > 0 && relation >= 1) {
    return {
      title: "通过上车站",
      description:
        "你没有完全准备好，但至少这一次，你没有立刻移开视线。列车驶向下一站：遗失物招领。",
      tone: "good",
    };
  }

  return {
    title: "被迫循环",
    description:
      "检票钳的声音在耳边重复。你明明已经上车，却又站回了 0:13 的站台。",
    tone: "bad",
  };
}

function drawCards(state: RunState, amount: number): RunState {
  let deck = [...state.deck];
  let discardPile = [...state.discardPile];
  const hand = [...state.hand];

  for (let i = 0; i < amount; i += 1) {
    if (deck.length === 0) {
      if (discardPile.length === 0) {
        break;
      }

      deck = shuffle(discardPile);
      discardPile = [];
    }

    const nextCard = deck[0];
    deck = deck.slice(1);
    hand.push(nextCard);
  }

  return {
    ...state,
    deck,
    discardPile,
    hand,
  };
}

function normalizePressure(state: RunState): RunState {
  if (state.pressure < state.maxPressure) {
    return state;
  }

  return {
    ...state,
    pressure: Math.max(0, state.pressure - state.maxPressure),
    collapseCount: state.collapseCount + 1,
    sanity: Math.max(0, state.sanity - 1),
    discardPile: [...state.discardPile, "anxiety"],
    negativeCardsAdded: state.negativeCardsAdded + 1,
    log: [
      log("压力爆表。车厢灯光短暂熄灭，一张“焦虑”滑进弃牌堆。", "bad"),
      ...state.log,
    ],
  };
}

function applyEffect(state: RunState, effect: Effect): RunState {
  switch (effect.type) {
    case "advance":
      return {
        ...state,
        currentObjective: state.currentObjective + effect.amount,
      };
    case "draw":
      return drawCards(state, effect.amount);
    case "healSanity":
      return {
        ...state,
        sanity: Math.min(state.maxSanity, Math.max(0, state.sanity + effect.amount)),
      };
    case "gainPressure":
      return normalizePressure({
        ...state,
        pressure: Math.max(0, state.pressure + effect.amount),
      });
    case "reducePressure":
      return {
        ...state,
        pressure: Math.max(0, state.pressure - effect.amount),
      };
    case "addNegativeCard": {
      const addedCards = Array.from({ length: effect.amount }, () => effect.cardId);

      return {
        ...state,
        discardPile: [...state.discardPile, ...addedCards],
        negativeCardsAdded: state.negativeCardsAdded + effect.amount,
      };
    }
    case "changeRelation": {
      const passenger = state.passengers[effect.passengerId];

      if (!passenger) {
        return state;
      }

      return {
        ...state,
        passengers: {
          ...state.passengers,
          [effect.passengerId]: {
            ...passenger,
            relation: Math.max(-3, Math.min(5, passenger.relation + effect.amount)),
          },
        },
      };
    }
    case "gainEvidence":
      if (state.evidence.includes(effect.evidenceId)) {
        return state;
      }

      return {
        ...state,
        evidence: [...state.evidence, effect.evidenceId],
      };
    case "gainItem":
      if (state.items.includes(effect.itemId)) {
        return state;
      }

      return {
        ...state,
        items: [...state.items, effect.itemId],
      };
  }
}

function applyEffects(state: RunState, effects: Effect[]): RunState {
  return effects.reduce((nextState, effect) => applyEffect(nextState, effect), state);
}

function resolveCurrentEvent(state: RunState, outcome: "success" | "failure"): RunState {
  const currentEvent = getCurrentEvent(state);
  const resolution = outcome === "success" ? currentEvent.successReward : currentEvent.failurePenalty;
  const resolvedState = applyEffects(state, resolution.effects);

  return {
    ...resolvedState,
    hand: [],
    discardPile: [...resolvedState.discardPile, ...resolvedState.hand],
    resolvedEvents: [...resolvedState.resolvedEvents, { eventId: currentEvent.id, outcome }],
    log: [
      log(outcome === "success" ? currentEvent.successText : currentEvent.failureText, outcome === "success" ? "good" : "bad"),
      log(resolution.description, outcome === "success" ? "good" : "bad"),
      ...resolvedState.log,
    ],
  };
}

function maybeResolveAfterProgress(state: RunState): RunState {
  const currentEvent = getCurrentEvent(state);

  if (state.currentObjective >= currentEvent.objectiveValue) {
    return resolveCurrentEvent(
      {
        ...state,
        currentObjective: currentEvent.objectiveValue,
      },
      "success",
    );
  }

  return state;
}

function startNextEvent(state: RunState): RunState {
  const station = stations[state.currentStationId];
  const nextEventIndex = state.currentEventIndex + 1;

  if (nextEventIndex >= station.eventIds.length) {
    return {
      ...state,
      phase: "complete",
      log: [log("列车穿过黑暗。上车站的检票声终于被甩在身后。"), ...state.log],
    };
  }

  const nextEvent = events[station.eventIds[nextEventIndex]];
  const preparedState: RunState = {
    ...state,
    currentEventIndex: nextEventIndex,
    currentObjective: 0,
    turnsRemaining: nextEvent.turnLimit,
    actionPoints: state.maxActionPoints,
    log: [log(nextEvent.intro), ...state.log],
  };

  return drawCards(preparedState, 5);
}

function endTurn(state: RunState): RunState {
  if (isCurrentEventResolved(state)) {
    return state;
  }

  if (state.turnsRemaining <= 1) {
    return resolveCurrentEvent(
      {
        ...state,
        turnsRemaining: 0,
      },
      "failure",
    );
  }

  const nextState: RunState = {
    ...state,
    turnsRemaining: state.turnsRemaining - 1,
    actionPoints: state.maxActionPoints,
    discardPile: [...state.discardPile, ...state.hand],
    hand: [],
    log: [log("列车灯光闪烁。新的一轮开始。"), ...state.log],
  };

  return drawCards(nextState, 5);
}

export function gameReducer(state: RunState, action: GameAction): RunState {
  switch (action.type) {
    case "START_RUN": {
      const currentEvent = getCurrentEvent(state);

      return {
        ...state,
        phase: "event",
        log: [log(currentEvent.intro), ...state.log],
      };
    }
    case "PLAY_CARD": {
      if (state.phase !== "event" || isCurrentEventResolved(state)) {
        return state;
      }

      const card = cards[action.cardId];

      if (!card || !state.hand.includes(action.cardId) || card.cost > state.actionPoints) {
        return state;
      }

      const hand = [...state.hand];
      const cardIndex = hand.indexOf(action.cardId);
      hand.splice(cardIndex, 1);

      const paidState: RunState = {
        ...state,
        actionPoints: state.actionPoints - card.cost,
        hand,
        discardPile: [...state.discardPile, action.cardId],
        log: [log(`打出“${card.name}”：${card.description}`), ...state.log],
      };

      return maybeResolveAfterProgress(applyEffects(paidState, card.effects));
    }
    case "END_TURN":
      if (state.phase !== "event") {
        return state;
      }

      return endTurn(state);
    case "NEXT_EVENT":
      if (state.phase !== "event" || !isCurrentEventResolved(state)) {
        return state;
      }

      return startNextEvent(state);
    case "RESTART":
      return createRun();
  }
}
