import Srv from "./srv";

const TaminSrvSearch = ({ data, SelectSrvSearch, favEprescItems }) => {
  return data.map((srv, index) => {
    return (
      <Srv
        key={index}
        name={srv?.srvName}
        code={srv?.wsSrvCode}
        type={srv?.srvType?.srvType}
        SelectSrvSearch={SelectSrvSearch}
        paraTarefCode={srv?.parTarefGrp?.parGrpCode}
      />
    );
  });
};

export default TaminSrvSearch;
