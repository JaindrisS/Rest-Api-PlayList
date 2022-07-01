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

router.get("/", getArtis);

router.post(
  "/createdartists",
  [
    validateJwt,
    body("name", "Enter a name"),
    body("name").custom(nameArtistExists),
    validateFields,
  ],
  createdArtists
);

router.put(
  "/:id",
  [
    body("name", "Enter a name").notEmpty().optional(),
    body("name").custom(nameArtistExists).optional(),
    param("id").custom(idArtistExists),
    validateFields,
  ],
  updateArtists
);

router.delete(
  "/:id",
  [param("id").custom(idArtistExists), validateFields],
  deleteArtist
);

module.exports = router;
