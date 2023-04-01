const express = require("express");
const users = require("../controllers/userControler");
const isAuthenticated = require("../middlewares/auth");
const router = express.Router();

router.post("/new", users.register);

router.post("/login", users.login);

router.get("/logout", users.logout);


router.get("/me", isAuthenticated, users.getMyProfile);


module.exports = router