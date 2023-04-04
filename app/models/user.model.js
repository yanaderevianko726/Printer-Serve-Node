const sql = require("./db.js");
const tb_name = 'users';

// constructor
const User = function(user) {
  this.title = user.title;
  this.description = user.description;
  this.published = user.published;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO " + tb_name + " SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { userId: res.insertId, ...newUser });
    result(null, { userId: res.insertId, ...newUser });
  });
};

User.findById = (userId, result) => {
  sql.query("SELECT * FROM " + tb_name + " WHERE userId = ${userId}", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.getAll = (title, result) => {
  let query = "SELECT * FROM " + tb_name;

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

User.getAllPublished = result => {
  sql.query("SELECT * FROM " + tb_name + " WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

User.updateById = (userId, user, result) => {
  sql.query(
    "UPDATE " + tb_name + " SET title = ?, description = ?, published = ? WHERE userId = ?",
    [user.title, user.description, user.published, userId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { userId: userId, ...user });
      result(null, { userId: userId, ...user });
    }
  );
};

User.remove = (userId, result) => {
  sql.query("DELETE FROM " + tb_name + " WHERE userId = ?", userId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the userId
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with userId: ", userId);
    result(null, res);
  });
};

User.removeAll = result => {
  sql.query("DELETE FROM " + tb_name, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

module.exports = User;
