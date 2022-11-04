const express = require('express');
const router = express.Router();
const axios = require("axios");

const HISTORY_URL = "http://linca2highlb-2116519164.ap-southeast-2.elb.amazonaws.com/";
const CURRENT_URL = "http://linca2highlb-2116519164.ap-southeast-2.elb.amazonaws.com/current/";

//Returns current data for id
router.get('/current/:id', async (req, res) => {
    const id = req.params['id'];
    const url = CURRENT_URL + id;

    try {
        const traffic = await axios.get(url);
        res.json({
            results: traffic.data
        })
        console.log(traffic.data)

    } catch (err) {
        if (err.response) {
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if (err.requiest) {
            console.log(err.requiest)
        } else {
            console.error('Error', err.message)
        }
    }
});

//Returns data stored for id
router.get('/history/:id', async (req, res) => {
    const id = req.params['id'];
    const url = HISTORY_URL + id;

    try {
        const traffic = await axios.get(url);
        res.json({
            results: traffic.data
        })
        console.log(traffic.data)

    } catch (err) {
        if (err.response) {
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if (err.requiest) {
            console.log(err.requiest)
        } else {
            console.error('Error', err.message)
        }
    }
});

//Used to display the table on the home page.  Data does not change
router.get('/all', function (req, res, next) {
    const data = require('../webcam_payload_all.json');
    res.json(
        data.features
    );
});

module.exports = router;