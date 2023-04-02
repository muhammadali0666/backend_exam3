import jwt from "jsonwebtoken";
export const roleMiddleware = function (req, res, next) {
  try {
    const token = req.headers.token;
    // console.log(token, "token");
    try {
      jwt.verify(
        String(token),
        process.env.SEKRET_KEY,
        function (err, payload) {
          if (err) return res.send({ message: "You got wrong password" });
          return payload;
        }
      )
    } catch (error) {
      return res.send('wrong password')
    }
    next();
  } catch {
    res.send({
      msg: "error",
    })
  }
};
