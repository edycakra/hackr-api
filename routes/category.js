const express = require("express");
const router = express.Router();

// validators
const {
  categoryCreateValidator,
  categoryUpdateValidator,
} = require("../validators/category");
const { runValidation } = require("../validators");

// controllers
const { requireSignIn, adminMiddleware } = require("../controllers/auth");
const {
  create,
  list,
  read,
  update,
  remove,
} = require("../controllers/category");

// routes
router.post(
  "/category",
  categoryCreateValidator,
  runValidation,
  requireSignIn,
  adminMiddleware,
  create
);
router.get("/categories", list);
router.post("/category/:slug", read);
router.put(
  "/category/:slug",
  categoryUpdateValidator,
  runValidation,
  requireSignIn,
  adminMiddleware,
  update
);
router.delete("/category/:slug", requireSignIn, adminMiddleware, remove);

module.exports = router;
