import { User } from "../models/index.mjs";
import transporter from "../services/smtp.mjs";
import jwt from "jsonwebtoken";

const generate = async (req, res, next) => {
  try {
    const { phone, email } = req.body;

    if (email || phone) {
      const user = await User.findOne({ $or: [{ phone }, { email }] });

      if (user) {
        const accessToken = generateAccessToken(user.id);

        const mailOptions = {
          from: process.env.EMAIL_FROM,
          html: htmlTemplate(accessToken),
          subject: process.env.EMAIL_SUBJECT,
          to: `${user.full_name} <${user.email}>`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            return next(err);
          }

          console.log(`token sent: ${user.email}`);
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

  let decoded, user;

  try {
    decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
  } catch (err) {
    res.status(403);
    return res.send("Invalid auth credentials");
  }

  if (!decoded.id) {
    res.status(403);
    return res.send("Invalid auth credentials");
  }

  user = await User.findOne({ _id: decoded.id });

  if (!user) {
    res.status(404);
    return res.send("User not found");
  }

  // Successfully logged in
  const refreshToken = generateRefreshToken(user.id);
  user.refreshToken = refreshToken;
  await user.save();
  console.log(`Authenticated: ${user.id}`);

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

const htmlTemplate = (accessToken) => `
<h2>Hey there!</h2>
<p>Here's the login link you requested:</p>
<p><a href="http://localhost:5173/login?token=${accessToken}">Click here</a></p>
`;

const logout = (req, res, next) => {
  res.send("Logout");
};

export { generate, login, logout };

function generateAccessToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
}

function generateRefreshToken(id) {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "24h",
  });
}
