import Swal from "sweetalert2";
import axios from "axios";

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

const QuestionDeleteAlert = (Title, Text, url, data) => {
  console.log("url", url);
  console.log("data", { data });
  console.log("click");

  Swal.fire({
    title: Title,
    text: Text,
    icon: "question",
    showCancelButton: true,
    allowOutsideClick: true,
    confirmButtonColor: "#0db1ca",
    cancelButtonColor: "#d33",
    confirmButtonText: "بله",
    cancelButtonText: "خیر",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(url, { data })
        .then(function (response) {
          return response;
          //   console.log("clicked");
        })
        .catch(function (error) {
          return error;
        });
    } else {
      return false;
    }
  });
};

module.exports.ErrorAlert = ErrorAlert;
module.exports.SuccessAlert = SuccessAlert;
module.exports.WarningAlert = WarningAlert;
module.exports.QuestionDeleteAlert = QuestionDeleteAlert;
