const { Router } = require("express");
const { param, body } = require("express-validator");
const dbValidations = require("../../helpers/dbValidations");
const validateResult = require("../../middleware/validateResult");
const controllerAuth = require("../../controllers/auth");
const validateMongoId = require("../../middleware/mongoid-validate");
const validateJwt = require("../../middleware/validateJwt");
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

// Reset password
router.put(
  "/forgot-password",
  [
    body("email", "The field cannot be empty, Enter your email").notEmpty(),
    body("email").custom(dbValidations.mailDoesNotExist),
    validateResult,
  ],
  controllerAuth.forgot
);

// create new password
router.put(
  "/reset-password",
  [
    body("password", "Enter new password").notEmpty().bail(),
    body(
      "password",
      "The password must contain a minimum of 6 characters and a maxiomum f 14 characters."
    ).isLength({
      min: 6,
      max: 14,
    }),

    validateResult,
  ],
  controllerAuth.resetPassword
);

// change password

router.put(
  "/change-password/:id",
  [
    validateMongoId.idValid,
    validateJwt,
    param("id").custom(dbValidations.IdUserExists),
    body("yourpassword", "enter your current password").notEmpty(),
    body("newpassword", "enter your new password").notEmpty(),
    body(
      "newpassword",
      "The password must contain a minimum of 6 characters and a maxiomum f 14 characters."
    ).isLength({ min: 6, max: 14 }),
    body("confirmpassword", "confirm your new password").notEmpty(),
    validateResult,
  ],
  controllerAuth.changePassword
);

module.exports = router;
