const express = require("express");
const { isAuthenticatedUser } = require("../middlewares/authenticate");
const { paymentProcess, sendStripeApi } = require("../controllers/paymentController");
const router = express.Router();

router.route("/payment/process").post(isAuthenticatedUser, paymentProcess);
router.route("/stripeapi").get(isAuthenticatedUser, sendStripeApi);

module.exports = router;
