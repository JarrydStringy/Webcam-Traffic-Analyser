const express = require('express');
const router = express.Router();
const axios = require("axios");

const HISTORY_URL = "http://linca2highlb-2116519164.ap-southeast-2.elb.amazonaws.com/";
const CURRENT_URL = "http://linca2highlb-2116519164.ap-southeast-2.elb.amazonaws.com/current/";
const id = 1;

router.get('/current', async (req, res) => {
    const url = CURRENT_URL + id;
    try {
        const traffic = await axios.get(url)

        res.json({
            results: traffic.data
        })
        console.log(traffic)
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

router.get('/', async (req, res) => {
    const url = HISTORY_URL + id;
    try {
        const traffic = await axios.get(url)

        res.json({
            results: traffic.data
        })
        console.log(traffic)
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

module.exports = router;