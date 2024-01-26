import Jwt from "jsonwebtoken";

export const getUserController = (req, res) => {
    const header = req.headers["authorization"];
    let token = header.split(" ")[1];
    Jwt.verify(token, process.env.JWT_SECRET_KEY, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.status(200).json({
          message: "Success",
          data,
        });
      }
    });
  }