const { Router } = require("express");
const { body, param } = require("express-validator");
const validateJwt = require("../../middleware/validateJwt");
const validateRole = require("../../middleware/validateRole");
const dbValidations = require("../../helpers/dbValidations");
const validateFields = require("../../middleware/validateResult");
const controllerGender = require("../../controllers/gender");

const router = Router();

router.get(
  "/",
  [validateJwt, validateRole.hasRol("USER", "ADMIN")],
  controllerGender.getGender
);

router.post(
  "/create",
  [
    validateJwt,
    validateRole.hasRol("USER", "ADMIN"),
    validateJwt,
    body("name", "Enter a name").notEmpty(),
    body("name").custom(dbValidations.nameGenderExists),
    validateFields,
  ],
  controllerGender.createdGender
);

router.put(
  "/update/:id",
  [
    validateJwt,
    validateRole.hasRol("USER", "ADMIN"),
    param("id").isMongoId(),
    param("id").custom(dbValidations.idGenderExists),
    body("name", "Enter a name ").notEmpty().optional(),
    body("name").custom(dbValidations.nameGenderExists).optional(),
    validateFields,
  ],
  controllerGender.updateGender
);

router.delete(
  "/delete/:id",
  [
    validateJwt,
    validateRole.hasRol("USER", "ADMIN"),
    param("id").isMongoId(),
    param("id").custom(dbValidations.idGenderExists),
    validateFields,
  ],
  controllerGender.deleteGender
);

module.exports = router;
