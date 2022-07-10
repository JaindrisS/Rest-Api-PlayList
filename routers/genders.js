const { Router } = require("express");
const { body, param } = require("express-validator");
const { validateFields } = require("../middleware/validateResult");
const { validateJwt } = require("../middleware/validateJwt");
const {
  nameGenderExists,
  idGenderExists,
} = require("../helpers/dbValidations");
const {
  createdGender,
  getGender,
  updateGender,
  deleteGender,
} = require("../controllers/gender");

const router = Router();

router.get("/", [validateJwt, hasRol("USER", "ADMIN")], getGender);

router.post(
  "/createdgenders",
  [
    validateJwt,
    hasRol("USER", "ADMIN"),
    validateJwt,
    body("name", "Enter a name").notEmpty(),
    body("name").custom(nameGenderExists),
    validateFields,
  ],
  createdGender
);

router.put(
  "/:id",
  [
    validateJwt,
    hasRol("USER", "ADMIN"),
    param("id").isMongoId(),
    param("id").custom(idGenderExists),
    body("name", "Enter a name ").notEmpty().optional(),
    body("name").custom(nameGenderExists).optional(),
    validateFields,
  ],
  updateGender
);

router.delete(
  "/:id",
  [
    validateJwt,
    hasRol("USER", "ADMIN"),
    param("id").isMongoId(),
    param("id").custom(idGenderExists),
    validateFields,
  ],
  deleteGender
);

module.exports = router;
