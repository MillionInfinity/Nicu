const { Ventilator, validate } = require("../models/ventilator");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const moment = require("moment");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const ventilators = await Ventilator.find()
    .select("-__v")
    .sort("title");
  res.send(ventilators);
});

router.post("/", [auth], async (req,res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const ventilator = new Ventilator({
    title: req.body.title,
    description: req.body.description,
    dailyRentalRate: req.body.dailyRentalRate,
    // img:req.body.img,
    publishDate: moment().toJSON()
  });
  await ventilator.save();

  res.send(ventilator);
});

router.put("/:id", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const ventilator = await Ventilator.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
      dailyRentalRate: req.body.dailyRentalRate,
      // img:req.body.img
    },
    { new: true }
  );

  if (!ventilator)
    return res.status(404).send("The ventilator with the given ID was not found.");

  res.send(ventilator);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const ventilator = await Ventilator.findByIdAndRemove(req.params.id);

  if (!ventilator)
    return res.status(404).send("The ventilator with the given ID was not found.");

  res.send(ventilator);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const ventilator = await Ventilator.findById(req.params.id).select("-__v");

  if (!ventilator)
    return res.status(404).send("The ventilator with the given ID was not found.");

  res.send(ventilator);
});

module.exports = router;
