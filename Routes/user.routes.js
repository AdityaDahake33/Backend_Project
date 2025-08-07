const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');


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

        const newUser =  await new UserModel({
            email,
            username,
            password : hashPassword 
        })

        res.json(newUser);

    })


module.exports = router;