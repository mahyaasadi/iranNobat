import { getSession } from "../../lib/session";

export default function getUserToken(req, res) {
  const session = req;
  let token = getSession(req);
  console.log(token);
  res.send(token);
}
