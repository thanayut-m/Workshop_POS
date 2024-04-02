module.exports = {
  getToken: (req) => {
    return req.headers.authorization.replace('Bearer ', '');
  },
  isLogin: (req, res, next) => {
    require("dotenv").config();
    const jwt = require('jsonwebtoken');

    if (req.headers.authorization != null) {
      const token = req.headers.authorization.replace('Bearer ', '');
      const secret = process.env.secret;
      
      try {
        const verity = jwt.verify(token, secret);
        if (verity != null) {
          next();
        }
      } catch (e) {
        res.statusCode = 401;
        return res.send("verity fail");
      }
    } else {
      res.statusCode = 401;
      return res.send("authorize fail");
    }
  },
};
