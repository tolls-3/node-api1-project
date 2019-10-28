// implement your API here
const express = require("express");
const cors = require("cors");
const db = require("./data/db");
const server = express();
const port = 3000;
server.use(express.json());
server.use(cors());

server.get("/api/users", getUsers);
server.post("/api/users", insertUser);
server.get("/api/users/:id", getUserById);
server.delete("/api/users/:id", deleteById);
server.put("/api/users/:id", updateUser);

function getUsers(req, res) {
  db.find()
    .then(user => {
      //console.log(user);
      res.status(200).json(user);
    })
    .catch(error => {
      //console.log(error);
      res.status(500).json({
        error: "The users information could not be retrieved."
      });
    });
}
function insertUser(req, res) {
  //console.log(req.body);
  const { name, bio } = req.body;
  if (!name || !bio) {
    res.status(400).json({
      errorMessage: "Please provide name and bio for the user."
    });
  } else {
    const user = req.body;
    db.insert(user)
      .then(user => {
        //console.log(user);
        res.status(200).json({
          user,
          message: "Success"
        });
      })
      .catch(error => {
        //console.log(error);
        res.status(500).json({
          error: "There was an error while saving the user to the database"
        });
      });
  }
}

function getUserById(req, res) {
  //console.log(req.params.id)
  const id = req.params.id;
  db.findById(id)
    .then(user => {
      //console.log(user);
      if (!user) {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(error => {
      //console.log(error);
      res.status(500).json({
        error: "The user information could not be retrieved."
      });
    });
}

function deleteById(req, res) {
  //console.log(req.params.id);
  const id = req.params.id;
  db.remove(id)
    .then(user => {
      //console.log(user);
      if (!user) {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
      } else {
        res.status(200).json({
          user,
          message:
            "Success" /**question for justin: why didn't the success message show in insomnia?*/
        });
      }
    })
    .catch(error => {
      //console.log(error);
      res.status(500).json({
        error: "The user could not be removed"
      });
    });
}

function updateUser(req, res) {
  console.log(req.params.id);
  const { name, bio } = req.body;
  if (!name || !bio) {
    res.status(404).json({
      errorMessage: "Please provide name and bio for the user."
    });
  } else {
    const id = req.params.id;
    const user = req.body;
    db.update(id, user)
      .then(user => {
        //console.log(user)
        if (!user) {
          res.status(400).json({
            message: "The user with the specified ID does not exist."
          });
        } else {
        }
        res
          .status(200)
          .json(
            user
          ); /**why did the user property return a number 1? this is not the id, what gives? */
      })
      .catch(error => {
        res.status(500).json({
          error: "The user information could not be modified."
        });
      });
  }
}

server.listen(process.env.PORT || port, () => {
  console.log(`listening on port ${process.env.PORT || port}`);
});
