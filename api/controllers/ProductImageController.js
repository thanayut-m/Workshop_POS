const express = require('express');
const app = express()
const ProductImageModel = require('../models/ProductImageModel');
const service = require("./server");

app.post('productImage/insert' , service.isLogin, async (req,res) => {
    try {

    } catch (e) {
        res.statusCode = 500;
        return res.send({message: e.message})
    }
})

app.get('productImage/list/:productId' , service.isLogin, async (req,res) => {
    try {

    } catch (e) {
        res.statusCode = 500;
        return res.send({message: e.message})
    }
})

app.delete('productImage/delete/:id' , service.isLogin, async (req,res) => {
    try {

    } catch (e) {
        res.statusCode = 500;
        return res.send({message: e.message})
    }
})

module.exports = app;

