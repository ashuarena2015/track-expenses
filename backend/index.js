// const fs  = require('fs');
// const http = require('http');
// const url = require('url');

// const server = http.createServer((req, res) => {

//     const pathName = req.url;

//     if(pathName === '/dashboard') {
//         res.end('This is dashboard');
//     } else if(pathName === '/users') {
        
//         fs.readFile(`./data/users.json`, 'utf-8', (err, data) => {
//             const usersData = data;
//             res.writeHead(200, { 'Content-type': 'application/json', 'Access-Control-Allow-Origin': "*" });
//             // res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//             // res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");});
//             res.end(usersData);
//         })

//     } else {
//         res.end('This is normal pages.');
//     }
// })

// server.listen('3001', '127.0.0.1', () => {
//     console.log('Listening from server!');
// })

const express = require('express');
const app = express();
const cors = require('cors');
const { routerUsers } = require('./routes/users');
const cookieParser = require('cookie-parser')

app.use(cors(
    {
        origin: "http://localhost:3000", // React frontend URL
        credentials: true, // Allow cookies
    }
));

const port = 3001;

app.use(express.json());
app.use(cookieParser());

app.use('/api/user', routerUsers);

app.listen(port, () => {
    console.log('Listening on 3001');
});