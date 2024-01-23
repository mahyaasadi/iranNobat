const Srv = ({ name, code, SelectSrvSearch, type, paraTarefCode }) => {
  const Select = () => {
    SelectSrvSearch(name, code, code, type, paraTarefCode);
  };

  return (
    <button
      className="btn btn-outline-info border-radius btn-sm w-100 mb-1 right-text bg-white selectSearchBtn"
      onClick={Select}
    >
      {name}
      {" | "}
      {code}
    </button>
  );
};

export default Srv;
