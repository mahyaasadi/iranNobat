const Srv = ({ name, code, SelectSrvSearch, type, paraTarefCode }) => {
  var ind1 = code.indexOf("-");
  let TaminCode = code;

  if (ind1 != -1) code = code.substr(0, ind1);

  const Select = () => {
    SelectSrvSearch(name, code, TaminCode, type, paraTarefCode);
  };

  return (
    <button
      className="btn btn-outline-info border-radius btn-sm w-100 mb-1 right-text"
      onClick={Select}
    >
      {code}
      {" | "}
      {name}
    </button>
  );
};

export default Srv;
