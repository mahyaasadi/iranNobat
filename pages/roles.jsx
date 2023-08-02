import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { axiosClient } from "class/axiosConfig.js";
import Loading from "components/loading/loading";

let CenterID = Cookies.get("CenterID");

const Roles = () => {
    const [rolesList, setRolesList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getRoles = () => {
        let url = `Roles/getAll/${CenterID}`;
        setIsLoading(true);

        axiosClient.get(url)
            .then(function (response) {
                setIsLoading(false);
                console.log(response.data);
                setRolesList(response.data);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false)
            })
    };

    useEffect(() => {
        getRoles();
    }, []);

    return (
        <>
            <div className="page-wrapper">
                <div className="content container-fluid">

                </div>
            </div>
        </>
    );
};

export default Roles;
