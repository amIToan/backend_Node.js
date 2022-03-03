const express = require('express');
const router = express.Router();
const User = require('../models/users')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken');
const authToken = require('../middleware/confirm')
//@route POST api/auth/register
// access Public
router.post('/register', async (req, res) => {
    try {
        const {
            username,
            password
        } = req.body;
        // Simple validation
        if (!username || !password)
            res.status(400).json({
                success: false,
                message: 'Please enter your password or name... '
            });
        const user = await User.findOne({
            username
        })
        if (user) return res.status(400).json({
            success: false,
            message: 'Username already existed!!! '
        });
        // It's ok 
        const hashedPass = await argon2.hash(password)
        const newUser = new User({
            username,
            password: hashedPass
        }) // nên nhớ username bên này phải trung vs bên auth
        await newUser.save()
        // // accessToken
        const accessToken = jwt.sign({
            userId: newUser._id
        }, process.env.access_Token)
        res.json({
            success: true,
            message: 'Ok! Success',
            accessToken: accessToken
        })
    } catch (error) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Error',
        })
    }
})

// route login
// access Public
router.post('/login', async (req,res)=> {
    try {
        // Check if it exists or not
        const {
            username,
            password
        } = req.body;
        // Simple validation
        if (!username || !password)
            res.status(400).json({
                success: false,
                message: 'Please enter your password or name... '
            });
        const user = await User.findOne({
            username
        })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Inaccurate name!!! '
            });
            // It's ok 
        }else{
            const passwordValid = await argon2.verify(user.password, password);
            if (!passwordValid){
                return res.status(400).json({
                    success: false,
                    message: 'Inaccurate password !!! '
                }); 
            }else{
                const accessToken = jwt.sign({
                    userId: user._id
                }, process.env.access_Token)
                res.json({
                    success: true,
                    message: 'Ok! Success',
                    accessToken: accessToken
                })
            }
  
        }
        
        const hashedPass = await argon2.hash(password)
        const newUser = new User({
            username,
            password: hashedPass
        }) // nên nhớ username bên này phải trung vs bên auth
        await newUser.save()
        // // accessToken
        const accessToken = jwt.sign({
            userId: newUser._id
        }, process.env.access_Token)
        res.json({
            success: true,
            message: 'Ok! Success',
            accessToken: accessToken
        })
    } catch (error) {
          res.status(500).json({
            success: false,
            message: 'Inaccurate password or username!!! '
        }); 
    }
})
// route get api/auth . To check if user is authenticated or not
router.get('/', authToken, async(req,res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) return es.status(400).json({
            success: false,
            message: 'User not found !!! '
        });
        res.json({
            success: true,
            message: user
        }) 
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error',
        })
    }
})
module.exports = router;