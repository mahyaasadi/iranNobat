import { getSession } from "lib/SessionMange";
import Cookies from "js-cookie";
const getUserData = async (session, roles) => {
  const UserData = await getSession(session);
  const UserRoles = await getSession(roles);
  return { UserData, UserRoles };
};

export default getUserData;
