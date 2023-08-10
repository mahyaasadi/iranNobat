import axios from "axios";
import Cookies from "js-cookie";

let CenterID = Cookies.get("CenterID");

export const axiosClient = axios.create({
  baseURL: "https://irannobat.ir:8444/api/",

  // headers: {
  //   CenterID: CenterID,
  //   // UserID: ,
  // },
});
