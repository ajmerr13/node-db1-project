const express = require('express');
const accountRouter = require('./accounts/accountRouter')

const server = express();

server.use(express.json());
server.use('/api/accounts', accountRouter) //import router into server.

server.get('/', (req, res) => {
    return res.send('<h2> Welcome to the server!</h2>')
})

server.use((err, req, res, next) => {
    console.log(err)
    return res.status(500).json({ message: 'Something is wrong' })
})

module.exports = server; 