require("dotenv").config();

const express = require("express");
const port = process.env.PORT;
const postRoutes = require("./routes/postRoutes.js");

const server = express();
const baseUrl = "/api";

server.use(express.json());

server.use(`${baseUrl}/posts`, postRoutes);

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
