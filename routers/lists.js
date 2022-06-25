const { Router } = require("express");
const { body, param } = require("express-validator");
const { IdUserExists, nameListExists } = require("../helpers/dbValidations");
const { validateFields } = require("../middleware/validateResult");
const { createList, getList } = require("../controllers/list");

const router = Router();

router.get("/", getList);

router.post(
  "/createlists",
  [
    body("name", "Enter a  name").notEmpty(),
    body("name").custom(nameListExists),
    body("user", "Enter a valid mongoid").isMongoId(),
    body("user").custom(IdUserExists),
    validateFields,
  ],
  createList
);

module.exports = router;
