const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build vehicle detail view
 * ************************** */
invCont.buildDetailView = async function (req, res, next) {
  try {
    const inv_id = req.params.invId
    const vehicle = await invModel.getInventoryById(inv_id)
    const detail = utilities.buildVehicleDetail(vehicle)
    let nav = await utilities.getNav()
    if (!vehicle) {
      return next({ status: 404, message: "Vehicle not found" })
    }
    res.render("./inventory/detail", {
      title: `${vehicle.inv_make} ${vehicle.inv_model} Details`,
      nav,
      detail,
    })
  } catch (error) {
    next(error)
  }
}

/* ***************************
 *  Build management view
 * ************************** */
invCont.buildManagement = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/management", {
    title: "Inventory Management",
    nav,
  })
}

/* ***************************
 *  Build addClassification view
 * ************************** */
invCont.buildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/add-classification", {
    title: "Add Classification",
    nav,
  })
}

/* ***************************
 *  AddClassification view
 * ************************** */
invCont.addClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  const { classification_name } = req.body
  //validation at the Server-side 
  if (!/^[A-Za-z0-9]+$/.test(classification_name)) {
    req.flash("notice", "Invalid classification name.")
    return res.render("inventory/add-classification", { title: "Add Classification", nav })
  }
  const result = await invModel.addClassification(classification_name)
  if (result.rowCount > 0) {
    req.flash("notice", "Classification added successfully!")
    res.redirect("/inv")
  } else {
    req.flash("notice", "Failed to add classification.")
    res.render("inventory/add-classification", { title: "Add Classification", nav })
  }
}

/* ***************************
 *  Build addInventory view
 * ************************** */
invCont.buildAddInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  let classificationList = await utilities.buildClassificationList()
  res.render("inventory/add-inventory", {
    title: "Add Vehicle",
    nav,
    classificationList,
  })
}

/* ***************************
 *  AddInventory view
 * ************************** */
invCont.addInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  let classificationList = await utilities.buildClassificationList(req.body.classification_id)
  const {
    inv_make, inv_model, inv_year, inv_description,
    inv_image, inv_thumbnail, inv_price, inv_miles,
    inv_color, classification_id
  } = req.body

  //A server-side validation
  if (!inv_make || !inv_model || !inv_year || !inv_description || !inv_image || !inv_thumbnail || !inv_price || !inv_miles || !inv_color || !classification_id) {
    req.flash("notice", "All fields are required.")
    return res.render("inventory/add-inventory", {
      title: "Add Vehicle",
      nav,
      classificationList,
      inv_make, inv_model, inv_year, inv_description,
      inv_image, inv_thumbnail, inv_price, inv_miles,
      inv_color, classification_id
    })
  }

  const result = await invModel.addInventory(
    inv_make, inv_model, inv_year, inv_description,
    inv_image, inv_thumbnail, inv_price, inv_miles,
    inv_color, classification_id
  )

  if (result.rowCount > 0) {
    req.flash("notice", "Vehicle added successfully!")
    res.redirect("/inv/management")
  } else {
    req.flash("notice", "Failed to add vehicle.")
    res.render("inventory/add-inventory", {
      title: "Add Vehicle",
      nav,
      classificationList,
      inv_make, inv_model, inv_year, inv_description,
      inv_image, inv_thumbnail, inv_price, inv_miles,
      inv_color, classification_id
    })
  }
}

module.exports = invCont