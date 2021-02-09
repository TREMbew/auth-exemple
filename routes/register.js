const express = require('express');
const {body, validationResult} = require('express-validator')
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()


//REGISTER USER
router.post("/", [
    body('firstname', 'Only alphabetic').isAlpha(),
    body('lastname', 'Only alphabetic').isAlpha(),
    body('email', 'Enter a valid email').isEmail(),
    body('phone', 'Enter a valid phone number').isNumeric(),
    body('password', 'Password minimum length is 5').isLength({min : 5})
], (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors : errors.array()})
    }
    User.find({email : req.body.email})
        .then(user => {
            if(user.length) {
                return res.status(400).send({errors : [{msg : 'User already exists'}]})
            }
            let newUser = new User(req.body)
            bcrypt.genSalt(10, (err,salt) => {
                if(err) console.log(err)
                bcrypt.hash(req.body.password, salt, (err, hashedPwd) => {
                    if(err) console.log(err)
                    newUser.password = hashedPwd;
                    newUser.save();
                    let payload = {
                        userId : newUser._id
                    }
                    jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
                        if(err) console.log(err)
                        res.send({token})
                    })
                })
            })
        })
})

module.exports = router;
