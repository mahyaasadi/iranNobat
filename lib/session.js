import cookie from "cookie";
import jwt from "jsonwebtoken";

const secret = "WD%^)(satardavoodiirannobat$#123";

export function setSession(res, session) {
  const token = jwt.sign(session, secret);
  const cookieValue = cookie.serialize("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 7 * 24, // 1 week
    sameSite: "strict",
    path: "/",
  });
  res.setHeader("Set-Cookie", cookieValue);
}

export function getSession(req) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies.session;
  const roles = cookies.roles;

  if (!token) return null;
  try {
    let UserData = jwt.verify(token, secret);
    let UserRoles = jwt.verify(roles, secret);
    return { UserData, UserRoles };
  } catch (err) {
    return null;
  }
}

export function destroySession(res) {
  console.log({ res });
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0),
      sameSite: "strict",
      path: "/",
    })
  );
}
