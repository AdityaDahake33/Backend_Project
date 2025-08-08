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
    body('password').trim().isLength({ min: 8 }),
    body('username').trim().isLength({ min: 3 }),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, username, password} = req.body;

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            email,
            username,
            password: hashPassword 
        });

        await newUser.save();

        res.json(newUser);

    })



router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/login',
    body('email').trim().isEmail().isLength({ min: 12 }),
    body('password').trim().isLength({ min: 8 }),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
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

         res.send('Login successful!');
    }
);


module.exports = router;