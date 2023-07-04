const PrescriptionServiceType = ({srvType,prescTypeId, srvTypeDes ,Active}) =>{
    let Hide = "disNone"
    if (Active){
        Hide = "";
    }
    return (
        <>
            <option type="button" value={srvType} class={"btn btn-outline-primary btn-sm btn-select-service-type prescService m-1 "+Active+" "+Hide+" prescTypeId"+prescTypeId} id={"prescService" + srvType}>
                {srvTypeDes}
            </option>
        </>
    )
}

export default PrescriptionServiceType
