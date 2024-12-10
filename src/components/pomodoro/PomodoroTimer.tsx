import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Task } from "@/types/task";
import { CircularProgress } from "./CircularProgress";
import { POMODORO_CONFIG } from "@/types/pomodoroConfig";

interface PomodoroTimerProps {
  activeTask?: Task;
  onComplete: () => void;
}

type TimerMode = "work" | "short-break" | "long-break";

export function PomodoroTimer({ activeTask, onComplete }: PomodoroTimerProps) {
  const [timeLeft, setTimeLeft] = useState(POMODORO_CONFIG.WORK_TIME);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<TimerMode>("work");
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  const getTimerDuration = useCallback((timerMode: TimerMode) => {
    switch (timerMode) {
      case "work":
        return POMODORO_CONFIG.WORK_TIME;
      case "short-break":
        return POMODORO_CONFIG.SHORT_BREAK;
      case "long-break":
        return POMODORO_CONFIG.LONG_BREAK;
    }
  }, []);

  const switchMode = useCallback(
    (newMode: TimerMode) => {
      setTimeLeft(getTimerDuration(newMode));
      setMode(newMode);
      setIsActive(false);
    },
    [getTimerDuration]
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleTimerComplete = () => {
    setIsActive(false);
    onComplete();
    new Notification("Session terminée!", {
      body: getModeMessage(mode),
    });
  };

  const getModeMessage = (currentMode: TimerMode) => {
    switch (currentMode) {
      case "work":
        return "C'est l'heure de faire une pause!";
      case "short-break":
      case "long-break":
        return "C'est l'heure de se remettre au travail!";
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getProgressPercentage = () => {
    const totalTime = getTimerDuration(mode);
    return (timeLeft / totalTime) * 100;
  };

  const getModeLabel = (currentMode: TimerMode) => {
    switch (currentMode) {
      case "work":
        return "Concentration";
      case "short-break":
        return "Pause courte";
      case "long-break":
        return "Pause longue";
    }
  };

  return (
    <div className="text-center p-6 bg-white rounded-lg shadow-md">
      <CircularProgress percentage={getProgressPercentage()} size={200}>
        <div className="text-3xl font-bold">{formatTime(timeLeft)}</div>
        <div className="text-sm text-gray-500">{getModeLabel(mode)}</div>
        <div className="text-xs text-gray-400 mt-1">
          Pomodoros: {completedPomodoros}
        </div>
      </CircularProgress>

      {activeTask && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium">Tâche en cours</h3>
          <p className="text-sm text-gray-600">{activeTask.title}</p>
        </div>
      )}

      <div className="mt-6 space-x-4">
        <Button
          onClick={() => setIsActive(!isActive)}
          variant={isActive ? "destructive" : "default"}
        >
          {isActive ? "Pause" : "Démarrer"}
        </Button>
      </div>

      <div className="mt-4 space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => switchMode("work")}
          className={mode === "work" ? "bg-violet-100" : ""}
        >
          Concentration
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => switchMode("short-break")}
          className={mode === "short-break" ? "bg-violet-100" : ""}
        >
          Pause courte
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => switchMode("long-break")}
          className={mode === "long-break" ? "bg-violet-100" : ""}
        >
          Pause longue
        </Button>
      </div>
    </div>
  );
}
