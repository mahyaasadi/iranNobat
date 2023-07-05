
const Srv = ({name,code ,SelectSrvSearch}) =>{
    var ind1 = code.indexOf("-");
    let TaminCode = code;
    code = code.substr(0,ind1);
    const Select = () =>{
        SelectSrvSearch(name,code,TaminCode);
    }
    return (
        <button className="btn btn-outline-info rounded btn-sm w-100 mb-1 right-text" onClick={Select}>{code}{" | "}{name}</button>
    )
}

export default Srv
