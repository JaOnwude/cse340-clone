const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()
  res.render("index", {title: "Home", nav})
}

baseController.triggerError = function(req, res, next) {
  // Intentionally throw an error
  next(new Error("Intentional 500 error triggered"))
}

module.exports = baseController