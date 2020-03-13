const express = require("express");
const posts = require("../data/db.js");
const router = express.Router();

router.get("/", (req, res) => {
    posts
        .find()
        .then(arr => {
            res.status(200).json(arr);
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                errorMessage: "Error retrieving posts"
            });
        });
});

module.exports = router;
