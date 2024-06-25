
const express = require("express");
const orderController = require("../controllers/OrderController");
const { check } = require("express-validator");
const authenticateToken = require("../middlewares/auth");

const router = express.Router();

router.post(
  "/checkout",
  [
    authenticateToken,
    check("productIds").not().isEmpty().isArray().withMessage("Product ids is required"),
    check("quantity").not().isEmpty().withMessage("Quantity is required"),
    check("addressId").not().isEmpty().withMessage("Address is required"),
  ],
  orderController.checkOut
);

router.get("/list", orderController.list);

module.exports = router;
