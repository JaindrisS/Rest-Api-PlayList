const { Router } = require("express");
const { body, param } = require("express-validator");
const { validateFields } = require("../middleware/validateResult");
const { validateJwt } = require("../middleware/validateJwt");
const {
  IdUserExists,
  nameListExists,
  idListExist,
  idArtistExists,
  idGenderExists,
  nameSongExists,
} = require("../helpers/dbValidations");
const {
  createList,
  getList,
  deleteList,
  addNewSong,
  get,
} = require("../controllers/list");

const router = Router();

router.get("/", getList);

router.post(
  "/createlists",
  [
    validateJwt,
    body("namelist").custom(nameListExists),
    body("namelist", "Enter a  name").notEmpty(),
    validateFields,
  ],
  createList
);

router.delete(
  "/deletelists/:id",
  [
    param("id", "Invalid id").isMongoId(),
    param("id").custom(idListExist),
    validateFields,
  ],
  deleteList
);

router.post(
  "/addsongs/:id",
  [
    param("id").custom(idListExist),
    param("id", "Enter a valid id").isMongoId(),
    body("artist").custom(idArtistExists),
    body("artist", "Enter a valid id").isMongoId(),
    body("gender").custom(idGenderExists),
    body("gender", "Enter a valid id").isMongoId(),
    body("title", "Enter a title").notEmpty(),
    body("title").custom(nameSongExists),

    validateFields,
  ],
  addNewSong
);

module.exports = router;
