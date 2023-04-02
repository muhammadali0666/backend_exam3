import { userValidate} from "../validation/user.validation";

module.exports.userValidate = function (req, res, next) {
  try {
    const { error } = userValidate(req.body);
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }
    next();
  } catch {
    res.send({
      msg: "error",
    });
  }
};