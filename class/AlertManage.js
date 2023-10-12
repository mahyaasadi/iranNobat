import React from "react";
import ReactDOM from "react-dom";
import Swal from "sweetalert2";
import axios from "axios";
import PinInput from "react-pin-input";

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

const oneInputAlert = async (Title) => {
  const promise = await Swal.fire({
    title: Title,
    icon: "question",
    input: "text",
    showCancelButton: true,
    allowOutsideClick: true,
    confirmButtonColor: "#1B5A90",
    cancelButtonColor: "#d33",
    confirmButtonText: "تایید",
    cancelButtonText: "انصراف",
  });
  return promise.value;
};
//

export const pinInputAlert = async (Title) => {
  const swalWithReactContent = Swal.mixin({
    customClass: {
      content: "swal-content-react",
    },
  });

  let pinValue = null;
  class PinComponent extends React.Component {
    componentWillUnmount() {
      ReactDOM.unmountComponentAtNode(
        document.getElementById("react-pin-input")
      );
    }

    onChange = (value, index) => {
      pinValue = value;
      document.pinValue = value; // saving the value to the document object
    };

    render() {
      return <PinInput length={6} onChange={this.onChange} />;
    }
  }

  const result = await swalWithReactContent.fire({
    title: Title,
    html: "<div id='react-pin-input'></div>",
    onOpen: () => {
      ReactDOM.render(
        <PinComponent />,
        document.getElementById("react-pin-input")
      );
    },
    showCancelButton: true,
    allowOutsideClick: true,
    confirmButtonColor: "#1B5A90",
    cancelButtonColor: "#d33",
    confirmButtonText: "تایید",
    cancelButtonText: "انصراف",
    preConfirm: () => {
      return pinValue;
    },
  });

  return result.value;
};

module.exports.ErrorAlert = ErrorAlert;
module.exports.SuccessAlert = SuccessAlert;
module.exports.WarningAlert = WarningAlert;
module.exports.QuestionAlert = QuestionAlert;
module.exports.oneInputAlert = oneInputAlert;
