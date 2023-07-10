import Swal from "sweetalert2";

const ErrorAlert = (Title, Text) => {
  Swal.fire({
    title: Title,
    text: Text,
    icon: "error",
    allowOutsideClick: true,
    confirmButtonColor: "#3085d6",
    confirmButtonText: "تایید",
  });
};

const SuccessAlert = (Title, Text) => {
  Swal.fire({
    title: Title,
    text: Text,
    icon: "success",
    allowOutsideClick: true,
    confirmButtonColor: "#3085d6",
    confirmButtonText: "تایید",
  });
};

const WarningAlert = (Title, Text) => {
  Swal.fire({
    title: Title,
    text: Text,
    icon: "warning",
    allowOutsideClick: true,
    confirmButtonColor: "#3085d6",
    confirmButtonText: "تایید",
  });
};

// export default { ErrorAlert, SuccessAlert, WarningAlert };
module.exports.ErrorAlert = ErrorAlert;
module.exports.SuccessAlert = SuccessAlert;
module.exports.WarningAlert = WarningAlert;
