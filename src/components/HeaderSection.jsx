const HeaderSection = ({ pageName, openModal, setOpenModal, modalComponent }) => {
  return (
    <div className="header">
      <h1>{pageName}</h1>
      <button onClick={() => setOpenModal(true)}>Əlavə et</button>
      {openModal && modalComponent}
    </div>
  );
};

export default HeaderSection;
