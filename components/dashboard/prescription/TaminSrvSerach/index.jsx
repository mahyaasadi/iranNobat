import Srv from "./obj";
const TaminSrvSerach = ({ data, SelectSrvSearch }) => {
  return data.map((srv) => {
    return (
      <Srv
        name={srv.srvName}
        code={srv.wsSrvCode}
        type={srv.srvType.srvType}
        // taminCode={srv.taminCode}
        SelectSrvSearch={SelectSrvSearch}
      />
    );
  });
};

export default TaminSrvSerach;
