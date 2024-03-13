const conn = require("../connect");
const { DataType, DataTypes } = require("sequelize");

const MemberModel = conn.define("menber", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  packageId: {
    type: DataTypes.BIGINT,
  },
  name: {
    type: DataTypes.STRING(255),
  },
  phone: {
    type: DataTypes.STRING(255),
  },
});
// MemberModel.sync({alter: true});
module.exports = MemberModel;
