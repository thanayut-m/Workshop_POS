const express = require("express");
const MemberModel = require("../models/MemberModel");
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();

app.post('/member/signin', async (req, res) => {
  try {
    const member = await MemberModel.findAll({
      where: {
        phone: req.body.phone,
        password: req.body.password,
      },
    });

    if (member.length > 0) {
      let token = jwt.sign({id: member[0].id}, process.env.secret);
      res.send({ token: token, message: "success" });
    }
    res.statusCode = 401;
    res.send({message: "not found"});
  } catch (e) { 
    res.statusCode = 500;
    res.send({message: e});
  }
});

module.exports = app;
