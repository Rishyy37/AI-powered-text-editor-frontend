import React from 'react';
import Slider from './Slider';
import ToneLabels from './ToneLabels';
import ActionButtons from './ActionButtons';

export default function Controls({
  pendingTone, setPendingTone, sliderValue, setSliderValue,
  isSliderActive, setIsSliderActive,
  onUndo, onRedo, onReset, onGo,
  canUndo, canRedo, loading
}) {
  return (
    <div className="controls">
      <p>Set Output Tone</p>
      <Slider
        pendingTone={pendingTone}
        setPendingTone={setPendingTone}
        isSliderActive={isSliderActive}
        setIsSliderActive={setIsSliderActive}
      />
      <ToneLabels />
      <ActionButtons
        onUndo={onUndo}
        onRedo={onRedo}
        onReset={onReset}
        onGo={onGo}
        loading={loading}
        canUndo={canUndo}
        canRedo={canRedo}
      />
      {loading && <p>Adjusting tone...</p>}
    </div>
  );
}
