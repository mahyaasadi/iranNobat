import { setSession } from "../../lib/session";

export default function loginSuccess(req, res) {
   const session = req.body;
   console.log(session);
   setSession(res, session);
   res.redirect("/");
  }