import pool from "../config/db_config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"

////////////////////////////////////////// REGISTER

const authRegister = async (req, res) => {
  try {
    const { email, password, name, user_age, user_role } = req.body;

    let foundedUser = await pool.query("select * from email where title = $1", [
      email,
    ]);

    // let hesh = await bcrypt.hash(password, 12)

    // console.log(password);

    if (foundedUser.rows[0]) {
      return res.send("you are already registred");
    }

    const email_value = await pool.query(
      `insert into email(title) values($1) returning *`,
      [email]
    );

    const fonded_id = email_value.rows[0].id;

    await pool.query(
      `insert into users(name, user_age, email_id, password, user_role) values($1, $2, $3, $4, $5)`,
      [name, user_age, fonded_id, password, user_role ? user_role : "user"]
    );

    res.send("users adedd");
  } catch {
    res.send({
      msg: "error",
    });
  }
};

//////////////////////////////////////// LOGIN

const loginAuth = async (req, res) => {
  try {
    const { email, password } = req.body;
    let foundedUser = await pool.query(`SELECT * FROM email WHERE title = $1`, [
      email,
    ]);
    if (!foundedUser.rows.length) {
      return res.send("You are not registered");
    }

    let isCorrectPassword = await pool.query(
      "select * from users where email_id = $1 and password = $2",
      [foundedUser.rows[0].id, password]
    );
    if (!isCorrectPassword)
      return res.send({ message: "You are not registered yet" });
    const token = jwt.sign(
      { email: email, password: password },
      process?.env?.SEKRET_KEY ?? "SIRLI_SO'Z",
      { expiresIn: "3600s" }
    );
    res.send(token);
  } catch (error) {
    res.send(error);
  }
};

export { authRegister, loginAuth };
