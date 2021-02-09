const express = require('express');
const {body , validationResult} = require('express-validator')
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const authMiddleware = require('../middlewares/authMiddleware')

//Load connected user
router.get('/', authMiddleware, (req, res) => {
    User.findById(req.userId)
        .select("-password")
        .then(user => {
            if(!user){
                return res.status(404).json({msg : 'User not found'})
            }
            res.status(200).json(user)
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({msg : 'Serever error'})
        })
})

//Login user
router.post("/", [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Write your password').notEmpty()
], (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({erros : errors.array()})
    }
    User.findOne({email: req.body.email})
        .then(user => {
            if(!user){
                return res.status(404).json({errors :[{msg :"Please register"}]})
            }
            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                if(err) console.log(err);
                if(!isMatch) {
                    res.json({errors : [{msg : 'Wrong password'}]})
                } else {
                    let payload = {
                        userId : user._id
                    }
                    jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
                        if(err) console.log(err)
                        res.send({token})
                    })
                }
            })
        })
})



module.exports = router