// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")

// Route to build inventory by classification view
// router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/type/:classificationId", require("../utilities/").handleErrors(invController.buildByClassificationId));

// Route to build vehicle detail view
router.get("/detail/:invId", require("../utilities/").handleErrors(invController.buildDetailView))

// Route to build management view
router.get("/management", require("../utilities/").handleErrors(invController.buildManagement))

router.get("/", require("../utilities/").handleErrors(invController.buildManagement))

// Route to build addClassification view
router.get("/add-classification", require("../utilities/").handleErrors(invController.buildAddClassification))

// Process the addClassification form
router.post("/add-classification", require("../utilities/").handleErrors(require("../controllers/invController").addClassification))

//Route to build addInventory
router.get("/add-inventory", require("../utilities/").handleErrors(require("../controllers/invController").buildAddInventory))

// Process the addInventory form
router.post("/add-inventory", require("../utilities/").handleErrors(require("../controllers/invController").addInventory))

module.exports = router;