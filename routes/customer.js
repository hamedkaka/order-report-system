const express = require("express");
const customerController = require("../controllers/CustomerController");
const { check, validationResult } = require("express-validator");
const authenticateToken = require("../middlewares/auth");

const router = express.Router();

router.post(
  "/register",
  [
    check("name").not().isEmpty().withMessage("Name is required"),
    check("email").isEmail().withMessage("Valid email is required"),
    check("phone").not().isEmpty().withMessage("Phone number is required"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  customerController.createCustomer
);

router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Valid email is required"),
    check("password").not().isEmpty().withMessage("Password is required"),
  ],
  customerController.loginCustomer
);

router.post(
  "/:customerId/address",
  [
    authenticateToken,
    check("street").not().isEmpty().withMessage("Street is required"),
    check("city").not().isEmpty().withMessage("City is required"),
    check("state").not().isEmpty().withMessage("State is required"),
    check("zip").not().isEmpty().withMessage("ZIP code is required"),
  ],
  customerController.addAddress
);

router.put(
  "/:customerId/address/:addressId",
  [
    check("street").not().isEmpty().withMessage("Street is required"),
    check("city").not().isEmpty().withMessage("City is required"),
    check("state").not().isEmpty().withMessage("State is required"),
    check("zip").not().isEmpty().withMessage("ZIP code is required"),
  ],
  customerController.updateAddress
);

module.exports = router;
