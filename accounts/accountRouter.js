const express = require('express');

// database access using knex
const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
//list of posts
//select from posts
// database operations return a promise
db.select('*')
.from('accounts')
.then( posts=> {
res.status(200).json(posts)
})
.catch( error => {
    console.log(error);

    res.status(500).json({ error: "failed to get list"})
});
})

router.get('/:id', (req, res) => {
//a post by its id

db('accounts')
.where({id: req.params.id})
.first() //grab the first item on a returned array
.then( posts=> {
    res.status(200).json(posts)
    })
    .catch( error => {
        console.log(error);
    
        res.status(500).json({ error: "failed to get list"})
    });
    })


router.post('/', (req, res) => {
    //add a post
    //insert into posts () values ()
    db("accounts").insert(req.body, "id") //will generate a warning on console when using sqlite ignore it
    .then(ids => {
        res.status(201).json(ids)
    })
    .catch( error => {
        console.log(error);
    
        res.status(500).json({ error: "failed to get add post"})
    });
});

router.put('/:id', (req, res) => {
    //update a post
    const id = req.params.id
    const changes = req.body
    db("accounts")
    .where({ id }) //remember to filter or all records will be updated
    .update(changes) 
    .then(count => {
        res.status(201).json(count)
    })
    .catch( error => {
        console.log(error);
    
        res.status(500).json({ error: "failed to update"})
});
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    db("accounts")
    .where({ id }) //remember to filter or all records will be updated
    .del() 
    .then(count => {
        res.status(201).json(count)
    })
    .catch( error => {
        console.log(error);
    
        res.status(500).json({ error: "failed to delete"})
});
});

module.exports = router;