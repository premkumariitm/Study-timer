
import React, { useState, useEffect, useCallback, useRef } from 'react';
import PaperSheet from './components/PaperSheet';
import BigTimer from './components/BigTimer';
import NoteArea from './components/NoteArea';
import { TimerMode } from './types';
import { TIMER_CONFIG } from './constants';

const App: React.FC = () => {
  const [mode, setMode] = useState<TimerMode>(TimerMode.POMODORO);
  // Store custom configurations so edits persist when switching modes
  const [configs, setConfigs] = useState<Record<TimerMode, number>>(TIMER_CONFIG);
  const [secondsLeft, setSecondsLeft] = useState(TIMER_CONFIG[TimerMode.POMODORO]);
  const [isActive, setIsActive] = useState(false);
  
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const playFinishSound = useCallback(() => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    audio.play().catch(() => {});
  }, []);

  const switchMode = useCallback((newMode: TimerMode) => {
    setMode(newMode);
    setSecondsLeft(configs[newMode]);
    setIsActive(false);
  }, [configs]);

  useEffect(() => {
    if (isActive && secondsLeft > 0) {
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isActive) {
      setIsActive(false);
      playFinishSound();
      
      // Auto-switch modes logic
      const nextMode = mode === TimerMode.POMODORO ? TimerMode.SHORT_BREAK : TimerMode.POMODORO;
      switchMode(nextMode);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, secondsLeft, mode, switchMode, playFinishSound]);

  const handleToggleTimer = () => setIsActive(!isActive);

  const handleReset = () => {
    setIsActive(false);
    setSecondsLeft(configs[mode]);
  };

  const handleTimeChange = (newSeconds: number) => {
    const safeSeconds = Math.max(0, newSeconds);
    setSecondsLeft(safeSeconds);
    // Automatically save the edited time to this mode's configuration
    setConfigs(prev => ({
      ...prev,
      [mode]: safeSeconds
    }));
  };

  return (
    <div className="min-h-screen p-4 flex flex-col items-center">
      <nav className="mt-6 mb-10 flex gap-8">
        {Object.values(TimerMode).map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`px-1 py-1 text-[10px] uppercase tracking-[0.3em] transition-all border-b-2 font-black ${
              mode === m ? 'border-stone-800 text-stone-800' : 'border-transparent text-stone-300 hover:text-stone-500'
            }`}
          >
            {m}
          </button>
        ))}
      </nav>

      <div className="w-full flex flex-col items-center gap-12">
        <section className="flex flex-col items-center">
          <BigTimer 
            seconds={secondsLeft} 
            mode={mode} 
            isActive={isActive} 
            onToggle={handleToggleTimer} 
            onTimeChange={handleTimeChange}
          />
          <button 
            onClick={handleReset}
            className="mt-6 text-[9px] font-bold uppercase tracking-widest text-stone-300 hover:text-stone-500 transition-colors"
          >
            Reset to default
          </button>
        </section>

        <section className="flex justify-center mb-12">
          <PaperSheet>
            <NoteArea />
          </PaperSheet>
        </section>
      </div>

      <footer className="mt-auto py-6 text-stone-300 text-[9px] font-bold tracking-[0.4em] uppercase">
        Parchment
      </footer>
    </div>
  );
};

export default App;
