import transporter from "../services/smtp.mjs";
import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const { token } = req.query;
  if (!token) {
    res.status(403);
    return res.send("Can't verify user.");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    res.status(403);
    return res.send("Invalid auth credentials");
  }

  if (
    !decoded.hasOwnProperty("email") ||
    !decoded.hasOwnProperty("expirationDate")
  ) {
    res.status(403);
    return res.send("Invalid auth credentials");
  }

  const { expirationDate } = decoded;
  if (expirationDate < new Date()) {
    res.status(403);
    return res.send("Token has expired");
  }

  res.status(200);
  return res.send("User has been validated");
};

const magicLinkTemplate = ({ link }) => `
<h2>Hey there!</h2>
<p>Here's the login link you requested:</p>
<p><a href="${link}">Click here</a></p>
`;

const sendMagicLink = (req, res, next) => {
  const { phone, email } = req.body;

  if (email) {
    // Look up user by email

    const token = makeToken(email);
    const mailOptions = {
      from: "Zero Daedalus",
      html: magicLinkTemplate({
        link: `http://localhost:5173/login?token=${token}`,
      }),
      subject: "ZeroDae Client Connect Login",
      to: email,
    };
    return transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.error(err);
        res.sendStatus(404);
      } else {
        console.log(`Magic Link Sent: ${email}`);
        res.sendStatus(200);
      }
    });
  }
  res.status(403);
  res.send("Whatup?");
};

function makeToken(email) {
  const expirationDate = new Date();
  expirationDate.setHours(new Date().getHours() + 1);
  return jwt.sign({ email, expirationDate }, process.env.JWT_SECRET_KEY);
}

export default {
  sendMagicLink,
  authenticateToken,
};
