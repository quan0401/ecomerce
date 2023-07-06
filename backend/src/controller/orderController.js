const Order = require("../models/OrderModel");
const mongoose = require("mongoose");
const Product = require("../models/ProductModel");

const getUserOrders = async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);
    const orders = await Order.find({ user: { _id: userId } });
    res.status(200).send(orders);
  } catch (error) {
    next(error);
  }
};

const getOrder = async (req, res, next) => {
  try {
    const orders = await Order.findById(req.params.id)
      .populate("user", "-password -_id -isAdmin -createdAt -updatedAt -__v")
      .orFail();
    res.status(200).send(orders);
  } catch (error) {
    next(error);
  }
};

const createOrder = async (req, res, next) => {
  try {
    const { orderTotal, cartItems, paymentMethod } = req.body;
    if (!(orderTotal && cartItems && paymentMethod))
      res.status(400).send("All inputs are required");

    const productIds = [];
    const quantity = [];
    cartItems.forEach((item) => {
      productIds.push(item.productId);
      quantity.push(item.quantity);
    });

    const order = await Order.create({
      orderTotal,
      cartItems,
      paymentMethod,
      user: new mongoose.Types.ObjectId(req.user._id),
    });

    await Product.find({ _id: { $in: productIds } }).then((products) => {
      products.forEach((product, index) => {
        product.sales += quantity[index];
        product.save();
      });
    });

    res.status(200).send({ order });
  } catch (error) {
    next(error);
  }
};

const updateOrderToPaid = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    order.isPaid = true;
    order.paidAt = Date.now();
    const updatedOrder = await order.save();
    res.status(200).send(updatedOrder);
  } catch (error) {
    next(error);
  }
};

const updateOrderToDelivered = async (req, res, next) => {
  try {
    const order = await Order.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(req.params.id),
      },
      [
        { $set: { isDelivered: true } },
        {
          $set: {
            deliveredAt: new Date(),
          },
        },
      ],
      { new: true }
    );
    res.status(200).send(order);
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user", "-password")
      .sort("desc");
    res.status(200).send(orders);
  } catch (error) {
    next(error);
  }
};

const getOrdersForAnalysis = async (req, res, next) => {
  try {
    const start = new Date(req.query.firstDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(req.query.firstDate);
    end.setHours(23, 59, 59, 999);

    const orders = await Order.find({
      createdAt: { $gt: start, $lt: end },
    }).sort("asc");

    res.status(200).send(orders);
  } catch (error) {
    next(error);
  }
};

const testMomo = async (req, res, next) => {
  try {
    let result;
    await Order.aggregate([{ $match: { paymentMethod: "momo" } }]).then(
      (orders) => {
        const listToDelete = orders.map((item) => item._id);
        Order.deleteMany({ _id: { $in: listToDelete } })
          .then((res) => {
            result = res;
          })
          .catch((e) => console.log(e));
      }
    );

    res.send(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserOrders,
  getOrder,
  createOrder,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
  getOrdersForAnalysis,
  testMomo,
};
