const { Router } = require("express");
const { param, body } = require("express-validator");
const { signIn } = require("../controllers/user");

const router = Router();

router.get("/", (req, res) => {
  res.json("Get-Users");
});

router.post("/signin", signIn);

module.exports = router;
