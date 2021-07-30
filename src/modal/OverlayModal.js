import React, { useState } from "react";
import "./OverlayModal.css";
const OverlayModal = () => {
  let number="4242 4242 4242 4242";
  const [isOpen, setIsOpen] = useState(true);
  const toggleModalHandler = () => {
    setIsOpen(false);
  };
  const selectNumber = ( ) => {
  document.execCommand("copy")
  };
  return (
    <>
      {isOpen && (
        <div class="modal">
          <header class="modal__header">
            <p onClick={toggleModalHandler} class="modal__header-para">
              x
            </p>
          </header>
          <main class="modal__main">
            <h2 class="modal__main-text">
              Use <span onClick={selectNumber}>{number}</span> as Card
              Number for transaction. CVV could be any 3 digit combination and
              use any future date as card validity.
            </h2>
          </main>
        </div>
      )}
    </>
  );
};

export default OverlayModal;
