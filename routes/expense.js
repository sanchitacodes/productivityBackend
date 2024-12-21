const express = require("express");
const Expense = require("../models/Expense");
const CashIn = require("../models/Cashin");
const wrapAsync = require("../utils/wrapasync.js");
const { isLoggedIn } = require("../middleware");

const router = express.Router();

// Display the combined cash-in and expense page
router.get(
  "/",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const expenses = await Expense.find({ createdBy: req.user._id });
    const cashInDetails = await CashIn.find({ createdBy: req.user._id });

    // Calculate totalCashIn and totalExpenses safely
    const totalCashIn = cashInDetails.reduce(
      (acc, item) => acc + (Number(item.amount) || 0), // Convert amount to number or 0 if not valid
      0
    );

    const totalExpenses = expenses.reduce(
      (acc, item) => acc + (Number(item.amount) || 0), // Convert amount to number or 0 if not valid
      0
    );

    const remainingMoney = totalCashIn - totalExpenses;

    res.render("expenses/index.ejs", {
      expenses,
      cashInDetails,
      remainingMoney, // Send the correct remainingMoney value
    });
  })
);

// Add cash-in
router.post(
  "/cashin",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { amount } = req.body;
    const numericAmount = Number(amount); // Ensure amount is a number
    if (isNaN(numericAmount) || numericAmount <= 0) {
      req.flash("error", "Invalid cash-in amount!");
      return res.redirect("/expenses");
    }
    const cashIn = new CashIn({
      amount: numericAmount,
      source: "", // Source can be added later if needed
      date: new Date(),
      createdBy: req.user._id,
    });
    await cashIn.save();
    req.flash("success", "Cash added successfully!");
    res.redirect("/expenses");
  })
);

// Add an expense
router.post(
  "/spend",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { amount, category, date } = req.body;
    const numericAmount = Number(amount); // Ensure amount is a number
    if (isNaN(numericAmount) || numericAmount <= 0) {
      req.flash("error", "Invalid expense amount!");
      return res.redirect("/expenses");
    }
    const expense = new Expense({
      amount: numericAmount,
      category,
      date,
      createdBy: req.user._id,
    });
    await expense.save();
    req.flash("success", "Expense added successfully!");
    res.redirect("/expenses");
  })
);

// Delete an expense
router.delete(
  "/delete/:id",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    await Expense.findByIdAndDelete(req.params.id);
    req.flash("success", "Expense deleted successfully!");
    res.redirect("/expenses");
  })
);

// Delete a cash-in record (optional, if needed)
router.delete(
  "/cashin/:id",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    await CashIn.findByIdAndDelete(req.params.id);
    req.flash("success", "Cash-in record deleted successfully!");
    res.redirect("/expenses");
  })
);

module.exports = router;
