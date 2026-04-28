import { startingDeck } from "../data/cards";
import { events } from "../data/events";
import { stations } from "../data/stations";
import type { GameLogEntry, PassengerState, RunState } from "../types";

const initialPassengers: Record<string, PassengerState> = {
  xu_xiangdong: {
    id: "xu_xiangdong",
    name: "许向东",
    relation: 0,
    description: "抱着白花的老人，只记得自己要去终点站接女儿。",
  },
  shen_mian: {
    id: "shen_mian",
    name: "沈眠",
    relation: 0,
    description: "戴着耳机的学生，手里攥着一部破碎手机。",
  },
  zhou_jie: {
    id: "zhou_jie",
    name: "周姐",
    relation: 0,
    description: "地铁清洁工，对你有些信任。",
  },
};

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
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

function makeLog(text: string, tone?: GameLogEntry["tone"]): GameLogEntry {
  return {
    id: Date.now() + Math.floor(Math.random() * 1000),
    text,
    tone,
  };
}

export function createRun(): RunState {
  const station = stations.boarding;
  const firstEvent = events[station.eventIds[0]];

  const baseState: RunState = {
    phase: "intro",
    currentStationId: station.id,
    currentEventIndex: 0,
    currentObjective: 0,
    turnsRemaining: firstEvent.turnLimit,
    actionPoints: 3,
    maxActionPoints: 3,
    sanity: 6,
    maxSanity: 6,
    pressure: 0,
    maxPressure: 8,
    collapseCount: 0,
    deck: shuffle(startingDeck),
    hand: [],
    discardPile: [],
    exhaustedCards: [],
    evidence: [],
    items: [],
    negativeCardsAdded: 0,
    passengers: initialPassengers,
    resolvedEvents: [],
    log: [
      makeLog("凌晨 0:13，末班车进站。车头没有编号。"),
      makeLog("广播提醒：请保管好随身物品，遗失的记忆本站不予招领。"),
    ],
  };

  return drawCards(baseState, 5);
}
