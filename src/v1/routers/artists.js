const { Router } = require("express");
const { body, param } = require("express-validator");
const validateJwt = require("../../middleware/validateJwt");
const validateRole = require("../../middleware/validateRole");
const dbValidations = require("../../helpers/dbValidations");
const validateFields = require("../../middleware/validateResult");
const controllers = require("../../controllers/artist");

const router = Router();

router.get(
  "/",
  [validateJwt, validateRole.hasRol("USER", "ADMIN")],
  controllers.getArtis
);

router.post(
  "/createdartists",
  [
    validateJwt,
    validateRole.hasRol("USER", "ADMIN"),
    body("name", "Enter a name"),
    body("name").custom(dbValidations.nameArtistExists),
    validateFields,
  ],
  controllers.createdArtists
);

router.put(
  "/:id",
  [
    validateJwt,
    validateRole.hasRol("USER", "ADMIN"),
    body("name", "Enter a name").notEmpty().optional(),
    body("name").custom(dbValidations.nameArtistExists).optional(),
    param("id").custom(dbValidations.idArtistExists),
    validateFields,
  ],
  controllers.updateArtists
);

router.delete(
  "/:id",
  [
    validateJwt,
    validateRole.hasRol("ADMIN"),
    param("id").custom(dbValidations.idArtistExists),
    validateFields,
  ],
  controllers.deleteArtist
);

module.exports = router;
