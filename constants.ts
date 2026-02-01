
import { TimerMode } from './types';

export const TIMER_CONFIG = {
  [TimerMode.POMODORO]: 25 * 60,
  [TimerMode.SHORT_BREAK]: 5 * 60,
  [TimerMode.LONG_BREAK]: 15 * 60,
};

export const COLORS = {
  [TimerMode.POMODORO]: 'text-amber-900',
  [TimerMode.SHORT_BREAK]: 'text-emerald-800',
  [TimerMode.LONG_BREAK]: 'text-cyan-800',
};
