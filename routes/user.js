const express = require('express');
const User = require('../model/user');
const UserModel = require('../model/user')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const router = express.Router();

router.post("/register", async (req, res, next) => {
    try{ 
        var userExits = await UserModel.findOne({email: req.body.email})
        if(userExits){
            return res.status(400).json({msg: "email already registered"})
        }
        if(req.body.password != req.body.confirmPassword){
            return res.status(400).json({msg: "please check confirmPassword, confirm password should be same as password"})
        }
        var password = await bcrypt.hash(req.body.password, saltRounds)
        var userObj = {
            name: req.body.name,
            email: req.body.email,
            password: password,
            mobileNumber: req.body.mobileNumber
        }
        const newUser = new UserModel(userObj)
        var data = await newUser.save()
        console.log(data)
        return res.status(200).json({
            data: data,
            msg: "User registered successfully"
        })
    } catch(error){
        return res.status(500).json({error: error})
    }
})

router.post("/login", async (req, res, next) => {
    try{
        var user = await UserModel.findOne({email: req.body.email})
        if(!user){
            return res.status(400).json({msg: "User with this email doesnt exists"})
        }
        var result = await bcrypt.compare(req.body.password, user.password)
        if(result){
            return res.status(200).json({msg: "Login Successfull"})
        }else {
            return res.status(400).json({msg: "Please check password, Authentication Failed"})
        }
    }catch (error){
        return res.status(500).json({error: error})
    }
})

module.exports = router