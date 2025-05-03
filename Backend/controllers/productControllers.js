const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const APIFeatures = require("../utils/apiFeatures");

//get Products - /api/v1/products
exports.getProducts = async (req, res, next) => {
  const resPerPage = 3;
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .paginate(resPerPage);

  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
};

//Create Products - /api/v1/product/new
exports.newProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//get single products - /api/v1/product/:id
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not fount", 400));
  }
  res.status(201).json({
    success: true,
    product,
  });
});

//update product - /api/v1/product/:id
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not fount", 400));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    success: true,
    product,
  });
});

//delete product - /api/v1/product/:id
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not fount", 400));
  }

  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "product Deleted",
  });
});

//create Review - api/v1/review

exports.createReview = catchAsyncError(async (req, res, next) => {
  const { productId, rating, comment } = req.body;

  const review = {
    user: req.user.id,
    rating,
    comment,
  };

  const product = await Product.findById(productId);
  //finding user reviews exists
  const isReviewed = product.reviews.find((review) => {
    return review.user.toString() == req.user.id.toString();
  });

  if (isReviewed) {
    //updating the review
    product.reviews.forEach((review) => {
      if (review.user.toString() == req.user.id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    //creating the review
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  //find the average rate of product
  product.rating =
    product.reviews.reduce((acc, review) => {
      return review.rating + acc;
    }, 0) / product.reviews.length;

  product.rating = isNaN(product.rating) ? 0 : product.rating;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//get reviews -api/v1/reviews?id={productId}
exports.getReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//delete review - api/v1/review?productId={product}
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  //filtering the reviews which does not match deleting id
  const reviews = product.reviews.filter((review) => {
    return review._id.toString() !== req.query.id.toString();
  });

  //find number of reviews
  const numOfReviews = reviews.length;

  //finding the average with the filtered reviews
  let rating =
    reviews.reduce((acc, review) => {
      return review.rating + acc;
    }, 0) / product.reviews.length;
  rating = isNaN(rating) ? 0 : rating;

  //save the product
  await Product.findByIdAndUpdate(req.query.productId, {
    rating,
    numOfReviews,
    reviews,
  });

  res.status(200).json({
    success: true,
  });
});
