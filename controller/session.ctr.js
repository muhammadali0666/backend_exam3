import pool from "../config/db_config.js";

/////////////////////////////////////////////////////// GET

const getSession = async (req, res) => {
  try {
    let session = await pool.query(`select * from session`);
    res.send(session.rows);
  } catch {
    res.send("error");
  }
};

////////////////////////////////////////// CREATE

const createSession = async (req, res) => {
  try {
    const { user_id } = req.body;

    let result = "qiymat"

    let foundedUser = await pool.query(
      "select * from session where user_id = $1",
      [result]
    );

    if (!foundedUser.rows[0]) {
      await pool.query(
        `INSERT INTO session( user_id ) VALUES($1)
        `,
        [user_id]
      );
      return res.send("Created session!");
    }
    res.send("user_id already exists can you insert other user_id!!!!");
  } catch {
    res.send({
      msg: "error",
    });
  }
};

/////////////////////////////////////////////////////// UPDATE

const updateSession = async (req, res) => {
  try {
    let { id, user_id, start_at, end_at } = req.body;

    let getOne = await pool.query("select * from session where id = $1", [id]);
    if (!getOne.rows[0]) return res.send("session not found!");

    user_id = user_id ? user_id : getOne.rows[0].user_id;
    start_at = start_at ? start_at : getOne.rows[0].start_at;
    end_at = end_at ? end_at : getOne.rows[0].end_at;
    await pool.query(
      `update session set user_id = $1, start_at = $2, end_at = $3 where id = $4
    `,
      [user_id, start_at, end_at, id]
    );

    res.send("Updated session!!!");
  } catch {
    res.send("error");
  }
};


export  { getSession, createSession, updateSession }