const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");


router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      // Check if the email already exists
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        // Email already exists, send a response indicating that registration failed
        return res.status(400).json({
          success: false,
          message: "Email already exists. Please use a different email.",
        });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new User instance with the hashed password
      const newUser = new User({ name, email, password: hashedPassword });
  
      // Save the user to the database
      await newUser.save();
  
      res.status(200).json({
        success: true,
        message: "Registered Successfully",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  });

  router.post('/login',async(req,res)=>{
    const {email,password}=req.body

    try {
        const user = await User.find({email,password})
        if(user.length>0){
            const currentUser={
                name:user[0].name,
                email:user[0].email,
                isAdmin:user[0].isAdmin,
                _id:user[0]._id

            } 
            res.status(200).send(currentUser)
        }else{
            res.status(400).json({
                message:'Login Failed'
            })
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        })
    }
  })


module.exports = router;
