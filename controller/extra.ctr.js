import pool from "../config/db_config.js";

/////////////////////////////////////////////////////// GET

const getExtra = async (req, res) => {
  try {
    const { id } = req.params;

    let customers = await pool.query(
    `SELECT u.name, u.user_age, u.email_id, u.password, u.company_id, c.car_id, m.car_title, o.title FROM CUSTOMERS c 
    JOIN users u ON c.user_id = u.id 
    JOIN car m ON m.id = c.car_id
    JOIN company o ON o.id = c.company_id
    WHERE c.user_id = $1`,
      [id]
    );
    res.send(customers.rows);
  } catch {
    res.send("error");
  }
};

const getExtra2 = async (req, res) => {
  try {
    const { id } = req.params;

    let session = await pool.query(
    `SELECT u.name, u.user_age, u.email_id, u.password, u.company_id, s.start_at, s.end_at FROM SESSION s
    JOIN users u ON s.user_id = u.id 
    WHERE s.user_id = $1`,
      [id]
    );
    res.send(session.rows);
  } catch {
    res.send("error");
  }
};

const getExtra3 = async (req, res) => {
  try {
    const { id } = req.params;

    let company = await pool.query(
    `SELECT u.name, u.user_age, u.email_id, u.password, u.company_id FROM users u
    JOIN company c ON u.company_id = c.id 
    WHERE u.company_id = $1`,
      [id]
    );
    res.send(company.rows);
  } catch {
    res.send("error");
  }
};

const getExtra4 = async (req, res) => {
  try {
    const { id } = req.params;

    let car = await pool.query(
      `SELECT c.car_title, c.car_price, c.car_color, c.car_brand, c.created_by, c.company_id FROM car c
    JOIN company o ON o.id = c.company_id
    WHERE c.company_id = $1`,
      [id]
    );
    res.send(car.rows);
  } catch {
    res.send("error");
  }
};

const getExtra5 = async (req, res) => {
  try {
    const { id } = req.params;

    let company = await pool.query(
      `SELECT e.title, c.title, c.email_id, c.address, c.created_by FROM company c
    JOIN email e ON e.id = c.email_id
    WHERE c.email_id = $1`,
      [id]
    );
    res.send(company.rows);
  } catch {
    res.send("error");
  }
};

const getExtra6 = async (req, res) => {
  try {
    const { id } = req.params;

    let company = await pool.query(
      `SELECT c.car_title, o.title FROM car c
    JOIN company o ON c.company_id = o.id
    WHERE o.id = $1`,
      [id]
    );
    res.send(company.rows);
  } catch {
    res.send("error");
  }
};

export { getExtra, getExtra2, getExtra3, getExtra4, getExtra5, getExtra6 };
