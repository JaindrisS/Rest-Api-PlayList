const { Router } = require("express");
const { body, param } = require("express-validator");
const { uploadImg } = require("../controllers/upload-img");
const validateFiles = require("../middleware/validateFiles");
const { permittedCollections } = require("../helpers/dbValidations");
const { validateFields } = require("../middleware/validateResult");

const router = Router();

router.put(
  "/:collection/:id",
  [
    validateFiles,
    param("id", "Invalid id").isMongoId(),
    param("collection").custom((c) =>
      permittedCollections(c, ["user", "artist"])
    ),
    validateFields,
  ],
  uploadImg
);

module.exports = router;
