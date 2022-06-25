const { Router } = require("express");
const { body, param } = require("express-validator");
const { validateFields } = require("../middleware/validateResult");
const { createdGender } = require("../controllers/gender");
const { nameGenderExists } = require("../helpers/dbValidations");

const router = Router();

router.get("/", (req, res) => {
  res.json("Get-Genders");
});

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
