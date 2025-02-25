const express = require('express');
const fs = require('fs');
const { dbConnect } = require('../dbConnection');
console.log({dbConnect});
const routerUsers = express.Router();

routerUsers.get('/', (req, res) => {
    console.log('sadasd');
    const limit = parseInt(req?.query?.limit);
    const offset = parseInt(req?.query?.offset);
    fs.readFile('./data/users.json', '', (err, data) => {
        const usersData = JSON.parse(data);
        res.send(usersData.slice(offset, limit + offset));
    })
})

routerUsers.get('/insert', async (req, res) => {
    const db = await dbConnect();
    const userCollection = db.collection('users');
    const userInfo = req.params.userInfo;
    console.log({userInfo});
    
})

routerUsers.get('/:id', (req, res) => {
    const userId = JSON.parse(req.params.id);
    console.log({userId});
    fs.readFile('./data/users.json', '', (err, data) => {
        const usersData = JSON.parse(data);
        console.log('user details', usersData.filter(x => x.id === userId));
        res.send(usersData.filter(x => x.id === userId));
    })
})

module.exports = { routerUsers };

