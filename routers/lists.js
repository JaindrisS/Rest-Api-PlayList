const { Router } = require("express");
const { body, param } = require("express-validator");
const { validateFields } = require("../middleware/validateResult");
const { validateJwt } = require("../middleware/validateJwt");
const { cache } = require("../middleware/cache");
const { isAdminRol, hasRol } = require("../middleware/validateRole");
const {
  IdUserExists,
  nameListExists,
  idListExist,
  idArtistExists,
  idGenderExists,
  nameSongExists,
  idSongExists,
} = require("../helpers/dbValidations");
const {
  createList,
  getList,
  deleteList,
  addNewSong,
  updateListName,
  updatedSongName,
  deleteSong,
  getUserList,
} = require("../controllers/list");

const router = Router();

router.get(
  "/",
  [validateJwt, hasRol("USER", "ADMIN")],

  getList
);

router.get(
  "/userlists",
  [validateJwt, cache, hasRol("USER", "ADMIN")],
  getUserList
);

router.post(
  "/createlists",
  [
    validateJwt,
    hasRol("USER", "ADMIN"),
    body("namelist").custom(nameListExists),
    body("namelist", "Enter a  name").notEmpty(),
    validateFields,
  ],
  createList
);

router.delete(
  "/deletelists/:id",
  [
    validateJwt,
    hasRol("USER", "ADMIN"),
    param("id", "Invalid id").isMongoId(),
    param("id").custom(idListExist),
    validateFields,
  ],
  deleteList
);

router.post(
  "/addsongs/:id",
  [
    validateJwt,
    hasRol("USER", "ADMIN"),
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
    validateJwt,
    hasRol("USER", "ADMIN"),
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
    validateJwt,
    hasRol("USER", "ADMIN"),
    param("id").custom(idListExist),
    param("id", "Enter a valid id").isMongoId(),
    body("id", "Enter a valid mongoid").isMongoId().notEmpty(),
    body("title", "The title can't be empty").notEmpty(),
    body("title").custom(nameSongExists),
    validateFields,
  ],
  updatedSongName
);

router.delete(
  "/deletesongs/:id",
  [
    validateJwt,
    hasRol("USER", "ADMIN"),
    param("id").custom(idListExist),
    param("id", "Enter a valid mongoid").isMongoId(),
    body("id", "Enter the id of the song to delete").notEmpty(),
    body("id").custom(idSongExists),
    validateFields,
  ],
  deleteSong
);

module.exports = router;
