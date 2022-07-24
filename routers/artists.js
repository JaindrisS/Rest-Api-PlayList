const { Router } = require("express");
const { body, param } = require("express-validator");
const validateJwt = require("../middleware/validateJwt");
const validateRole = require("../middleware/validateRole");
const dbValidations = require("../helpers/dbValidations");
const validateResult = require("../middleware/validateResult");
const controllerArtists = require("../controllers/artist");

const router = Router();

router.get(
  "/",
  [validateJwt, hasRol("USER", "ADMIN")],
  controllerArtists.getArtis
);

router.post(
  "/createdartists",
  [
    validateJwt,
    validateRole.hasRol("USER", "ADMIN"),
    body("name", "Enter a name"),
    body("name").custom(dbValidations.nameArtistExists),
    validateResult.validateFields,
  ],
  controllerArtists.createdArtists
);

router.put(
  "/:id",
  [
    validateJwt,
    hasRol("USER", "ADMIN"),
    body("name", "Enter a name").notEmpty().optional(),
    body("name").custom(dbValidations.nameArtistExists).optional(),
    param("id").custom(dbValidations.idArtistExists),
    validateResult.validateFields,
  ],
  controllerArtists.updateArtists
);

router.delete(
  "/:id",
  [
    validateJwt,
    hasRol("ADMIN"),
    param("id").custom(dbValidations.idArtistExists),
    validateFields,
  ],
  controllerArtists.deleteArtist
);

module.exports = router;
