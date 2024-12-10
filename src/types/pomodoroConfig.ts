export const POMODORO_CONFIG = {
  WORK_TIME: 25 * 60, // 25 minutes en secondes
  SHORT_BREAK: 5 * 60, // 5 minutes en secondes
  LONG_BREAK: 15 * 60, // 15 minutes en secondes
  POMODOROS_UNTIL_LONG_BREAK: 4,
};

export type TimerMode = "travail" | "pause-courte" | "pause-longue";
