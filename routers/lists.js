const { Router } = require("express");
const { body, param } = require("express-validator");
const { IdUserExists, nameListExists } = require("../helpers/dbValidations");
const { validateFields } = require("../middleware/validateResult");
const { createList, getList } = require("../controllers/list");
const { validateJwt } = require("../middleware/validateJwt");

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

module.exports = router;
