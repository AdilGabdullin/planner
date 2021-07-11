import { useState } from "react";
import { Artboard } from "./Artboard";
import { Selector } from "./Selector";

export function App() {
  const [dropShadow, setDropShadow] = useState(new Image());
  return (
    <>
      <Selector {...{ setDropShadow }} />
      <Artboard {...{ dropShadow }} />
    </>
  );
}
