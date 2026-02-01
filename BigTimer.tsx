
import React from 'react';
import { TimerMode } from '../types';
import { COLORS } from '../constants';

interface BigTimerProps {
  seconds: number;
  mode: TimerMode;
  isActive: boolean;
  onToggle: () => void;
  onTimeChange: (newSeconds: number) => void;
}

const BigTimer: React.FC<BigTimerProps> = ({ seconds, mode, isActive, onToggle, onTimeChange }) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    const m = parseInt(val) || 0;
    const safeM = Math.min(m, 999);
    onTimeChange(safeM * 60 + remainingSeconds);
  };

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    const s = parseInt(val) || 0;
    const safeS = Math.min(s, 59);
    onTimeChange(minutes * 60 + safeS);
  };

  const formatValue = (val: number) => val.toString().padStart(2, '0');

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className={`flex items-center font-sans font-black tabular-nums transition-colors duration-500 timer-shadow ${COLORS[mode]}`}>
        {isActive ? (
          <span className="text-8xl md:text-[11rem] tracking-tighter leading-none">
            {formatValue(minutes)}:{formatValue(remainingSeconds)}
          </span>
        ) : (
          <div className="flex items-center text-8xl md:text-[11rem] tracking-tighter leading-none gap-2">
            <input
              type="text"
              inputMode="numeric"
              value={formatValue(minutes)}
              onChange={handleMinutesChange}
              className="w-[3.5ch] bg-stone-200/40 border-none outline-none text-center focus:ring-0 p-4 hover:bg-stone-200/70 rounded-3xl transition-all cursor-edit"
              title="Edit minutes"
            />
            <span className="opacity-20 -translate-y-2">:</span>
            <input
              type="text"
              inputMode="numeric"
              value={formatValue(remainingSeconds)}
              onChange={handleSecondsChange}
              className="w-[3.5ch] bg-stone-200/40 border-none outline-none text-center focus:ring-0 p-4 hover:bg-stone-200/70 rounded-3xl transition-all cursor-edit"
              title="Edit seconds"
            />
          </div>
        )}
      </div>
      <button
        onClick={onToggle}
        className={`px-14 py-4 rounded-2xl border-2 border-stone-800 text-[13px] font-black uppercase tracking-[0.25em] transition-all hover:bg-stone-800 hover:text-stone-50 active:scale-95 shadow-md ${isActive ? 'bg-stone-800 text-stone-50' : 'text-stone-800 bg-white/80 backdrop-blur-sm'}`}
      >
        {isActive ? 'Pause' : 'Start Focus'}
      </button>
    </div>
  );
};

export default BigTimer;