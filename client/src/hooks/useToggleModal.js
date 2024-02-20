import { useState } from "react";

export function useToggleModal() {
  const [isShownModal, setIsShownModal] = useState(false); // Initial state for the modal
  const toggleModal = () => {
    // Change state of the modal
    setIsShownModal(!isShownModal);
  };

  return [isShownModal, toggleModal];
}
