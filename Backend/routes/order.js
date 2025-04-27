const express=require('express');
const { newOrder, getSingleOrder, myOrders, allOrders, updateOrder, deleteOrder } = require('../controllers/orderController');
const {
    isAuthenticatedUser,
    autherizeRoles,
  } = require("../middlewares/authenticate");
const router=express.Router();

router.route('/order/new').post(isAuthenticatedUser,newOrder);
router.route('/order/:id').get(isAuthenticatedUser,getSingleOrder);
router.route('/myOrders').get(isAuthenticatedUser,myOrders);

//admin routes
router.route('/orders').get(isAuthenticatedUser,autherizeRoles('admin'),allOrders);
router.route('/order/:id').put(isAuthenticatedUser,autherizeRoles('admin'),updateOrder)
                          .delete(isAuthenticatedUser, autherizeRoles("admin"), deleteOrder);

module.exports=router;