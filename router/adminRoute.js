const express = require("express");
const router = express.Router();
const {
  GetLogin,
  GetSignup,
  userHome,
  signup,
  login,
} = require("../controller/userController");
const {
  getalltodo,
  addtodo,
  gettodoById,
  deletetodo,
  updatetodo,
} = require("../controller/todoController");
const {
  getalltodoByAdmin,
  GetLogin,
  login,
} = require("../controller/adminController");

const { requireSignin, requireSigninAdmin } = require("../auth/auth");

router.get("/signup", GetSignup);
router.get("/login", GetLogin);

router.post("/signup", signup);
router.post("/login", login);
router.get("/todo", requireSigninAdmin, getalltodoByAdmin);

router.post("/todo/add", requireSigninAdmin, addtodo);
router.get("/todo/:id", requireSigninAdmin, gettodoById);
router.put("/todo/:id", requireSigninAdmin, updatetodo);
router.delete("/todo/:id", requireSigninAdmin, deletetodo);

module.exports = router;
