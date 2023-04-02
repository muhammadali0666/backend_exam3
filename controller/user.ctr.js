import pool from "../config/db_config.js";

////////////////////////////////////////// CREATE

const createUser = async (req, res) => {
  try {
    const { name, password, email_id, user_age, user_role } = req.body;

    let result = "qiymat12"
    let foundedUser = await pool.query(
      "select * from users where email_id = $1",
      [email_id]
    );

    if (!foundedUser.rows[0]) {
      await pool.query(
        `INSERT INTO users( name, password, email_id, user_age, user_role) VALUES($1, $2, $3, $4, $5)
        `,
        [name, password, email_id, user_age, user_role]
      );
      return res.send("Created users!");
    }
    res.send("User already exists can you insert other email_id!!!!");
    } catch {
      res.send({
        msg: "error",
      });
    }
  };
  
/////////////////////////////////////////////////////// GET

const getUsers = async (req, res) => {
  try {
    let user_list = await pool.query(`select * from users`);
    res.send(user_list.rows);
  } catch {
    res.send("error");
  }
};

/////////////////////////////////////////////////////// UPDATE

const updateUser = async (req, res) => {
  try {
    let { id, name, email_id, password, user_age } = req.body;

    let getOne = await pool.query("select * from users where id = $1", [id]);
    if (!getOne.rows[0]) return res.send("User not found!");

    name = name ? name : getOne.rows[0].name;
    email_id = email_id ? email_id : getOne.rows[0].email_id;
    password = password ? password : getOne.rows[0].password;
    user_age = user_age ? user_age : getOne.rows[0].user_age;
    await pool.query(
      `update users set name = $1, email_id = $2, password = $3, user_age = $4 where id = $5
    `,
      [name, email_id, password, user_age, id]
    );

    res.send("Updated user!!!");
  } catch {
    res.send("error");
  }
};

///////////////////////////////////////////////////////// DELETE

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;

    let getOne = await pool.query("select * from users where id = $1", [id]);
    if (!getOne.rows[0]) return res.send("User not found!");

    await pool.query(`delete from users where id = $1`, [id]);

    res.send("Deleted user!");
  } catch {
    res.send("error");
  }
};

////////////////////////////////////////////////////////////// GET_ONE

const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    let getOne = await pool.query("select * from users where id = $1", [id]);

    if (!getOne.rows[0]) return res.send("user not found!");

    res.send(getOne.rows);
  } catch {
    res.send("error");
  }
};

export { createUser, deleteUser, updateUser, getUser, getUsers };
