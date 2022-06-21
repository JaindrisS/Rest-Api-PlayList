const { Router } = require("express");
const { param, body } = require("express-validator");
const { validateFields } = require("../middleware/validateResult");
const { nameExists, emailExits } = require("../helpers/dbValidations");
const { signIn, getUsers } = require("../controllers/user");

const router = Router();

router.get("/", getUsers);

// Register
router.post(
  "/signin",
  [
    body("name", " Enter a name").notEmpty().custom(nameExists),
    body("password", "Enter a password ").notEmpty(),
    body("email", "Enter a valid email")
      .notEmpty()
      .isEmail()
      .custom(emailExits),
    validateFields,
  ],
  signIn
);

// log in

router.post("/login", (req, res) => {
  res.json("log in");
});

module.exports = router;
