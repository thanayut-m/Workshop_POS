const express = require("express");
const MemberModel = require("../models/MemberModel");
const app = express();

app.post('/member/signin', async (req, res) => {
  try {
    const member = await MemberModel.findAll({
      where: {
        phone: req.body.phone,
        password: req.body.password,
      },
    });

    if (member.length > 0) {
      res.send({ id: member[0].id, message: "success" });
    }
    res.send({status: 401, message: "not found" });
  } catch (e) {
    res.send({status: 500, message: e.message });
  }
});

module.exports = app;
