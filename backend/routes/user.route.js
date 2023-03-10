const express = require("express");

const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/resetPassword", userController.resetPassword);
router.get("/", userController.findOne);
router.get("/:id", userController.findAll);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

module.exports = router;
