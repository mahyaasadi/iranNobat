import Swal from "sweetalert2";
import axios from "axios";

const ErrorAlert = (Title, Text) => {
  Swal.fire({
    title: Title,
    text: Text,
    icon: "error",
    allowOutsideClick: true,
    confirmButtonColor: "#1B5A90",
    confirmButtonText: "تایید",
  });
};

const SuccessAlert = (Title, Text) => {
  Swal.fire({
    title: Title,
    text: Text,
    icon: "success",
    allowOutsideClick: true,
    confirmButtonColor: "#1B5A90",
    confirmButtonText: "تایید",
  });
};

const WarningAlert = (Title, Text) => {
  Swal.fire({
    title: Title,
    text: Text,
    icon: "warning",
    allowOutsideClick: true,
    confirmButtonColor: "#1B5A90",
    confirmButtonText: "تایید",
  });
};

const QuestionAlert = async (Title, Text) => {
  const promise = await Swal.fire({
    title: Title,
    text: Text,
    icon: "question",
    showCancelButton: true,
    allowOutsideClick: true,
    confirmButtonColor: "#1B5A90",
    cancelButtonColor: "#d33",
    confirmButtonText: "بله",
    cancelButtonText: "خیر",
  });
  return promise.isConfirmed;
};

module.exports.ErrorAlert = ErrorAlert;
module.exports.SuccessAlert = SuccessAlert;
module.exports.WarningAlert = WarningAlert;
module.exports.QuestionAlert = QuestionAlert;
