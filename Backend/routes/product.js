const express = require("express");
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");
const router = express.Router();
const {
  isAuthenticatedUser,
  autherizeRoles,
} = require("../middlewares/authenticate");

router.route("/products").get(isAuthenticatedUser, getProducts);
router
  .route("/product/:id")
  .get(isAuthenticatedUser, getSingleProduct)
  .put(isAuthenticatedUser, updateProduct)
  .delete(isAuthenticatedUser, deleteProduct);

//Admin routes
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, autherizeRoles("admin"), newProduct);
module.exports = router;
