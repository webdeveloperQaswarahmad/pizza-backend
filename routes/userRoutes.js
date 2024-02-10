const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email already exists. Please use a different email.",
        });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashedPassword });
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

router.get('/getallusers', async (req, res) => {
  try {
    const users = await User.find({}).maxTimeMS(2000);
    res.status(200).send(users);
  } catch (error) {
    res.status(404).json({
      message: error.stack
    });
  }
});


router.delete('/deleteuser/:userid', async (req, res) => {
  const userid = req.params.userid;
  try {
    await User.findOneAndDelete({ _id: userid });
    res.status(200).send('User deleted');
  } catch (error) {
    res.status(404).json({
      message: error.stack,
    });
  }
});

router.put('/toggle-admin/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Toggle the isAdmin status
    user.isAdmin = !user.isAdmin;

    // Save the updated user
    await user.save();

    // Return the updated user data
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
