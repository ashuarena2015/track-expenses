const express = require('express');
// const { ObjectId } = require('mongodb');
const fs = require('fs');
const { dbConnect } = require('../dbConnection');
const bcrypt = require("bcrypt");
const routerUsers = express.Router();
const jwt = require('jsonwebtoken');
const { verifyToken } = require('./isAuth');

routerUsers.get('/', verifyToken, async (req, res) => {
    try {
        const limit = parseInt(req?.query?.limit);
        const offset = parseInt(req?.query?.offset);

        const db = await dbConnect();
        const userCollection = db.collection('users');
        
        const response = await userCollection.find().toArray();
        res.send(response.slice(offset, limit + offset));
    } catch (error) {
        res.send({error: error?.errmsg});
    }
})

routerUsers.get('/auth', verifyToken, async (req, res) => {
    try {
        
        const db = await dbConnect();
        const userCollection = db.collection('users');
        
        const existingUser = await userCollection.findOne({ username: req.user?.username });
        
        // return res.send(existingUser);
        return res
            .status(200)
            .json({
                user: existingUser,
            });
    } catch (error) {
        res.send({error: error?.errmsg});
    }
})

routerUsers.post('/register', async (req, res) => {
    try {
        const db = await dbConnect();
        const userCollection = db.collection('users');
        

        const userInfo = req.query.userInfo;

        // 🔹 Check if user already exists
        const existingUser = await userCollection.findOne({ username: userInfo?.username });
        if (existingUser) {
            return res.status(400).json({
                message: "Username already exists"
            });
        }

        // 🔹 Check if user already exists
        const existingEmail = await userCollection.findOne({ email: userInfo?.email });
        if (existingEmail) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }


        // 🔹 Hash the password with a salt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userInfo?.password, saltRounds);
        
        await userCollection.insertOne({
            ...userInfo,
            password: hashedPassword
        });
        res.send({message: 'User has been registered successfully!'});
    } catch (error) {
        res.send({error: error?.errmsg});
    }
    
})

routerUsers.post('/login', async (req, res) => {

    try {
        const db = await dbConnect();
        const userCollection = db.collection('users');
    
        const { username, password } = req.query.userInfo;


        if(!username || !password) {
            return res.status(400).send({message: 'Please provide correct credentials.'})
        }

        // Check If User Exists In The Database
        const user = await userCollection.findOne({ username });
        // Compare Passwords
        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!user || !passwordMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Generate JWT Token
        const token = jwt.sign({
            userId: user._id,
            username: user.username
        },
        process.env.SECRET_KEY || "1234!@#%<{*&)",
        {
            expiresIn: "1h"
        });

        res.cookie("auth", token, {
            httpOnly: true, // Security: JavaScript can't access it
            secure: false, // Use true in HTTPS (production)
            sameSite: "Lax", // Needed for cross-origin requests,
            expires: new Date(Date.now() + 2629746000)
        });

        return res
            .status(200)
            .json({
                message: "Login Successful",
                user,
                token
            });

    } catch (error) {
        res.send({error: error?.errmsg});
    }
    
})

routerUsers.get('/expenses', async (req, res) => {
    try {
        const db = await dbConnect();
        const userCollection = db.collection('expenses');
        const expenses = await userCollection.find().toArray();
        res.send(expenses);
    } catch (error) {
        res.send({error: error?.errmsg});
    }
})

module.exports = { routerUsers };

