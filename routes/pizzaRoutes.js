// routes/pizzaRoutes.js
const express = require("express");
const router = express.Router();
const Pizza = require("../models/pizzaModel");
const mongoose = require("mongoose"); // Import mongoose


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
    const data = await Pizza.find();
    res.json(data)
    console.log('data',data);
}
catch(error){
    res.status(500).json({message: error.message})
}
});


// router.post("/edit-pizza", async (req, res) => {
//   const pizzaId=req.body.pizzaId
//   try{
//       const pizza = await Pizza.find({_id:pizzaId});
//       res.send(pizza)
//   }
//   catch(error){
//       res.status(500).json({message: error.message})
//   }
//   });

// module.exports = router;


router.get("/edit-pizza/:pizzaId", async (req, res) => {
  const pizzaId = req.params.pizzaId;
  console.log('Received pizzaId:', pizzaId);

  try {
    const pizza = await Pizza.findById(new mongoose.Types.ObjectId(pizzaId));

    if (!pizza) {
      // If no pizza is found with the given ID, return a 404 Not Found response
      return res.status(404).json({ message: 'Pizza not found' });
    }

    console.log('Found Pizza:', pizza);
    res.json(pizza);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});






module.exports = router;

