import { useRef, useState } from "react";
import Modal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const modal = useRef();
  const timer = useRef();

  const [remainingTimer, setRemainingTimer] = useState(targetTime * 1000);

  const timerIsActive =
    remainingTimer > 0 && remainingTimer < targetTime * 1000;

  if (remainingTimer <= 0) {
    clearInterval(timer.current);
    modal.current.open();
  }

  function handleRestart() {
    setRemainingTimer(targetTime * 1000);
    modal.current.close();
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setRemainingTimer((curRemainingTimer) => curRemainingTimer - 10);
    }, 10);
  }

  function handleStop() {
    clearInterval(timer.current);
    modal.current.open();
  }

  return (
    <>
      <Modal
        ref={modal}
        targetTime={targetTime}
        remainingTime={remainingTimer}
        handleRestart={handleRestart}
      />

      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
