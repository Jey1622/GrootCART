const express = require("express");
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createReview,
  getReview,
  deleteReview,
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

router.route("/review").put(isAuthenticatedUser,createReview)
                       .delete(deleteReview)
router.route("/reviews").get(getReview)

//Admin routes
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, autherizeRoles("admin"), newProduct);
module.exports = router;
