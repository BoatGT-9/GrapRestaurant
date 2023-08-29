const { restart } = require("nodemon");
const sql = require("./db.sql");
// constructor
const Restaurant = function (restaurant) {
  // atrributes
  this.name = restaurant.name;
  this.type = restaurant.type;
  this.imageURL = restaurant.imageURL;
};
// methods
Restaurant.create = (newRestaurant, result) => {
  //INSERT INTO restaurant SET namr, type , img VALUES ("KFC", "Fastfood","url")
  sql.query("INSERT INTO restaurants SET ?", newRestaurant, (err, res) => {
    // มี error เกิดขึ้น
    if (err) {
      console.log("err", err);
      result(err, null);
      return;
    }
    // ไม่มี error
    console.log("new restaurant created");
    result(null, { id: res.id, ...newRestaurant });
  });
};

Restaurant.getAll = (result) => {
  // select *FROM restaurants
  sql.query("SELECT *FROM restaurants", (err, res) => {
    // มี error เกิดขึ้น
    if (err) {
      console.log("err", err);
      result(err, null);
      return;
    }
    // ไม่มี error
    console.log("get all restaurants");
    result(null, res);
  });
};

// get by id
Restaurant.getById = (restaurantId, result) => {
  // SELECT *From restaurant WHERE id = restaurantID
  sql.query(
    `SELECT *From restaurants WHERE id = ${restaurantId}`,
    (err, res) => {
      // มี error เกิดขึ้น
      if (err) {
        console.log("err", err);
        result(err, null);
        return;
      }
      // ไม่มี error
      console.log("get restaurants by ID");
      if (res.length) {
        result(null, res[0]);
        return;
      }
      //  not-found
      result({ kind: "not-found" }, null);
    }
  );
};

// update by id
Restaurant.updateById = (id, restaurant, result) => {
  //UPDATE restaurants SET name = VALUES ("name","type","imageurl") WHERE id = id;
  sql.query(
    "UPDATE restaurants SET name = ?, type= ? , imageURL=? WHERE id = ?",
    [restaurant.name, restaurant.type, restaurant.imageURL, id],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "Not Found" }, null);

        return;
      }

      result(null, { id: id, ...restaurant });
    }
  );
};

// delete restaurant
Restaurant.deleteById = (restaurantId, result) => {
  // DELETE FROM restaurants WHERE id = 6
  sql.query(
    "DELETE FROM restaurants WHERE id = ?",
    restaurantId,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "Not_found" }, null);
        return;
      }
      // restaurant delete
      console.log("Restaurant id" + restaurantId + "is deleted");
      result(null, res);
    }
  );
};

module.exports = Restaurant;
