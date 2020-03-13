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

router.get("/:id", (req, res) => {
    const { id } = req.params;

    posts
        .findById(id)
        .then(requestedPost => {
            requestedPost.length === 0
                ? res.status(404).json({
                      success: false,
                      errorMessage: "The requested post was not found"
                  })
                : res.status(200).json(requestedPost);
        })
        .catch(err => {
            res.status(500).json({
                succes: false,
                errorMessage: "Error retrieving post"
            });
        });
});

router.post("/", (req, res) => {
    const comment = req.body;
    console.log("comment: ", comment);

    if (!comment.title || !comment.contents) {
        res.status(400).json({
            success: false,
            errorMessage: "Please provide title and contents for the post"
        });
    } else {
        posts
            .insert(comment)
            .then(response => {
                console.log("insert res: ", response);
                console.log(
                    ("{ ...comment, id: res.id }", { ...comment, id: res.id })
                );

                if (response.id) {
                    res.status(201).json({ ...comment, id: response.id });
                } else {
                    res.status(500).json({
                        success: false,
                        errorMessage:
                            "There was an error while saving the post to the database"
                    });
                }
            })
            .catch(err => {
                res.status(500).json({
                    success: false,
                    error: err,
                    errorMessage:
                        "There was an error while saving the post to the database"
                });
            });
    }
});

module.exports = router;
