const express = require("express");
const { requireAuth, requireAdmin } = require("../config/jwt");
const userController = require("../controllers/user.controller");

const router = express.Router();

router.post("/resetPassword", requireAuth, userController.resetPassword);
router.get("/", requireAdmin, userController.findOne);
router.get("/:id", requireAdmin, userController.findAll);
router.put("/:id", requireAdmin, userController.update);
router.delete("/:id", requireAdmin, userController.delete);

module.exports = router;
