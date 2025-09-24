// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")

// Route to build inventory by classification view
// router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/type/:classificationId", require("../utilities/").handleErrors(invController.buildByClassificationId));

// Route to build vehicle detail view
router.get("/detail/:invId", require("../utilities/").handleErrors(invController.buildDetailView))

module.exports = router;