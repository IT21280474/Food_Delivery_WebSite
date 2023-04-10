const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Customer} = require('../models/Customer');


router.post("/register",(req,res) => {
    Customer.find({email: req.body.email}).exec().then((customer) =>{
        if(customer.length >=1){
            return res.status(401).json({
                status: false,
                message: "Email exists",
                data:undefined
            })
        }else{
            bcrypt.hash(req.body.password, 2, (err,hash) =>{
                if(err){
                    return res.status(500).json({
                        status:false,
                        message:"Error, cannot encrypt password",
                        data: undefined
                    })
                }else{
                    const customer = new Customer({...req.body, password:hash});
                    customer.save((err, doc) =>{
                        if(err) return res,json({
                            status:false,
                            message:err,
                            data: undefined
                        })
                        return res.status(200).json({
                            status:false,
                            message:"Register Successfully!",
                            data: doc
                        })
                    })
                }
            })
        }
    })
})

module.exports = router;