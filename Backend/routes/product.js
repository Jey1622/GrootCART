const express = require("express");
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");
const router = express.Router();
const {isAuthenticatedUser, autherizeRoles}=require("../middlewares/authenticate")

router.route("/products").get(isAuthenticatedUser,getProducts);
router.route("/product/new").post(isAuthenticatedUser,autherizeRoles('admin'),newProduct);
router.route("/product/:id")
                            .get(isAuthenticatedUser,getSingleProduct)
                            .put(isAuthenticatedUser,autherizeRoles('admin'),updateProduct)
                            .delete(isAuthenticatedUser,autherizeRoles('admin'),deleteProduct)

module.exports = router;
