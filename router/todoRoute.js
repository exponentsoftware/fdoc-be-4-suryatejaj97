const express = require("express");
const router = express.Router();
const {
  getalltodo,
  getalltodoByUserId,
  gettodoById,
} = require("../controller/todocontroller");

router.get("/", getalltodo);
router.get("/:_id", getalltodoByUserId);
router.get("/:id", gettodoById);

module.exports = router;
