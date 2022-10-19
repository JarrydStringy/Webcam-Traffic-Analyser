const express = require('express');
const router = express.Router();
const data = require('../../webcam_payload.json');

router.get('/', function (req, res, next) {
    res.json(data);
});

module.exports = router;
