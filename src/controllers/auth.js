const { response, request } = require("express");
const User = require("../models/user");
const { generateJwt } = require("../helpers/generatejwt");
const { sendEmail } = require("../helpers/emailer");
const jwt = require("jsonwebtoken");
const { comparePassword, hash } = require("../helpers/bcript");

const signIn = async (req, res = response) => {
  const { __v, name, password, ...resto } = req.body;

  const passwordHash = hash(10, password);

  const data = {
    name: name.toUpperCase(),
    password: passwordHash,
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

    const userValid = comparePassword(password, user.password);

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

  const user = await User.findOne({ email: { $regex: email, $options: "i" } });

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

const resetPassword = async (req = request, res = response) => {
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

    const passwordHash = hash(10, password);

    user.password = passwordHash;
    user.resetpassword = null;
    await user.save();
  } catch (error) {
    console.log(error);
  }

  res.status(201).json({
    msg: "Password changed",
  });
};

const changePassword = async (req = request, res = response) => {
  const { id } = req.params;
  const { yourpassword, newpassword, confirmpassword } = req.body;

  const user = await User.findById(id);

  const passValid = comparePassword(yourpassword, user.password);

  if (!passValid) {
    return res.status(400).json({
      msg: "password invalid",
    });
  }

  if (newpassword !== confirmpassword) {
    return res.status(400).json({ msg: "passwords do not match" });
  }

  user.password = hash(10, newpassword);

  await user.save();

  res.status(201).json({ msg: "Password has been changed successfully" });
};

module.exports = { signIn, logIn, forgot, resetPassword, changePassword };
