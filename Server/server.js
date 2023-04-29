const express = require("express");

const app = express();
var cors = require("cors");
require("dotenv").config({ path: "./config/.env" });
PORT = process.env.port || 6000;

const connectToDB = require("./config/DataBase");
const {
  postThought,
  getAllThoughts,
  deleteThought,
} = require("./controllers/thoughtControllers");

app.use(cors());
app.use(express.json());

connectToDB();

/**
 * @route POST /Thought/add
 * @description add new Thought
 * @access public
 */
app.post("/Thought/add", postThought);

/**
 * @route get /Thought/
 * @description get all thoughts
 * @access public
 */
app.get("/Thought/", getAllThoughts);

/**
 * @route delete /Thought/delete
 * @description delete  thought
 * @access protected(password)
 */

app.delete("/Thought/delete/:thoughtID", deleteThought);

app.listen(PORT, (e) =>
  e ? console.log(e.message) : console.log(`Server is running on port ${PORT}`)
);
