const express = require("express");
const router = express.Router();
const fs = require('fs');

router.get(
    "/data",
    (req, res) => {
        let rawdata = fs.readFileSync('config.json');
        let data = JSON.parse(rawdata);
        res.send(data);
    }
);

router.post(
    "/save",
    async (req, res) => {
        if (req.body.credentials.username == process.env.ADMINUSER && req.body.credentials.password == process.env.ADMINPASS) {
            let configData = JSON.stringify(req.body.config);
            fs.writeFileSync('config.json', configData);
            res.send({ "success": true });
        }
        else res.send({ "success": false });
    }
);

module.exports = router;