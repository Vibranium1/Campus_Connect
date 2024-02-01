const express = require('express');
const app = express()
const mongoose = require('mongoose');
const User = mongoose.model("User");
const Admin = mongoose.model("Admin");
const router = express.Router();
const upload = '../app.js'
// import {
//   getUser,
//   getUserFriends,
//   addRemoveFriend,
// } from "../controllers/users.js";
const {
    getUser,
    getUserFriends,
    addRemoveFriend,
  }  = require ("../controllers/users.js")
const usersController = require("../controllers/users.js");
// import { verifyToken } from "../middleware/auth.js";
const verifyToken = require('../middleware/auth.js')

// router.get('/', (req, res) => {
//     res.json({message: 'pratham shah is pro'});
// })


router.get("/:id",  getUser);
router.get("/:id/friends", getUserFriends);

/* UPDATE */
router.patch("/:id/:friendId", addRemoveFriend);

// router.post('/register', upload.single("picture"), async (req, res) => {
//     try {
//         console.log('data is', req.body);
//         const newUser = await new User({
//             ...req.body,
//         });
//         await newUser.save();
//         res.json({ message: 'registered successfully' });
//     }
//     catch (e) {
//         console.log('error occured', e);
//     }
// });

// removeEventListenerouter.get('/search/:enterName', (req, res) => {
//     if(!req.params.enterName) {
//         return res.status(422).json();
//     }
//     let userPattern = new RegExp("^" + req.params.enterName) 
//     User.find({ name: { $regex: userPattern } })
//         .select("_id name")
//         .then(user => {
//             console.log(user)
//             if(user.length === 0) {
//                 return res.status(422).json(user);
//             }
//             return res.status(200).json(user);
//         }).catch(err => {
//            console.log(err)
//         })

// })



router.post('/signin', async (req, res) => {
    try {
        const { rollnumber, password } = req.body;
        const user = await User.findOne({ rollnumber: rollnumber });
        if (user) {
            if (user.password === password) {
                return res.json({user});
            }
            else {
                return res.json({ message: "wrong" });
            }
        }
        else {
            // console.log('rgfg')
            const user = await Admin.findOne({ rollnumber: rollnumber });
            if (user) {
                if (user.password === password) {
                    return res.json({ user, isAdmin: true });
                }
                else {
                    return res.json({ message: "wrong" });
                }
            }
            else {
                return res.json({ message: "wrong" });
            }
        }
    }
    catch (e) {
        // console.log('error occured', e);
    }
});

router.get("/userinfo", async(req,res)=>{
    try {
        const user_id = req.body;
        console.log(user_id)
        //const userInfo = await User.findOne({_id : user_id})
        const users = await User.find({ _id: { $ne: req.params.id } }).select([
            "email",
            "name",
            "_id",
          ]);
        console.log(users)
        res.json(users)
    } catch (e) {
        console.log('error occured', e);
    }
})

router.post('/updateemail', async (req, res) => {
    const { userId, email } = req.body;
  
    try {
      // Find the user by ID
      const user = await User.findById(userId);
  
      // Update the user properties
      user.email = email;
    //   user.year = year;
  
      // Save the updated user
      const updatedUser = await user.save();
  
      res.json({ success: true, user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });

  router.post('/updateyear', async (req, res) => {
    const { userId, year } = req.body;
  
    try {
      // Find the user by ID
      const user = await User.findById(userId);
  
      // Update the user properties
    //   user.email = email;
      user.year = year;
  
      // Save the updated user
      const updatedUser = await user.save();
  
      res.json({ success: true, user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });
  

module.exports = router;
