const { response } = require("express");

const isAdminRol = (req, res = response, next) => {
  if (!req.user) {
    return res
      .status(500)
      .json("You want to validate the role without verifying the token first");
  }

  const { rol, name } = req.user;

  if (rol !== "ADMIN") {
    return res.status(403).json({
      msg: `${name} is not an administrator he cannot do this`,
    });
  }
  next();
};

const hasRol = (...roles) => {
  return (req, res = response, next) => {
    if (!req.user) {
      return res
        .status(500)
        .json(
          "You want to validate the role without verifying the token first"
        );
    }

    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({ msg: `these roles ${roles} are required` });
    }
    next();
  };
};

module.exports = { isAdminRol, hasRol };
