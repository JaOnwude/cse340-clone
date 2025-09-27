const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities")
const accountController = require("../controllers/accountController")

// Login view route
router.get("/login", utilities.handleErrors(accountController.buildLogin))

// Register view route
router.get("/register", utilities.handleErrors(accountController.buildRegister))

// Process registration data
router.post('/register', utilities.handleErrors(accountController.registerAccount))


module.exports = router