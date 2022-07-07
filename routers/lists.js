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
  updateListName,
  updatedSongName,
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

router.put(
  "/updatelistnames/:id",
  [
    param("id").custom(idListExist),
    param("id", "Enter a valid id").isMongoId(),
    body("namelist").custom(nameListExists),
    body("namelist", "Enter a name List").notEmpty(),
    validateFields,
  ],
  updateListName
);

router.put(
  "/updatesongnames/:id",
  [
    param("id").custom(idListExist),
    param("id", "Enter a valid id").isMongoId(),
    body("id", "Enter a valid mongoid").isMongoId().notEmpty(),
    body("title", "The title can't be empty").notEmpty(),
    body("title").custom(nameSongExists),
    validateFields,
  ],
  updatedSongName
);

module.exports = router;
