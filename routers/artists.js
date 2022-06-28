const { Router } = require("express");
const { body, param } = require("express-validator");
const { createdArtists, getArtis } = require("../controllers/artist");
const { nameArtistExists } = require("../helpers/dbValidations");
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

module.exports = router;
