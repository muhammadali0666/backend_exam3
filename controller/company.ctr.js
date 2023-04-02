import pool from "../config/db_config.js";

////////////////////////////////////////// CREATE

const createCompany = async (req, res) => {
  
   try{
    const { title, email_id, address, created_by} = req.body;
    let result = "qiymat"

    let foundedUser = await pool.query(
      "select * from company where address = $1",
      [result]
    );

    if (!foundedUser.rows[0]) {
      await pool.query(
        `INSERT INTO company( title, email_id, address, created_by) VALUES($1, $2, $3, $4)
        `,
        [title, email_id, address, created_by]
      );
      return res.send("Created company!");
    }
    res.send("address already exists can you insert other address!!!!");

   }
   catch{
     res.send({
       msg: "error",
     });
   }
  
};

/////////////////////////////////////////////////////// GET

const getCompanies = async (req, res) => {
  try {
    let company_list = await pool.query(`select * from company`);
    res.send(company_list.rows);
  } catch {
    res.send("error");
  }
};

/////////////////////////////////////////////////////// UPDATE

const updateCompany = async (req, res) => {
  try {
    let { id, title, email_id, address, created_by } = req.body;

    let getOne = await pool.query("select * from company where id = $1", [id]);
    if (!getOne.rows[0]) return res.send("User not found!");

    title = title ? title : getOne.rows[0].title;
    email_id = email_id ? email_id : getOne.rows[0].email_id;
    address = address ? address : getOne.rows[0].address;
    created_by = created_by ? created_by : getOne.rows[0].created_by;
    await pool.query(
      `update company set title = $1, email_id = $2, address = $3, created_by = $4 where id = $5
    `,
      [title, email_id, address, created_by, id]
    );

    res.send("Updated user!!!");
  } catch {
    res.send({
      msg: "error"
    });
  }
};

///////////////////////////////////////////////////////// DELETE

const deleteCompany = async (req, res) => {

try{
  const { id } = req.body;

  let getOne = await pool.query("select * from company where id = $1", [id]);
  if (!getOne.rows[0]) return res.send("User not found!");

  await pool.query(`delete from company where id = $1`, [id]);

  res.send("Deleted user!");
}
catch{
  res.send({
    msg: "error"
  });
}

  
};

////////////////////////////////////////////////////////////// GET_ONE

const getCompany = async (req, res) => {
 try{
  const { id } = req.params;

  let getOne = await pool.query("select * from company where id = $1", [id]);

  if (!getOne.rows[0]) return res.send("company not found!");

  res.send(getOne.rows);
 }
 catch{
   res.send({
    msg: "error"
   });
 }

};

export { createCompany, deleteCompany, updateCompany, getCompany, getCompanies };
