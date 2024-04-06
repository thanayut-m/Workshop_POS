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


// ชื่อสินค้า => nameProduct
// รูปสินค้า =>
// ราคาขาย => price
// ราคาต้นทุน => cost
// stock => stockProduct
// Baecode
// detail


// id: { 
//     type: DataTypes.BIGINT,
//     primaryKey: true,
//     autoIncrement: true
// },
// barcode: {
//     type: DataTypes.STRING(255)
// },
// nameProduct: {
//     type: DataTypes.STRING(255)
// },
// cost: {
//     type: DataTypes.STRING(255)
// },
// price: {
//     type: DataTypes.STRING(255)
// },
// detail: {
//     type: DataTypes.STRING(255)
// },
// stockProduct: {
//     type: DataTypes.STRING(255)
// },