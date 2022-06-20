const { Router } = require("express");
const { param, body } = require("express-validator");
const { signIn, getUsers } = require("../controllers/user");

const router = Router();

router.get("/", getUsers);

router.post("/signin", signIn);

module.exports = router;
