const express = require("express");
const router = express.Router();
const Restaurant = require("../model/restaurant.model.sql");

// Insert restaurant to database
// http://localhost:5000/restaurants
router.post("/restaurants", (req, res) => {
  const newRestaurant = new Restaurant({
    name: req.body.name,
    type: req.body.type,
    imageURL: req.body.imageURL,
  });
  // insert to DB
  Restaurant.create(newRestaurant, (err, data) => {
    if (err) {
      res.status(500).send({
        messange:
          err.messange ||
          "Som error occured while inserting the new restaurant",
      });
    } else {
      res.send(data);
    }
  });
});

// get all restaurants
router.get("/restaurants", (req, res) => {
  Restaurant.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        messange:
          err.messange ||
          "Som error occured while inserting the new restaurant",
      });
    } else {
      res.send(data);
    }
  });
});

// get by id
// http://localhost:5000/restaurants/1
router.get("/restaurants/:id", (req, res) => {
  const restaurantId = Number.parseInt(req.params.id);
  Restaurant.getById(restaurantId, (err, data) => {
    if (err) {
      if (err.kind === "not-found") {
        res.status(400).send({
          messange: "Restaurant NOT-FOUND with this id " + restaurantId,
        });
      } else {
        res.status(500).send({
          messange:
            err.messange ||
            "Som error occured while inserting the new restaurant",
        });
      }
    } else {
      res.send(data);
    }
  });
});

// up date restaurant
router.put("/restaurants/:id", (req, res) => {
  const restaurantId = Number.parseInt(req.params.id);

  if (req.body.constructor === Object && Object.keys(req.body).lebgth === 0) {
      res.status(400).send({
          message: "Attributes can not be empty ! "
      })
  }

  Restaurant.updateById(restaurantId, new Restaurant(req.body), (err, data) => {
      if (err) {
          if (err.kind === "Not Found") {
              res.status(400).send({
                  message: "Restaurant not found with id " + restaurantId
              })
          }else {
              res.status(500).send({
                  message:
                      err.message ||
                      "Some error occured while inserting the new restaurant",
              });
          }
      }else {
          res.send(data);
      }
  })

})

// delete
router.delete("/restaurant/:id", (req, res) => {
  const restaurantId = Number.parseInt(req.params.id);
  Restaurant.deleteById(restaurantId, (err, data) => {
    if (err) {
      if (err.kind === "not-found") {
        res.status(400).send({
          messange: "Restaurant NOT-FOUND with this id " + restaurantId,
        });
      } else {
        res.status(500).send({
          messange:
            err.messange ||
            "Som error occured while inserting the new restaurant",
        });
      }
    } else {
      res.send({
        messange: " Restaurant id: " + restaurantId + " is deleted",
      });
    }
  });
});

module.exports = router;
