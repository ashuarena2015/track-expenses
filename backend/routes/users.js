const express = require('express');
const { ObjectId } = require('mongodb');
const fs = require('fs');
const { dbConnect } = require('../dbConnection');
const bcrypt = require("bcrypt");
const routerUsers = express.Router();
const jwt = require('jsonwebtoken');
const { verifyToken } = require('./isAuth');
const { AddExpense, UpdateExpenseSchema } = require('./schema/addExpense');

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
            expiresIn: "24h",
        });

        res.cookie("auth", token, {
            httpOnly: true, // ✅ Prevents client-side access
            secure: true, // ✅ Use HTTPS in production
            sameSite: "Strict" // ✅ Prevents CSRF attacks
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
        const expensesCollection = db.collection('expenses');
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const skip = (page - 1) * limit;

        // const expenses = await expensesCollection.find().skip(skip).limit(limit).toArray();
        const expenses = await expensesCollection.aggregate([
            {
                $facet: {
                    totalCount: [{ $count: "count" }],
                    expenses: [{ $skip: skip }, { $limit: limit }],
                    totalExpenseAmount: [
                        {
                            $group: {
                                _id: "$category",  // Group by category
                                amount: { $sum: "$amount" },  // Sum of prices
                            }
                        }
                    ]
                }
            }
        ]).toArray();
        // res.send(expenses);
        res.send({ expenses: expenses[0]?.expenses, totalCount: expenses[0]?.totalCount[0].count, totalExpenses: expenses[0]?.totalExpenseAmount[0].amount });
    } catch (error) {
        res.send({error: error?.errmsg});
    }
})

routerUsers.post('/add-expense', async (req, res) => {
    try {
        const db = await dbConnect();
        const expensesCollection = db.collection('expenses');

        let addNewData = new AddExpense({
            amount: req.query.amount,
            description: req.query.description,
            date: req.query.date,
            userId: req.query.userId
        })
        addNewData.id = addNewData._id.toString();
        await expensesCollection.insertOne(addNewData)
        res.status(200).json({
            message: 'Add expense successfully!'
        });
    } catch (error) {
        res.send({error: error?.errmsg});
    }
})

routerUsers.put("/update-expense", async (req, res) => {
    try {
        const db = await dbConnect();
        const expensesCollection = db.collection('expenses');

        const setOfUpdateData = new UpdateExpenseSchema({
            amount: req.query.amount,
            description: req.query.description,
            date: req.query.date
        })

        const updateData = { $set: setOfUpdateData };
        await expensesCollection.findOneAndUpdate(
            {
                id: req.query?.id
            }, // Find by ID
                updateData, // Update fields
            {
                returnDocument: "after"
            } // Return the updated document
        );

        res.json({
            message: 'Successfully updated the data.'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

routerUsers.delete("/delete-expense", async (req, res) => {
    try {
        const db = await dbConnect();
        const expensesCollection = db.collection('expenses');

        const { ids = [] } = req.query;

        const result = await expensesCollection.deleteMany({ id: { $in: JSON.parse(ids) } });
        
        res.json({
            message: 'Deleted data successfully.'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = { routerUsers };

