'use strict';

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'user' },
  orderItems: [{
    product: { type: mongoose.Types.ObjectId, ref: 'product' },
    quantity: Number,
    price: Number
  }],
  totalOrderPrice: Number,
  shippingAddress: {
    street: String,
    city: String,
    phone: Number
  },
  paymentType: {
    type: String,
    enum: ['cash', 'card'],
    default: 'cash'
  },
  isDelivered: {
    type: Boolean,
    default: false
  },
  deliveredAt: Date,
  isPaid: {
    type: Boolean,
    default: false
  },
  paidAt: Date,
},
  { timestamps: true }
);

export const orderModel = mongoose.model("order", orderSchema);
