const { Router } = require("express");
const { param, body } = require("express-validator");
const { validateFields } = require("../middleware/validateResult");
const { nameExists, emailExits } = require("../helpers/dbValidations");
const { signIn, logIn } = require("../controllers/auth");

const router = Router();

// Register
router.post(
  "/signin",
  [
    body("name", " Enter a name").notEmpty().custom(nameExists),
    body("password", "Enter a valid password minimum 6 values maximum 14")
      .notEmpty()
      .isLength({ min: 6, max: 14 }),
    body("email", "Enter a valid email")
      .notEmpty()
      .isEmail()
      .custom(emailExits),
    validateFields,
  ],
  signIn
);

// log in

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a password").notEmpty(),
    validateFields,
  ],
  logIn
);

module.exports = router;
