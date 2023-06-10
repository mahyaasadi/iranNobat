import cookie from "cookie";
import jwt from "jsonwebtoken";

const secret = "BAuykjh";

export function setSession(session) {
//   const token = jwt.sign(session, secret);
  const cookieValue = cookie.serialize("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    sameSite: "strict",
    path: "/",
  });
}

export function getSession(req) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies.session;
  if (!token) return null;
  try {
    return token;
  } catch (err) {
    return null;
  }
}

export function destroySession(res) {
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