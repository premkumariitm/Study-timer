
export enum TimerMode {
  POMODORO = 'Focus',
  SHORT_BREAK = 'Short Break',
  LONG_BREAK = 'Long Break'
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}
