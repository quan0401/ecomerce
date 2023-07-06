const connectDB = require("../config/db");

// Seeder for Category
const categories = require("./categories");
const Category = require("../models/CategoryModel");

// Seeder for Product
const Product = require("../models/ProductModel");
const products = require("./products");

// Seeder for Review
const Review = require("../models/ReviewModel");
const reviews = require("./reviews");

// Seeder for User
const User = require("../models/UserModel");
const users = require("./users");

// Seeder for order
const Order = require("../models/OrderModel");
const orders = require("./orders");

const importData = async () => {
  connectDB();
  try {
    await Category.deleteMany({});
    await Category.insertMany(categories);

    await Review.deleteMany({});
    const result = await Review.insertMany(reviews);

    products.forEach((product) => {
      result.forEach((review) => {
        product.reviews.push(review._id);
      });
    });
    await Product.deleteMany({});
    await Product.insertMany(products);

    await User.deleteMany({});
    await User.insertMany(users);

    // await Order.deleteMany({});
    await Order.insertMany(orders);

    console.log("Seeder data");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = importData;
