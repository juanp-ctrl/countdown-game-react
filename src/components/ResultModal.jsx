import { forwardRef, useImperativeHandle, useRef } from "react";

const Modal = forwardRef(function Modal({ result, targetTime }, ref) {
  const internalDialogRef = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        internalDialogRef.current.showModal();
      },
    };
  });

  return (
    <dialog ref={internalDialogRef} className="result-modal">
      <h2>You {result}</h2>
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with <strong>X seconds left.</strong>
      </p>
      <form action="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default Modal;
