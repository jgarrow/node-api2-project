const express = require("express");

const postRoutes = require("./routes/postRoutes.js");

const server = express();
const baseUrl = "/api";

server.use(express.json());

server.use(`${baseUrl}/posts`, postRoutes);

server.listen(5000, () => {
    console.log("Server listening on port 5000");
});
