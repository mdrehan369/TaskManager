import Jwt from "jsonwebtoken";
import { userModel } from "../lib/userSchema.js";

export const signupController = async (req, res) => {
	try {
		const { name, email, number, password, username, gender } = req.body;

		const user = await userModel.findOne({
			$or: [{ username }, { number }, { email }]
		});

		if (!user) {
			res.status(401).send("User already registered. Please login");
			return;
		}

		const body = {
			name,
			email,
			number,
			password,
			username,
			gender
		};

		const newUser = new userModel(body);
		await newUser.save();
		let token = Jwt.sign(body, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

		res.status(200).json({ success: true, token });
	} catch (e) {
		res.status(401).send("Please enter valid credentials");
		return;
	}
}