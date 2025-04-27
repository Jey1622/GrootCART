const catchAsyncError = require("../middlewares/catchAsyncError");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");

//new order - api/v1/order/new
exports.newOrder = catchAsyncError(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user.id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

//get single product - api/v1/order/:id
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order=await Order.findById(req.params.id).populate('user','name email');

    if(!order){
        return next(new ErrorHandler(`order not found this id : ${req.params.id}`,400))
    }

    res.status(200).json({
        success:true,
        order
    })
});

//get Logged in user all order - api/v1/myOrders
exports.myOrders=catchAsyncError(async (req,res,next)=>{
    const orders=await Order.find({user:req.user.id});
    if(!orders){
        return next(new ErrorHandler(`order not found this id : ${req.params.id}`,400))
    }
    res.status(200).json({
        success:true,
        orders
    })
})

//Admin : get All orders -api/v1/orders

exports.allOrders=catchAsyncError(async(req,res,next)=>{
    const orders=await Order.find()

    let totalAmount=0

    orders.forEach(order => {
        totalAmount += order.totalPrice
    });

    res.status(200).json({
        success:true,
        orders,
        totalAmount
    })
})

//Admin : update order -api/v1/order/:id

exports.updateOrder = catchAsyncError(async (req, res, next) => {
    const order=await Order.findById(req.params.id)

    if(order.orderStatus == 'Delivered'){
        return next(new ErrorHandler('Order has been already delivered',400));
    }

    //updating the order item stoke
    order.orderItems.forEach( async orderItem=>{
        await updateStock(orderItem.product,orderItem.quantity)
    })

    order.orderStatus=req.body.orderStatus
    order.deliveredAt=Date.now()
    await order.save();

    res.status(200).json({
        success:true
    })
})

async function updateStock (productId,quantity){
    const product= await Product.findById(productId)
    product.stock=product.stock-quantity
    product.save({validateBeforeSave:false})
}

//Admin : delete order -api/v1/order/:id

exports.deleteOrder=catchAsyncError(async (req, res, next) => {
    const order=await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler(`order not found this id : ${req.params.id}`,400))
    }

    await order.deleteOne();
    
    res.status(200).json({
        success:true
    })
});