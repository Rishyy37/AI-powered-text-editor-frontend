import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './index.css';

import Editor from './components/Editor';
import Controls from './components/Controls';

export default function App() {
  const [text, setText] = useState('');
  const [toneLevel, setToneLevel] = useState(50);
  const [sliderValue, setSliderValue] = useState(50);
  const [pendingTone, setPendingTone] = useState(50);
  const [isSliderActive, setIsSliderActive] = useState(false);
  const [history, setHistory] = useState([]);   
  const [future, setFuture] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('toneText');
    if (saved) setText(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('toneText', text);
  }, [text]);

  const handleToneChange = async (newTone) => {
    setToneLevel(newTone);
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:3001/tone-adjust', {
        text,
        toneLevel: newTone,
      });
      setHistory([...history, { text, tone: toneLevel }]);
      setText(response.data.result);
      setToneLevel(newTone);
      setFuture([]);
    } catch (err) {
      setError('Failed to adjust tone.');
    } finally {
      setLoading(false);
    }
  };

  const handleGo = () => {
    if (text.trim() === '') {
      window.alert("Please enter some text before adjusting the tone.");
      return;
    }
    setSliderValue(pendingTone);
    handleToneChange(pendingTone);
  };

  const handleUndo = () => {
    if (!history.length || history.length === 1) {
      window.alert("No more undo steps available.");
      return;
    }

    const prev = history[history.length - 1];
    setFuture([{ text, tone: toneLevel }, ...future]);
    setText(prev.text);
    setPendingTone(prev.tone);
    setSliderValue(prev.tone);
    setToneLevel(prev.tone);
    setHistory(history.slice(0, -1));
  };

  const handleRedo = () => {
    if (!future.length) return;

    const next = future[0];
    setHistory([...history, { text, tone: toneLevel }]);
    setText(next.text);
    setPendingTone(next.tone);
    setSliderValue(next.tone);
    setToneLevel(next.tone);
    setFuture(future.slice(1));
  };

  const handleReset = () => {
    if (text.trim() === '') {
      window.alert("Please enter some text before resetting.");
      return;
    }
    setHistory([...history, { text, tone: toneLevel }]);
    setText('');
    setToneLevel(50);
    setSliderValue(50);
    setPendingTone(50);
    setFuture([]);
  };

  // NEW: Load selected history version
  const loadHistoryVersion = (index) => {
    const selected = history[index];
    setFuture([{ text, tone: toneLevel }, ...future]);
    setText(selected.text);
    setPendingTone(selected.tone);
    setSliderValue(selected.tone);
    setToneLevel(selected.tone);
    setHistory(history.slice(0, index));
  };

  return (
    <div className="app">
      <Editor text={text} setText={setText} error={error} />
      <Controls
        pendingTone={pendingTone}
        setPendingTone={setPendingTone}
        sliderValue={sliderValue}
        setSliderValue={setSliderValue}
        isSliderActive={isSliderActive}
        setIsSliderActive={setIsSliderActive}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onReset={handleReset}
        onGo={handleGo}
        canUndo={history.length > 0}
        canRedo={future.length > 0}
        loading={loading}
      />

      {/* NEW History Panel */}
      <div className="history-panel px-3">
        <p style={{ fontWeight: 600 }}>History</p>
        {history.length === 0 ? (
          <p style={{ fontSize: '0.9em', color: 'gray' }}>No history yet.</p>
        ) : (
          <ul className="history-list">
            {history.map((entry, index) => (
              <li key={index} onClick={() => loadHistoryVersion(index)}>
                <span style={{ fontWeight: 'bold' }}>Tone {entry.tone}</span> — {entry.text.slice(0, 30)}...
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
