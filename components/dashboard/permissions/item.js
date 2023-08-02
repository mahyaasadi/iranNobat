import { useState, useEffect } from "react";

export default function Item({ item }) {
  //   const [usersPermissionList, setUsersPermissionList] = useState([]);
  //   const [isLoading, setIsLoading] = useState(true);

  //   const getUserPermissions = () => {
  //     let url = "Permision/getAll";

  //     axiosClient.get(url).then(function (response) {
  //       if (response.data) {
  //         setIsLoading(false);
  //         console.log(response.data);
  //         setUsersPermissionList(response.data);
  //       }
  //     });
  //   };

  //   useEffect(() => {
  //     getUserPermissions();
  //   }, []);

  return (
    <div>
      {item.name}
    </div>
  );
}
