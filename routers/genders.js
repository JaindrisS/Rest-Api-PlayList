const { Router } = require("express");
const { body, param } = require("express-validator");
const { validateFields } = require("../middleware/validateResult");
const { createdGender, getGender } = require("../controllers/gender");
const { nameGenderExists } = require("../helpers/dbValidations");

const router = Router();

router.get("/", getGender);

router.post(
  "/createdgenders",
  [
    body("name", "Enter a name").notEmpty(),
    body("name").custom(nameGenderExists),
    validateFields,
  ],
  createdGender
);

module.exports = router;
