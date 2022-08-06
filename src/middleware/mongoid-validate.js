const { isValidObjectId } = require("mongoose");
const { request, response } = require("express");

const idValid = (req = request, res = response, next) => {
  const { id } = req.params;

  const valid = isValidObjectId(id);

  if (valid === false) {
    return res.status(400).json({
      msg: "Id is not valid",
    });
  }

  next();
};

module.exports = { idValid };
