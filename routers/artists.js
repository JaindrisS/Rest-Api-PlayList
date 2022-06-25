const { Router } = require("express");
const { body, param } = require("express-validator");
const { createdArtists } = require("../controllers/artist");
const { nameArtistExists } = require("../helpers/dbValidations");
const { validateFields } = require("../middleware/validateResult");

const router = Router();

router.get("/", (req, res) => {
  res.json("get-artists");
});

router.post(
  "/createdartists",
  [
    body("name", "Enter a name"),
    body("name").custom(nameArtistExists),
    validateFields,
  ],
  createdArtists
);

module.exports = router;
