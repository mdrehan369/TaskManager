import Jwt from "jsonwebtoken";

export const checkToken = (req, res, next) => {
    try {
      const header = req.headers["authorization"];
  
      if (typeof header !== "undefined") {
        const bearer = header.split(" ");
        const token = bearer[1];
  
        const decode = Jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decode;
        next();
      } else {
        res.sendStatus(403);
      }
    } catch (e) {
      res.sendStatus(403);
    }
  };