const express = require('express');
const app = express()
const ProductModel = require('../models/ProductModel');
const service = require("./server");

app.post('/product/insert', service.isLogin, async (req,res) => {
    try {
        const result = await ProductModel.create(req.body);
        res.send({result: result , message: 'success'});
    } catch (e) {
        res.statusCode = 500 ;
        return res.send({message: e.message});
    }
})

app.get('/product/list', service.isLogin ,async (req,res) => {
    try {
        const results = await ProductModel.findAll({
            order: [['id','DESC']]
        });
        res.send({results: results , message: 'success'});
    } catch (e) {
        res.statusCode = 500 ;
        return res.send({message: e.message});
    }
})

app.delete('/product/delete/:id', service.isLogin,async(req,res) => {
    try {
        const result = await ProductModel.destroy({
            where: {
                id: req.params.id
            }
        })

        res.send({result: result, message: 'success'})
    } catch (e) {
        res.statusCode = 500 ;
        return res.send({message: e.message});
    }
})

app.post('/product/update' ,service.isLogin,async(req,res) => {
    try {
        const result = await ProductModel.update(req.body, {
            where: {
                id: req.body.id
            }
        })
        
        res.send({result: result, message: 'success'})
    }catch (e) {
        res.statusCode = 500 ;
        return res.send({message: e.message});
    }
})

module.exports = app;