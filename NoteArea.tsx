
import React, { useState } from 'react';

const NoteArea: React.FC = () => {
  const [content, setContent] = useState('');

  return (
    <div className="flex items-center justify-center bg-transparent">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder=""
        className="w-[600px] h-[300px] bg-transparent border-none outline-none font-caprasimo text-2xl text-stone-700 placeholder-transparent resize-none p-12 leading-relaxed"
        spellCheck={false}
      />
    </div>
  );
};

export default NoteArea;