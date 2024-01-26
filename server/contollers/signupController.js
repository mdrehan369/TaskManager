import Jwt from "jsonwebtoken";
import { userModel } from "../lib/userSchema.js";

export const signupController = async (req, res) => {
    try {
      const { name, email, number, password, username, gender } = req.body;
  
      let p1 = await userModel.findOne({ number: number }).exec();
      let p2 = await userModel.findOne({ email: email }).exec();
      let p3 = await userModel.findOne({ username: username }).exec();
  
      if (p1 != null) {
        res.status(401).send("This number is already registered. Please login");
        return;
      }
  
      if (p2 != null) {
        res.status(401).send("This email is already registered. Please login");
        return;
      }
  
      if (p3 != null) {
        res.status(401).send("This username is already taken");
        return;
      }
  
      const body = {
        name: name,
        email: email,
        number: number,
        password: password,
        username: username,
        gender: gender,
      };
  
      const newUser = new userModel(body);
  
      try {
        await newUser.save();
      } catch (e) {
        res.status(401).send("Please enter valid credentials");
        return;
      }
  
      let token = Jwt.sign(body, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
  
      res.status(200).json({ success: true, token });
    } catch (e) {
      res.sendStatus(403);
    }
  }