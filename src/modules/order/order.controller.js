"use strict";

import { cartModel } from "../../../database/models/cart.model.js";
import { orderModel } from "../../../database/models/order.model.js";
import { productModel } from "../../../database/models/product.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";

const createOrderCash = catchError(async (req, res, next) => {

  //1- get cart -> cartId
  const cart = await cartModel.findById(req.params.id);
  if (!cart) throw new AppError("Cart not found.", 404);
  
  //2-total order price
  const totalOrderPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice;

  //3—create order —> cash
  const soldOutPromises = cart.cartItems.map(async (prod) => {
    const product = await productModel.findById(prod.product);
    if (prod.quantity > product.quantity) throw new AppError("Sold out.", 404);
  });
  await Promise.all(soldOutPromises);

  const order = new orderModel({
    userId: req.user._id,
    orderItems: cart.cartItems,
    totalOrderPrice,
    shippingAddress: req.body.shippingAddress
  });
  await order.save();

  //4—increment sold & decrement quantity
  const option = cart.cartItems.map((prod) => {
    return (
      {
        updateOne: {
          "filter": { _id: prod.product },
          "update": { $inc: { sold: prod.quantity, quantity: -prod.quantity } },
        }
      });
  });
  await productModel.bulkWrite(option);

  //5—clear cart
  await cartModel.findByIdAndDelete(req.params.id);

  res.json({ message: "success", order });
});

export { createOrderCash };
