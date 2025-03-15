import jwt from "jsonwebtoken";

const generateAccessToken = (payload) => {
  console.log(`New access token generated:`, payload.id);
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const generateRefreshToken = (payload) => {
  console.log(`New refresh token generated:`, payload.id);
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "24h",
  });
};

const decodeJWT = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    return null;
  }
};

export { generateAccessToken, generateRefreshToken, decodeJWT };
