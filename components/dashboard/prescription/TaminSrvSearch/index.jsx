import Srv from "./srv";

const TaminSrvSearch = ({ data, SelectSrvSearch, favEprescItems }) => {
  // if (data) {
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
  // } else {
  //   return favEprescItems.map((srv, index) => {
  //     return (
  //       <Srv
  //         key={index}
  //         name={srv?.SrvName}
  //         code={srv?.SrvCode}
  //         type={srv?.prescType}
  //         SelectSrvSearch={SelectSrvSearch}
  //         paraTarefCode={srv?.parGrpCode}
  //       />
  //     );
  //   });
  // }
};
export default TaminSrvSearch;
