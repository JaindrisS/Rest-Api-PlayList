const { Router } = require("express");
const { body, param } = require("express-validator");
const { validateFields } = require("../middleware/validateResult");
const { validateJwt } = require("../middleware/validateJwt");
const {
  IdUserExists,
  nameListExists,
  idListExist,
} = require("../helpers/dbValidations");
const { createList, getList, deleteList } = require("../controllers/list");

const router = Router();

router.get("/", getList);

router.post(
  "/createlists",
  [
    validateJwt,
    body("namelist", "Enter a  name").notEmpty(),
    body("namelist").custom(nameListExists),
    body("user", "Enter a valid mongoid").isMongoId(),
    body("user").custom(IdUserExists),
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

module.exports = router;
