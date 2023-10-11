// import cookie from "cookie";
import jwt from "jsonwebtoken";

const secret = "WD%^)(satardavoodiirannobat$#123";

export function setSession(session) {
  const token = jwt.sign(session, secret);
  return token;
}

export function setSessionJson(session) {
  const token = jwt.sign(JSON.stringify(session), secret);
  return token;
}

export function getSession(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
}
