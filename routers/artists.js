const { Router } = require("express");
const { body, param } = require("express-validator");
const controllerArtists = require("../controllers/artist");
const dbValidations = require("../helpers/dbValidations");
const { validateFields } = require("../middleware/validateResult");
const { validateJwt } = require("../middleware/validateJwt");
const { hasRol, isAdminRol } = require("../middleware/validateRole");

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
    hasRol("USER", "ADMIN"),
    body("name", "Enter a name"),
    body("name").custom(dbValidations.nameArtistExists),
    validateFields,
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
    validateFields,
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
