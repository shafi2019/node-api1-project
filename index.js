// implement your API here
const db = require('./data/db.js');

const express = require('express');

const server = express();

server.use(express.json());

server.listen(5000, () => {
    console.log('=== server listening on port 5000 ===');
});

server.get('/', (req, res) => {
    res.send('Hello World..')
})

server.get('/api/users', (req, res) => {
    db.find()
     .then(user => {
         res.status(200).json(user);
     })
     .catch(error => {
         res.status(500).json({ errorMessage: "The users information could not be retrieved", error});
     })
})

server.get('/api/users/:id', (req, res) => {
    db.findById(req.params.id)
     .then(user => {
         if (!user) {
             res.status(404).json({ message: "The user with the specified ID does not exist." })
         } else{
             res.status(200).json(user);
         }
     })
     .catch(error => {
         res.status(500).json({ errorMessage: "The user information could not be retrieved.", error});
     });
});

/*
server.post("/api/users", (req, res) => {
    const { name, bio } = req.body;
    db.insert(req.body)
      .then(data => {
        if (!name || !bio) {
          res.status(400).json({
            errorMessage: "Please provide name and bio for the user." });
        } else {
          res.status(201).json(data);
        }
      })
      .catch(error => {
        res.status(500).json({
          errorMessage: "There was an error while saving the user to the database" });
      });
  });
  */

server.post('/api/users',  (req, res) => {
    const userInfo = req.body;

    db.insert(userInfo)
      .then(user => {
          if (req.body.name === "" || req.body.bio === "") {
              res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
          } else{
              res.status(201).json(user)
          }
      })
      .catch(error => {
          res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
      });
});

server.delete('/api/users/:id', (req, res) => {
    db.remove(req.body.id) 
      .then(user => {
          if(!user) {
              res.status(404).json({ message: "The user with the specified ID does not exist." })
          } else{
              res.status(201).json(user);
          }
      })
      .catch(error => {
          res.status(500).json({ errorMessage: "The user could not be removed" })
      });
});

