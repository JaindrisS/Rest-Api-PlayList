const { Router } = require("express");
const { body, param } = require("express-validator");
const validateJwt = require("../../middleware/validateJwt");
const caching = require("../../middleware/cache");
const validateRole = require("../../middleware/validateRole");
const dbValidations = require("../../helpers/dbValidations");
const validateFields = require("../../middleware/validateResult");
const controllerList = require("../../controllers/list");

const router = Router();

router.get(
  "/",
  [validateJwt, validateRole.hasRol("USER", "ADMIN")],

  controllerList.getList
);

router.get(
  "/userlists",
  [validateJwt, caching.cache, validateRole.hasRol("USER", "ADMIN")],
  controllerList.getUserList
);

router.post(
  "/createlists",
  [
    validateJwt,
    validateRole.hasRol("USER", "ADMIN"),
    body("namelist").custom(dbValidations.nameListExists),
    body("namelist", "Enter a  name").notEmpty(),
    validateFields,
  ],
  controllerList.createList
);

router.delete(
  "/deletelists/:id",
  [
    validateJwt,
    validateRole.hasRol("USER", "ADMIN"),
    param("id", "Invalid id").isMongoId(),
    param("id").custom(dbValidations.idListExist),
    validateFields,
  ],
  controllerList.deleteList
);

router.post(
  "/addsongs/:id",
  [
    validateJwt,
    validateRole.hasRol("USER", "ADMIN"),
    param("id").custom(dbValidations.idListExist),
    param("id", "Enter a valid id").isMongoId(),
    body("artist").custom(dbValidations.idArtistExists),
    body("artist", "Enter a valid id").isMongoId(),
    body("gender").custom(dbValidations.idGenderExists),
    body("gender", "Enter a valid id").isMongoId(),
    body("title", "Enter a title").notEmpty(),
    body("title").custom(dbValidations.nameSongExists),

    validateFields,
  ],
  controllerList.addNewSong
);

router.put(
  "/updatelistnames/:id",
  [
    validateJwt,
    validateRole.hasRol("USER", "ADMIN"),
    param("id").custom(dbValidations.idListExist),
    param("id", "Enter a valid id").isMongoId(),
    body("namelist").custom(dbValidations.nameListExists),
    body("namelist", "Enter a name List").notEmpty(),
    validateFields,
  ],
  controllerList.updateListName
);

router.put(
  "/updatesongnames/:id",
  [
    validateJwt,
    validateRole.hasRol("USER", "ADMIN"),
    param("id").custom(dbValidations.idListExist),
    param("id", "Enter a valid id").isMongoId(),
    body("id", "Enter a valid mongoid").isMongoId().notEmpty(),
    body("title", "The title can't be empty").notEmpty(),
    body("title").custom(dbValidations.nameSongExists),
    validateFields,
  ],
  controllerList.updatedSongName
);

router.delete(
  "/deletesongs/:id",
  [
    validateJwt,
    validateRole.hasRol("USER", "ADMIN"),
    param("id").custom(dbValidations.idListExist),
    param("id", "Enter a valid mongoid").isMongoId(),
    body("id", "Enter the id of the song to delete").notEmpty(),
    body("id").custom(dbValidations.idSongExists),
    validateFields,
  ],
  controllerList.deleteSong
);

module.exports = router;