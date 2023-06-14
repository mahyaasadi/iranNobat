// import { useQuery } from "react-query";
// import React, { useState } from "react";
// import axios from "axios";

// async function getUserData(userId) {
//   let token = { Token: sessionStorage.getItem("SEID") };
//   const response = axios
//     .post("https://irannobat.ir:8444/api/AdminUser/getUserByToken", token)
//     .then(function (response) {
//       console.log(response.data);
//     });
//   return response.data;
// }

// function UsersData() {
//   const { data, isError, error, isLoading } = useQueryClient(
//     ["userData"],
//     getUserData
//   );
//   console.log({ data });

//   return (
//     <>
//       <ul>
//         {data.map((userData) => (
//           <li key={userData.id}>{userData.FullName}</li>
//         ))}
//       </ul>
//     </>
//   );
// }

// export default UsersData;
