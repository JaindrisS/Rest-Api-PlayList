const { Router } = require("express");
const { param, body } = require("express-validator");
const { validateFields } = require("../middleware/validateResult");
const {
  nameExists,
  emailExits,
  IdUserExists,
} = require("../helpers/dbValidations");
const {
  signIn,
  getUsers,
  logIn,
  updateUser,
  deleteUser,
} = require("../controllers/user");

const router = Router();

router.get("/", getUsers);

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

router.put(
  "/:id",
  [
    param("id", "id invalid").isMongoId(),
    param("id").custom(IdUserExists),
    body("name", "Enter a name").notEmpty().optional(),
    body("name").custom(nameExists).optional(),
    body("email").custom(emailExits).optional(),
    body("email", "The field cannot be empty").notEmpty().optional(),

    validateFields,
  ],
  updateUser
);

router.delete(
  "/:id",
  [param("id").custom(IdUserExists), param("id", "Id invalid").isMongoId()],
  deleteUser
);

module.exports = router;
