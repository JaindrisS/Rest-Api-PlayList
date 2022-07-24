const { Router } = require("express");
const { param, body } = require("express-validator");
const validateJwt = require("../middleware/validateJwt");
const validateRole = require("../middleware/validateRole");
const dbValidations = require("../helpers/dbValidations");
const validateFields = require("../middleware/validateResult");
const controllersUser = require("../controllers/user");

const router = Router();

router.get("/", [validateJwt, hasRol("ADMIN")], getUsers);

router.put(
  "/:id",
  [
    validateJwt,
    validateRole.hasRol("USER", "ADMIN"),
    param("id", "id invalid").isMongoId(),
    param("id").custom(dbValidations.IdUserExists),
    body("name", "Enter a name").notEmpty().optional(),
    body("name").custom(dbValidations.nameExists).optional(),
    body("email").custom(dbValidations.emailExits).optional(),
    body("email", "The field cannot be empty").notEmpty().optional(),

    validateFields,
  ],
  controllersUser.updateUser
);

router.delete(
  "/:id",
  [
    validateJwt,
    validateRole.hasRol("USER", "ADMIN"),
    param("id").custom(dbValidations.IdUserExists),
    param("id", "Id invalid").isMongoId(),
  ],
  controllersUser.deleteUser
);

module.exports = router;
