import { useRef, useState } from "react";
import Modal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const modal = useRef();
  const timer = useRef();

  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  function handleStart() {
    setTimerExpired(false);

    timer.current = setTimeout(() => {
      setTimerExpired(true);
      modal.current.showModal();
    }, targetTime * 1000);

    setTimerStarted(true);
  }

  function handleStop() {
    setTimerStarted(false);
    clearTimeout(timer.current);
  }

  return (
    <>
      <Modal ref={modal} targetTime={targetTime} result={"lost"} />

      <section className="challenge">
        <h2>{title}</h2>
        {timerExpired && <p>You lost!</p>}
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerStarted ? handleStop : handleStart}>
            {timerStarted ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerStarted ? "active" : undefined}>
          {timerStarted ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
