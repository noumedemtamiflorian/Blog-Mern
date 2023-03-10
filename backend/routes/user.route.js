const express = require("express");
const { requireAuth, requireAdmin } = require("../config/jwt");
const userController = require("../controllers/user.controller");

const router = express.Router();

router.post("/resetPassword", requireAuth, userController.resetPassword);
router.get("/", requireAdmin, userController.findAll);
router.get("/:id", requireAuth, userController.findOne);
router.put("/:id", requireAuth, userController.update);
router.delete("/:id", requireAuth, userController.delete);

module.exports = router;
