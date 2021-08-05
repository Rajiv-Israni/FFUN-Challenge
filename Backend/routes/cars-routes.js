const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const carsController = require("../controllers/cars-controller");

router.get("/", carsController.getCars);

router.get("/:cid", carsController.getCarById);

router.post(
  "/",
  [
    check("make").not().isEmpty(),
    check("model").not().isEmpty(),
    check("year").not().isEmpty(),
    check("price").not().isEmpty(),
    check("status").not().isEmpty(),
  ],
  carsController.createCar
);

router.patch(
  "/:cid",
  [
    check("make").not().isEmpty(),
    check("model").not().isEmpty(),
    check("year").not().isEmpty(),
    check("price").not().isEmpty(),
    check("status").not().isEmpty(),
  ],
  carsController.updateCar
);

router.delete("/:cid", carsController.deleteCar);

module.exports = router;
