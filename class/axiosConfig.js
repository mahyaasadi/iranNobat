import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://irannobat.ir:8444/api/",
});
