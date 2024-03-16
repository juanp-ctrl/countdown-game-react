import { forwardRef, useImperativeHandle, useRef } from "react";
import {createPortal} from "react-dom";

const Modal = forwardRef(function Modal(
  { targetTime, remainingTime, handleRestart },
  ref
) {
  const internalDialogRef = useRef();

  const userLost = remainingTime <= 0;
  const remainingTimeInSeconds = (remainingTime / 1000).toFixed(3);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  useImperativeHandle(ref, () => {
    return {
      open() {
        internalDialogRef.current.showModal();
      },
      close() {
        internalDialogRef.current.close();
      }
    };
  });

  return createPortal(
    <dialog ref={internalDialogRef} className="result-modal" onClose={handleRestart}>
      {userLost ? <h2>You lost</h2> : <h2>Your score is {score}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>{remainingTimeInSeconds} seconds left.</strong>
      </p>
      <div>
        <button onClick={handleRestart}>Close</button>
      </div>
    </dialog>,
    document.getElementById('modal')
  );
});

export default Modal;
