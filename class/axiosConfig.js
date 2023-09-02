import axios from "axios";
// import Cookies from "js-cookie";

// let CenterID = Cookies.get("CenterID");

export const axiosClient = axios.create({
  baseURL: "https://api.irannobat.ir/",

  // headers: {
  //   CenterID: CenterID,
  //   // UserID: ,
  // },
});
