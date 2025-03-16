import { User } from "../models/index.mjs";
import transporter from "../services/smtp.mjs";
import {
  generateAccessToken,
  generateRefreshToken,
  decodeJWT,
} from "../utils/jwt.mjs";

const generate = async (req, res, next) => {
  try {
    const { phone, email } = req.body;

    if (email || phone) {
      const user = await User.findOne({ $or: [{ phone }, { email }] });

      if (user) {
        const accessToken = generateAccessToken({ id: user.id });
        const refreshToken = generateRefreshToken({ id: user.id });
        user.refreshToken = refreshToken;
        await user.save();

        const mailOptions = {
          from: process.env.EMAIL_FROM,
          html: htmlTemplate(accessToken),
          subject: process.env.EMAIL_SUBJECT,
          to: `${user.name.full} <${user.email}>`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            return next(err);
          }

          console.log(`Token generated: ${user.email}`);
          res.sendStatus(200);
        });
      } else {
        return res.status(404).send("User not found");
      }
    }
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { token: accessToken } = req.body;

  // Token validation
  if (!accessToken) {
    res.status(403);
    return res.send("Can't verify user.");
  }

  const decoded = decodeJWT(accessToken);

  if (!decoded || !decoded.id) {
    res.status(403);
    return res.send("Invalid auth credentials");
  }

  const user = await User.findOne({ _id: decoded.id });

  if (!user) {
    res.status(404);
    return res.send("User not found");
  }

  console.log(`Authenticated: ${user.email}`);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200);
  return res.send("User has been validated");
};

const logout = (req, res, next) => {
  res.send("Logout");
};

const refreshToken = (req, res, next) => {
  const { refreshToken } = req.cookies;
  console.log("Refresh endpoint hit");

  if (refreshToken) {
  }
  res.status(401);
  res.send("Token expired.");
};

const whoami = async (req, res, next) => {
  const { user } = req;
  if (user) {
    return res.json(user);
  } else {
    res.status(404);
    return res.send("No user found");
  }
};

const check = async (req, res, next) => {
  const { user } = req;

  if (user) {
    res.status(200);
    return res.send("User is valid");
  }

  res.status(401);
  return res.send("Unauthorized");
};

export { generate, login, logout, refreshToken, whoami, check };

function htmlTemplate(accessToken) {
  return `
<h2>Hey there!</h2>
<p>Here's the login link you requested:</p>
<p><a href="http://localhost:5173/login?token=${accessToken}">Click here</a></p>
`;
}
