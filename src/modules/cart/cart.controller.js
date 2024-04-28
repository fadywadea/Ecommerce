"use strict";

import { cartModel } from "../../../database/models/cart.model.js";
import { productModel } from "../../../database/models/product.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";

const calcTotalPrice = (cart) => {
  let totalPrice = 0;
  cart.cartItems.forEach((item) => { totalPrice += item.quantity * item.price; });
  cart.totalPrice = totalPrice;
}

const addToCart = catchError(async (req, res, next) => {
  let product = await productModel.findById(req.body.product);
  if (!product) return next(new AppError("Product not found.", 404));
  if (req.body.quantity > product.quantity) return next(new AppError("Sold out.", 404));
  req.body.price = product.price;
  let isCartExist = await cartModel.findOne({ user: req.user._id });
  if (!isCartExist) {
    let cart = new cartModel({ user: req.user._id, cartItems: [req.body] });
    calcTotalPrice(cart);
    await cart.save();
    !cart && next(new AppError("The cart is empty.", 404));
    cart && res.status(201).json({ message: "success", cart });
  } else {
    let item = isCartExist.cartItems.find((item) => item.product == req.body.product);
    if (item) {
      item.quantity += req.body.quantity || 1;
      if (item.quantity > product.quantity) return next(new AppError("Sold out.", 404));
    }
    else isCartExist.cartItems.push(req.body);
    calcTotalPrice(isCartExist);
    await isCartExist.save();
    res.status(201).json({ message: "success", cart: isCartExist });
  }
});

const removeAddress = catchError(async (req, res, next) => {
  let address = await cartModel.
    findByIdAndUpdate(req.user._id, { $pull: { addresses: { _id: req.params.id } } }, { new: true });
  !address && next(new AppError("The address is empty.", 404));
  address && res.status(200).json({ message: "success", address: address.addresses });
});

const getAddress = catchError(async (req, res) => {
  let { addresses } = await cartModel.findById(req.user._id);
  addresses && res.status(200).json({ message: "success", addresses });
});

export { addToCart };
