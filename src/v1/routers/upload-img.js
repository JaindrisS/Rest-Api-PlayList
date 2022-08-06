const { Router } = require("express");
const { body, param } = require("express-validator");
const uploadImg = require("../../controllers/upload-img");
const validateFiles = require("../../middleware/validateFiles");
const dbValidations = require("../../helpers/dbValidations");
const validateFields = require("../../middleware/validateResult");
const validateMongoId = require("../../middleware/mongoid-validate");

const router = Router();

router.put(
  "/:collection/:id",
  [
    validateFiles,
    validateMongoId.idValid,
    param("id", "Invalid id").isMongoId(),
    param("collection").custom((c) =>
      dbValidations.permittedCollections(c, ["user", "artist"])
    ),
    validateFields,
  ],
  uploadImg
);

module.exports = router;
