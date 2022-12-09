const ModalLayout = ({ children, setModal }) => {
  window.onclick = (e) => {
    if (e.target === document.querySelector(".modal")) {
      setModal(false);
    }
  };
  return (
    <div className="modal">
      <div className="modal-content">{children}</div>
    </div>
  );
};

export default ModalLayout;
