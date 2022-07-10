const { Router } = require("express");
const { body, param } = require("express-validator");
const {
  createdArtists,
  getArtis,
  updateArtists,
  deleteArtist,
} = require("../controllers/artist");
const {
  nameArtistExists,
  idArtistExists,
} = require("../helpers/dbValidations");
const { validateFields } = require("../middleware/validateResult");
const { validateJwt } = require("../middleware/validateJwt");

const router = Router();

router.get("/", [validateJwt, hasRol("USER", "ADMIN")], getArtis);

router.post(
  "/createdartists",
  [
    validateJwt,
    hasRol("USER", "ADMIN"),
    body("name", "Enter a name"),
    body("name").custom(nameArtistExists),
    validateFields,
  ],
  createdArtists
);

router.put(
  "/:id",
  [
    validateJwt,
    hasRol("USER", "ADMIN"),
    body("name", "Enter a name").notEmpty().optional(),
    body("name").custom(nameArtistExists).optional(),
    param("id").custom(idArtistExists),
    validateFields,
  ],
  updateArtists
);

router.delete(
  "/:id",
  [
    validateJwt,
    hasRol("ADMIN"),
    param("id").custom(idArtistExists),
    validateFields,
  ],
  deleteArtist
);

module.exports = router;
