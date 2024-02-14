const express = require('express');
const app = express()
const PackageModel = require('../models/PackageModel');

app.get('/package/list', async (req, res) => {
    try {
        const results = await PackageModel.findAll();
        res.send({results: results});
    } catch (e) {
        res.statusCode(500).send({message: e.message});
    }
})

module.exports = app;