const PrescriptionType = ({img , name , active , id , changePrescId}) =>{
    const Select = ()=>{
        $(".prescService").hide();
        let prescTypeId =  $(".prescTypeId"+id);
        prescTypeId.show();
            switch (id) {
                case 1:
                    $("#ServiceSearchSelect").val("01");
                    $("#ServiceSearchSelect").hide();
                    changePrescId('01',img);
                    break;
                case 2:
                    $("#ServiceSearchSelect").show();
                    $("#ServiceSearchSelect").val("02");
                    changePrescId('02',img);
                    break;
                case 3:
                    $("#ServiceSearchSelect").val("16");
                    $("#ServiceSearchSelect").hide();
                    changePrescId('16',img);
                    break;
                case 5:
                    $("#ServiceSearchSelect").val("17");
                    $("#ServiceSearchSelect").hide();
                    changePrescId('17',img);
                    break;
                default:
                    break;
            }
            
    }
    return (
        <>
            <li className="nav-item">
                <a className={'nav-link '+ active} href={'#bottom-tab'+id} id={"prescTypeId"+id}  data-bs-toggle="tab" onClick={Select}>
                    <img src={img} height="20" /> &nbsp;
                     {name}
                    <span className="badge badge-primary" id="badge_TaminPrescTypeID1"></span>
                </a>
            </li>
        </>
    )
}

export default PrescriptionType
