import Jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import { userModel } from "../lib/userSchema.js";

export const loginController = async (req, res) => {
    const { username, password } = req.body;
  
    const user = await userModel.findOne({ username: username }).exec();
  
    if (user == null) {
      res.status(404).send({success: false, message: null});
    } else {
      if (await compare(password, user.password)) {
        let token = Jwt.sign({ user }, process.env.JWT_SECRET_KEY, {
          expiresIn: "1d",
        });
        res.status(200).send({ user, token });
      } else {
        res.status(404).send({success: false, message: "Wrong Password"});
      }
    }
  }