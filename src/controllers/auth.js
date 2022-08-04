const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const { generateJwt } = require("../helpers/generatejwt");
const { sendEmail } = require("../helpers/emailer");
const jwt = require("jsonwebtoken");

const signIn = async (req, res = response) => {
  const { __v, name, password, ...resto } = req.body;

  const salt = bcryptjs.genSaltSync(10);
  const hast = bcryptjs.hashSync(password, salt);

  const data = {
    name: name.toUpperCase(),
    password: hast,
    ...resto,
  };

  const user = await new User(data);
  sendEmail(user);

  await user.save();
  res.status(201).json({ msg: `post`, user });
};

const logIn = async (req, res = response) => {
  const { password, email } = req.body;
  try {
    const user = await User.findOne(
      { email: { $regex: email, $options: "i" } },
      { name: 1, password: 1, email: 1, status: 1 }
    );

    if (!user) {
      return res.status(400).json({ msg: `Invalid email ${email}` });
    }

    if (!user.status) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    const userValid = bcryptjs.compareSync(password, user.password);

    if (!userValid) {
      return res.status(400).json({ msg: `Incorrect password` });
    }

    const token = await generateJwt(user.id);

    res.status(200).json({
      msg: `Login ok`,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return new Error("Communicate with the administrator");
  }
};

const forgot = async (req, res = response) => {
  const { email } = req.body;
  let message = ` The code to reset your password was sent to your email address ${email} `;

  const user = await User.findOne({ email });

  let token = await generateJwt(user.id);
  let verification = token;
  user.resetpassword = token;

  sendEmail(user, verification);

  await user.save();

  return res.json({
    msg: message,
    verification,
  });
};

const resetpassword = async (req = request, res = response) => {
  try {
    const { password } = req.body;
    const token = req.header("token");

    if (!token) {
      return res.status(401).json("Enter a token in the request");
    }

    try {
      let jsonPayload = jwt.verify(token, process.env.JWTPRIVATEKEY);
    } catch (error) {
      return res.json("invalid token");
    }

    const user = await User.findOne({ resetpassword: token });

    if (!user) {
      return res.status(400).json({
        msg: "Invalid token",
      });
    }

    // encriptar password
    const salt = bcryptjs.genSaltSync(10);

    const hast = bcryptjs.hashSync(password, salt);

    user.password = hast;
    user.resetpassword = null;
    await user.save();
  } catch (error) {
    console.log(error);
  }

  res.status(201).json({
    msg: "Password changed",
  });
};

module.exports = { signIn, logIn, forgot, resetpassword };
