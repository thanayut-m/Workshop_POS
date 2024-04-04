const conn = require('../connect');
const { DataType, DataTypes } = require('sequelize');

const ProductModel = conn.define('Product', {
    id: { 
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    barcode: {
        type: DataTypes.STRING(255)
    },
    name: {
        type: DataTypes.STRING(255)
    },
    cost: {
        type: DataTypes.STRING(255)
    },
    price: {
        type: DataTypes.STRING(255)
    },
    detail: {
        type: DataTypes.STRING(255)
    },
    
})


ProductModel.sync({alter: true});
module.exports = ProductModel;