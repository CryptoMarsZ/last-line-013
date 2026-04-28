import { useReducer } from "react";
import { GameBoard } from "./components/GameBoard";
import { createRun } from "./game/engine/createRun";
import { gameReducer } from "./game/engine/reducer";

export default function App() {
  const [state, dispatch] = useReducer(gameReducer, undefined, createRun);

  return <GameBoard state={state} dispatch={dispatch} />;
}
