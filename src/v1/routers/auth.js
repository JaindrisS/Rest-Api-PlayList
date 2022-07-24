const { Router } = require("express");
const { param, body } = require("express-validator");
const dbValidations = require("../../helpers/dbValidations");
const validateResult = require("../../middleware/validateResult");
const controllerAuth = require("../../controllers/auth");

const router = Router();
// Register
router.post(
  "/signin",
  [
    body("name", " Enter a name").notEmpty().custom(dbValidations.nameExists),
    body("password", "Enter a valid password minimum 6 values maximum 14")
      .notEmpty()
      .isLength({ min: 6, max: 14 }),
    body("email", "Enter a valid email")
      .notEmpty()
      .isEmail()
      .custom(dbValidations.emailExits),
    validateResult,
  ],
  controllerAuth.signIn
);

// log in

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a password").notEmpty(),
    validateResult,
  ],
  controllerAuth.logIn
);

module.exports = router;
