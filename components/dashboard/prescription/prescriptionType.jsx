import Image from "next/image";

const PrescriptionType = ({ img, name, active, id, changePrescId }) => {
  const Select = () => {
    $(".prescService").hide();
    let prescTypeId = $(".prescTypeId" + id);
    prescTypeId.show();

    switch (id) {
      case 1:
        $("#ServiceSearchSelect").val("01");
        $("#ServiceSearchSelect").hide();

        $("#drugInstruction").show();
        $("#drugAmount").show();
        changePrescId("01", img, name, 1);
        break;
      case 2:
        $("#ServiceSearchSelect").show();
        $("#ServiceSearchSelect").val("02");

        $("#drugInstruction").hide();
        $("#drugAmount").hide();
        changePrescId("02", img, name, 2);
        break;
      case 3:
        $("#ServiceSearchSelect").val("16");
        $("#ServiceSearchSelect").hide();
        $("#drugInstruction").hide();
        $("#drugAmount").hide();

        changePrescId("16", img, name, 3);
        break;
      case 5:
        $("#ServiceSearchSelect").val("17");
        $("#ServiceSearchSelect").hide();
        $("#drugInstruction").hide();
        $("#drugAmount").hide();

        changePrescId("17", img, name, 5);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <li className="nav-item">
        <a
          className={"nav-link media-nav-link " + active}
          href={"#bottom-tab" + id}
          id={"prescTypeId" + id}
          data-bs-toggle="tab"
          onClick={Select}
        >
          <Image src={img} alt="prescTypeIcon" height="20" width="20" /> &nbsp;
          {name}{" "}
          <span
            className="badge badge-primary"
            id={"srvItemCountId" + id}
          ></span>
        </a>
      </li>
    </>
  );
};

export default PrescriptionType;

