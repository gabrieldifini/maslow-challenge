import { useEffect } from "react";

const RESET_MODAL = {
  content: "",
  visible: false,
};

const Modal = ({ modal, setModal }) => {
  useEffect(() => {
    document.addEventListener("keydown", handleHitEscape);
    return () => document.removeEventListener("keydown", handleHitEscape);
  }, [modal.visible]);

  const handleHitEscape = (e) => {
    if (e.key === "Escape") {
      setModal(RESET_MODAL);
    }
  };

  const handleClickOutside = (e) => {
    setModal(RESET_MODAL);
  };

  const handleClickInside = (e) => {
    e.stopPropagation();
  };

  return (
    modal.visible && (
      <div
        className="absolute top-0 left-0 h-screen w-screen flex flex-col justify-center"
        style={{
          backgroundColor: "var(--modal-bg)",
        }}
        onClick={handleClickOutside}
      >
        <div
          className="min-h-[200px] w-88 m-auto border-solid bg-white border border-gray-100 rounded-lg px-12 py-6 relative shadow-md"
          onClick={handleClickInside}
        >
          {modal.content}
        </div>
      </div>
    )
  );
};

export default Modal;
