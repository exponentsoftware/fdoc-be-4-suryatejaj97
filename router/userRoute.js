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
const { requireSignin } = require("../auth/auth");

router.get("/signup", GetSignup);
router.get("/login", GetLogin);
router.get("/user", userHome);

router.post("/signup", signup);

router.post("/login", login);

router.get("/todo", getalltodo);
router.post("/todo/add", requireSignin, addtodo);
router.get("/todo/:id", gettodoById);
router.put("/todo/:id", requireSignin, updatetodo);
router.delete("/todo/:id", deletetodo);

module.exports = router;
