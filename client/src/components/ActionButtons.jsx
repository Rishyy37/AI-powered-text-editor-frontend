import React from 'react';

export default function ActionButtons({ onUndo, onRedo, onReset, onGo, loading, canUndo, canRedo }) {
  return (
    <div className="buttons">
      <button onClick={onUndo} disabled={!canUndo}>Undo</button>
      <button onClick={onRedo} disabled={!canRedo}>Redo</button>
      <button onClick={onReset}>Reset</button>
      <button onClick={onGo} disabled={loading}>Go</button>
    </div>
  );
}
