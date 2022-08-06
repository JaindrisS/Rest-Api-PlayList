const { Router } = require("express");
const { param, body } = require("express-validator");
const validateJwt = require("../../middleware/validateJwt");
const validateRole = require("../../middleware/validateRole");
const dbValidations = require("../../helpers/dbValidations");
const validateFields = require("../../middleware/validateResult");
const controllersUser = require("../../controllers/user");
const validateMongoId = require("../../middleware/mongoid-validate");

const router = Router();

router.get(
  "/",
  [validateJwt, validateRole.hasRol("ADMIN", "USER")],
  controllersUser.getUsers
);

router.put(
  "/update/:id",
  [
    validateJwt,
    validateMongoId.idValid,
    validateRole.hasRol("USER", "ADMIN"),
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
  "/delete/:id",
  [
    validateJwt,
    validateMongoId.idValid,
    param("id").custom(dbValidations.IdUserExists),
    validateRole.hasRol("USER", "ADMIN"),
    validateFields,
  ],
  controllersUser.deleteUser
);

module.exports = router;
