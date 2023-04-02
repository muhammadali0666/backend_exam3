import pool from "../config/db_config.js";

////////////////////////////////////////// CREATE

const createCar = async (req, res) => {
  try {
    const {
      car_title,
      car_price,
      car_color,
      car_brand,
      created_by,
      company_id,
    } = req.body;

    let result = "qiymat";

    let foundedUser = await pool.query(
      "select * from car where car_title = $1",
      [result]
    );

    if (!foundedUser.rows[0]) {
      await pool.query(
        `INSERT INTO car( car_title, car_price, car_color, car_brand, created_by, company_id) 
        VALUES($1, $2, $3, $4, $5, $6)`,
        [car_title, car_price, car_color, car_brand, created_by, company_id]
      );
      return res.send("Created car!");
    }
    res.send("car_title already exists can you insert other car_title!!!!");
  } catch {
    res.send({
      msg: "error",
    });
  }
};

/////////////////////////////////////////////////////// GET

const getCars = async (req, res) => {
  try {
    let car_list = await pool.query(`select * from car`);
    res.send(car_list.rows);
  } catch {
    res.send("error");
  }
};

/////////////////////////////////////////////////////// UPDATE

const updateCar = async (req, res) => {
  try {
    let {
      car_title,
      car_price,
      car_color,
      car_brand,
      created_by,
      company_id,
      id,
    } = req.body;

    let getOne = await pool.query("select * from car where id = $1", [id]);
    if (!getOne.rows[0]) return res.send("car not found!");

    car_title = car_title ? car_title : getOne.rows[0].car_title;
    car_price = car_price ? car_price : getOne.rows[0].car_price;
    car_color = car_color ? car_color : getOne.rows[0].car_color;
    car_brand = car_brand ? car_brand : getOne.rows[0].car_brand;
    created_by = created_by ? created_by : getOne.rows[0].created_by;
    company_id = company_id ? company_id : getOne.rows[0].company_id;
    await pool.query(
      `update car set car_title = $1, car_price = $2, car_color = $3, car_brand = $4, created_by = $5, company_id = $6 where id = $7
    `,
      [car_title, car_price, car_color, car_brand, created_by, company_id, id]
    );

    res.send("Updated car!!!");
  } catch {
    res.send("error");
  }
};

///////////////////////////////////////////////////////// DELETE

const deleteCar = async (req, res) => {
  try {
    const { id } = req.body;

    let getOne = await pool.query("select * from car where id = $1", [id]);
    if (!getOne.rows[0]) return res.send("User not found!");

    await pool.query(`delete from car where id = $1`, [id]);

    res.send("Deleted car!");
  } catch {
    res.send("error");
  }
};

////////////////////////////////////////////////////////////// GET_ONE

const getCar = async (req, res) => {
  try {
    const { id } = req.params;

    let getOne = await pool.query("select * from car where id = $1", [id]);

    if (!getOne.rows[0]) return res.send("car not found!");

    res.send(getOne.rows);
  } catch {
    res.send("error");
  }
};

export { createCar, deleteCar, updateCar, getCar, getCars };
