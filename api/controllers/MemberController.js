const express = require("express");
const MemberModel = require("../models/MemberModel");
const app = express();
const jwt = require('jsonwebtoken');
const Server = require("./Server");
const PackageModel = require("../models/PackageModel");
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
    return res.send({message: "not found"});
  } catch (e) { 
    res.statusCode = 500;
    return res.send({message: e});
  }
});

app.get('/member/info' , async (req,res) => {
  try {
    MemberModel.belongsTo(PackageModel);
    
    const payload = jwt.decode(Server.getToken(req));
    const member = await MemberModel.findByPk(payload.id,{
      attributes: ['id','name'],
      include: [
        {model: PackageModel,
          attributes: ['name']}
      ]
    })
    res.send({result: member , message: 'success'});
  } catch (e){
    res.statusCode = 500;
    return res.send({message: e.message});
  }
})



module.exports = app;
