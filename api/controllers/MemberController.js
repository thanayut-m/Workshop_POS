const express = require("express");
const MemberModel = require("../models/MemberModel");
const app = express();
const jwt = require("jsonwebtoken");
const service = require("./server");
const PackageModel = require("../models/PackageModel");
require("dotenv").config();

app.post("/member/signin", async (req, res) => {
  try {
    const member = await MemberModel.findAll({
      where: {
        phone: req.body.phone,
        password: req.body.password,
      },
    });

    if (member.length > 0) {
      let token = jwt.sign({ id: member[0].id }, process.env.secret);
      res.send({ token: token, message: "success" });
    } else {
      res.statusCode = 401;
      res.send({ message: "not found" });
    }
  } catch (e) {
    res.statusCode = 500;
    return res.send({ message: e.message });
  }
});

app.get("/member/info", service.isLogin, async (req, res) => {
  try {
    MemberModel.belongsTo(PackageModel);
    const payload = jwt.decode(service.getToken(req));
    const member = await MemberModel.findByPk(payload.id, {
      attributes: ["id", "name"],
      include: [{ model: PackageModel, attributes: ["name"] }],
    });
    res.send({ result: member, message: "success" });
  } catch (e) {
    res.statusCode = 500;
    return res.send({ message: e.message });
  }
});

app.put('/member/changeProfile', service.isLogin, async(req,res ) => {
  try {
    const memberId = service.getMemberId(req);
    const payload = {
      name : req.body.memberName
    }
    const result = await MemberModel.update(payload , {
      where: {
        id: memberId
      }
    });
    res.send({message: 'success' , result: result});
  } catch (e) {
    res.statusCode = 500;
    return res.send({message: e.message});
  }
})

module.exports = app;
