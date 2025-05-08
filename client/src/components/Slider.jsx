import React from 'react';

export default function Slider({ pendingTone, setPendingTone, isSliderActive, setIsSliderActive }) {
  return (
    <div className="slider-container" style={{ position: 'relative', width: '300px' }}>
      <input
        type="range"
        min="0"
        max="100"
        value={pendingTone}
        onChange={(e) => setPendingTone(parseInt(e.target.value, 10))}
        style={{ width: '100%' }}
        onMouseDown={() => setIsSliderActive(true)}
        onTouchStart={() => setIsSliderActive(true)}
        onMouseUp={() => setIsSliderActive(false)}
        onTouchEnd={() => setIsSliderActive(false)}
        onBlur={() => setIsSliderActive(false)}
      />
      {isSliderActive && (
        <div id="bubble" style={{ left: `calc(${pendingTone}%)` }}>
          {pendingTone}
        </div>
      )}
    </div>
  );
}
