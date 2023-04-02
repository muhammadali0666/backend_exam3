import pool from "../config/db_config.js";

/////////////////////////////////////////////////////// GET

const getCustomers = async (req, res) => {
  try {
    let customers = await pool.query(`select * from customers`);
    res.send(customers.rows);
  } catch {
    res.send("error");
  }
};

////////////////////////////////////////// CREATE

const createCustomers = async (req, res) => {
  try {
    const { user_id, car_id, company_id, created_at } = req.body;

    let foundedUser = await pool.query(
      "select * from customers where created_at = $1",
      [created_at]
    );

    if (!foundedUser.rows[0]) {
      await pool.query(
        `INSERT INTO customers( user_id, car_id, company_id, created_at) VALUES($1, $2, $3, $4)
        `,
        [user_id, car_id, company_id, created_at]
      );
      return res.send("Created customers!");
    }

    res.send("created_at already exists can you insert other created_at!!!!");

  } catch {
    res.send({
      msg: "error",
    });
  }
};

export  { getCustomers, createCustomers }