const express = require("express");
const router = express.Router();
const Pizza = require("../models/pizzaModel");
const mongoose = require("mongoose"); 

// POST a new pizza
router.post("/add-pizza", async (req, res) => {
  const { pizza} = req.body;
  try { 
// Create a new pizza
    const newPizza = new Pizza({
      name:pizza.name,
      varients:['small','medium','large'],
      prices:[pizza.prices],
      category:pizza.category,
      image:pizza.image,
      description:pizza.description,
    });
    // Save the pizza to the database
    const savedPizza = await newPizza.save();

    res.status(200).json({
      success: true,
      message: "Pizza added Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/get-pizza", async (req, res) => {
try{
    const data = await Pizza.find().limit(10);
    res.json(data)
    console.log('data',data);
}
catch(error){
    res.status(500).json({message: error.message})
}
});

router.get("/edit-pizza/:pizzaId", async (req, res) => {
  const pizzaId = req.params.pizzaId;
  console.log('Received pizzaId:', pizzaId);

  try {
    const pizza = await Pizza.findById(new mongoose.Types.ObjectId(pizzaId));
    

    if (!pizza) {
      return res.status(404).json({ message: 'Pizza not found' });
    }

    console.log('Found Pizza:', pizza);
    res.json(pizza);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update the router.post endpoint
router.post("/update-pizza", async (req, res) => {
  const updatedPizza = req.body.updatedPizza;
  console.log('Received updated pizza data:', updatedPizza);

  try {
    const pizza = await Pizza.findOne({ _id: updatedPizza._id });
    if (!pizza) {
      return res.status(404).json({ message: 'Pizza not found' });
    }

    pizza.name = updatedPizza.name;
    pizza.description = updatedPizza.description;
    pizza.image = updatedPizza.image;
    pizza.category = updatedPizza.category;
    pizza.prices = [updatedPizza.prices];

    await pizza.save();
    res.status(200).send('Pizza updated successfully!');
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.post("/delete-pizza/:pizzaId", async (req, res) => {


  try {
    const pizzaId = req.params.pizzaId;

    const deletedPizza = await Pizza.findByIdAndDelete(new mongoose.Types.ObjectId(pizzaId));

    if (!deletedPizza) {
      return res.status(404).json({ message: 'Pizza not found' });
    }

    res.status(200).json({
      success: true,
      message: "Pizza deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;

