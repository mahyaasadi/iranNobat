import Srv from "./obj";
const TaminSrvSerach = ({ data, SelectSrvSearch }) => {
  return data.map((srv, index) => {
    console.log(srv);
    return (
      <Srv
        key={index}
        name={srv.srvName}
        code={srv.wsSrvCode}
        type={srv.srvType.srvType}
        SelectSrvSearch={SelectSrvSearch}
        ParTaref={srv.parTarefGrp?.parGrpCode}
      />
    );
  });
};

export default TaminSrvSerach;
