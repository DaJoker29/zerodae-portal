import { User } from "../models/index.mjs";
import { generateAccessToken, decodeJWT } from "../utils/jwt.mjs";

const authenticateJWT = async (req, res, next) => {
  try {
    const { refreshToken, accessToken } = req.cookies;
    const decodedAccess = decodeJWT(accessToken);
    const decodedRefresh = decodeJWT(refreshToken);

    if (decodedAccess) {
      req.user = await User.findOne({ _id: decodedAccess.id });
      return next();
    } else if (decodedRefresh) {
      const user = await User.findOne({ _id: decodedRefresh.id });
      res.cookie("accessToken", generateAccessToken({ id: user.id }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      req.user = user;
      return next();
    } else {
      res.status(401);
      return res.send("Token is invalid");
    }
  } catch (err) {
    next(err);
  }
};

export { authenticateJWT };
