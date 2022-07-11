const { Router } = require("express");
const { param, body } = require("express-validator");
const { validateFields } = require("../middleware/validateResult");
const { validateJwt } = require("../middleware/validateJwt");
const { getUsers, updateUser, deleteUser } = require("../controllers/user");
const {
  nameExists,
  emailExits,
  IdUserExists,
} = require("../helpers/dbValidations");
const { hasRol, isAdminRol } = require("../middleware/validateRole");

const router = Router();

router.get("/", [validateJwt, hasRol("ADMIN")], getUsers);

router.put(
  "/:id",
  [
    validateJwt,
    hasRol("USER", "ADMIN"),
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
  [
    validateJwt,
    hasRol("USER", "ADMIN"),
    param("id").custom(IdUserExists),
    param("id", "Id invalid").isMongoId(),
  ],
  deleteUser
);

module.exports = router;
