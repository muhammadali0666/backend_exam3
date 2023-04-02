import pool from "../config/db_config.js";

/////////////////////////////////////////////////////// GET

const getEmails = async (req, res) => {
  try {
    let customers = await pool.query(`select * from email`);
    res.send(customers.rows);
  } catch {
    res.send("error");
  }
};

////////////////////////////////////////// CREATE

const createEmail = async (req, res) => {
  try {
    const { title } = req.body;

    let result = "qiymat"

    let foundedUser = await pool.query(
      "select * from email where title = $1",
      [result]
    );

    if (!foundedUser.rows[0]) {
      await pool.query(
        `INSERT INTO email( title ) VALUES($1)
        `,
        [title]
      );
      return res.send("Created email!");
    }
    res.send("title already exists can you insert other title!!!!");
  } catch {
    res.send({
      msg: "error",
    });
  }
};

export  { getEmails, createEmail }