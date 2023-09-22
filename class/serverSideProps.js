import { getSession } from "lib/session";

export const getServerSideProps = async ({ req, res }) => {
    // userInfo
    const { UserData, UserRoles } = await getSession(req);
    console.log({ UserRoles, UserData });

    // menusList
    const data = await fetch("https://api.irannobat.ir/InoMenu/getAll");
    const Menus = await data.json();
    return { props: { Menus, UserData, UserRoles } };
};

module.exports.getServerSideProps = getServerSideProps;