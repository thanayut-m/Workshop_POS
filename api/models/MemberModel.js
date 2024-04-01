const conn = require("../connect");
const { DataType, DataTypes } = require("sequelize");
const MemberModel = conn.define("member", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  packageId: {
    type: DataTypes.BIGINT,
  },
  username: {
    type: DataTypes.STRING(255),
  },
  name: {
    type: DataTypes.STRING(255),
  },
  phone: {
    type: DataTypes.STRING(255),
  },
  password: {
    type: DataTypes.STRING(255),
  }
});
MemberModel.sync({alter: true});
module.exports = MemberModel;
