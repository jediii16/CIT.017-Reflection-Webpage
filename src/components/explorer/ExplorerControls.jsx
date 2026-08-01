import { Globe2, Map, RotateCcw } from "lucide-react";

export default function ExplorerControls({ mode, animating, onToggle, onReset }) {
  const isMap = mode === "map";

  return (
    <div className="explorer-controls" aria-label="Map controls">
      <button className="control-button secondary" onClick={onReset} disabled={animating}>
        <RotateCcw size={17} />
        <span>Reset</span>
      </button>
      <button className="control-button primary" onClick={onToggle} disabled={animating}>
        {isMap ? <Globe2 size={18} /> : <Map size={18} />}
        <span>{isMap ? "Roll to Globe" : "Roll to Map"}</span>
      </button>
    </div>
  );
}
