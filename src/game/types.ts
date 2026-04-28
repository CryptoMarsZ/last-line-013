export type CardType = "action" | "item" | "evidence" | "passenger" | "negative";

export type CardTag =
  | "face"
  | "evade"
  | "investigate"
  | "calm"
  | "ticket"
  | "memory"
  | "xiaoxiangdong"
  | "negative";

export type Effect =
  | { type: "advance"; amount: number }
  | { type: "draw"; amount: number }
  | { type: "healSanity"; amount: number }
  | { type: "gainPressure"; amount: number }
  | { type: "reducePressure"; amount: number }
  | { type: "addNegativeCard"; cardId: string; amount: number }
  | { type: "changeRelation"; passengerId: string; amount: number }
  | { type: "gainEvidence"; evidenceId: string }
  | { type: "gainItem"; itemId: string };

export interface Card {
  id: string;
  name: string;
  type: CardType;
  cost: number;
  description: string;
  flavor: string;
  tags: CardTag[];
  effects: Effect[];
}

export interface EventReward {
  description: string;
  effects: Effect[];
}

export interface StationEvent {
  id: string;
  stationId: string;
  name: string;
  objectiveName: string;
  objectiveValue: number;
  turnLimit: number;
  intro: string;
  successText: string;
  failureText: string;
  successReward: EventReward;
  failurePenalty: EventReward;
}

export interface Station {
  id: string;
  name: string;
  chapter: string;
  description: string;
  eventIds: string[];
}

export interface PassengerState {
  id: string;
  name: string;
  relation: number;
  description: string;
}

export interface ResolvedEvent {
  eventId: string;
  outcome: "success" | "failure";
}

export interface GameLogEntry {
  id: number;
  text: string;
  tone?: "neutral" | "good" | "bad";
}

export interface RunState {
  phase: "intro" | "event" | "complete";
  currentStationId: string;
  currentEventIndex: number;
  currentObjective: number;
  turnsRemaining: number;
  actionPoints: number;
  maxActionPoints: number;
  sanity: number;
  maxSanity: number;
  pressure: number;
  maxPressure: number;
  collapseCount: number;
  deck: string[];
  hand: string[];
  discardPile: string[];
  exhaustedCards: string[];
  evidence: string[];
  items: string[];
  negativeCardsAdded: number;
  passengers: Record<string, PassengerState>;
  resolvedEvents: ResolvedEvent[];
  log: GameLogEntry[];
}

export type GameAction =
  | { type: "START_RUN" }
  | { type: "PLAY_CARD"; cardId: string }
  | { type: "END_TURN" }
  | { type: "NEXT_EVENT" }
  | { type: "RESTART" };
