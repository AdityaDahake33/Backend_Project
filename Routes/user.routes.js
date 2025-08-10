const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');


router.get('/register', (req, res) => {
    res.render('register');
})

router.post('/register',
    body('email').trim().isEmail().isLength({ min: 15 }),
    body('password').trim().isLength({ min: 10 }),
    body('username').trim().isLength({ min: 3 }),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Render the register page with errors instead of returning JSON
            return res.render('register', { 
                errors: errors.array(),
                formData: req.body // Pass form data back to pre-fill the form
            });
        }

        try {
            const { email, username, password} = req.body;

            const hashPassword = await bcrypt.hash(password, 10);

            const newUser = new UserModel({
                email,
                username,
                password: hashPassword 
            });

            await newUser.save();
            
            // Redirect to login page after successful registration
            res.redirect('/user/login');
        } catch (error) {
            // Handle database errors (like duplicate email/username)
            return res.render('register', { 
                errors: [{ msg: error.message }],
                formData: req.body
            });
        }
    })



router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/login',
    body('email').trim().isEmail().isLength({ min: 15 }),
    body('password').trim().isLength({ min: 10 }),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Render the login page with errors instead of returning JSON
            return res.render('login', { 
                errors: errors.array(),
                formData: req.body // Pass form data back to pre-fill the form
            });
        }

        try {
            const { email, password } = req.body;

            const user = await UserModel.findOne({ email });

            if (!user) {
                return res.render('login', { 
                    errors: [{ msg: 'Invalid email or password' }],
                    formData: req.body
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.render('login', { 
                    errors: [{ msg: 'Invalid email or password' }],
                    formData: req.body
                });
            }

            const token = JWT.sign({ 
                id: user._id,
                email: user.email,
                username: user.username
            },
             process.env.JWT_SECRET, 
             { expiresIn: '1h' }
            );

            res.cookie('token', token) 

            // Redirect to home page
            res.redirect('/home');
        } catch (error) {
            return res.render('login', { 
                errors: [{ msg: 'An error occurred. Please try again.' }],
                formData: req.body
            });
        }
    }
);


module.exports = router;