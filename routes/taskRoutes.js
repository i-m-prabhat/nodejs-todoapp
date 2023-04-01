const express = require("express");
const task = require("../controllers/taskController");
const isAuthenticated = require("../middlewares/auth");
const router = express.Router();



router.post("/new", isAuthenticated, task.newTask);

router.get("/my", isAuthenticated, task.getMyTask);

router.route("/:id").put(isAuthenticated, task.updateTask).delete(isAuthenticated, task.deleteTask);


module.exports = router