import React from 'react';

export default function Editor({ text, setText, error }) {
  return (
    <div className="editor">
      <textarea
        placeholder=" Enter text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {error && <p className="error">{error}</p>}
    </div>
  );
}
