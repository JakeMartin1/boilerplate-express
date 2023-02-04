let express = require('express');
let app = express();

console.log("Hello World-fromJake");

//Syntax for routes in Express
//app.METHOD(PATH, HANDLER) 
  //methods: get, post, put, delete are satisfying C.R.U.D. 
  //when a METHOD is passed to a PATH the HANDLER discribes what to do with it

//HANDLER syntax:
/*
function (reg, res) {
  res.send('Response String');
}

(req, res) => {
  res.send('Response String');
}
*/

//serve the string "Hello Express" to GET requests matching / (root path)

// app.get("/", (req, res) => {res.send("Hello Express")});

// app.get("/heading", (req,res) => res.send("<h1>This is a Heading</h1>"))

// app.get("/heading/more_headings", (req,res) => {
//   res.send("<h3 style='color: green'>This is another Heading</h3>")
// });

//serve the index.html file in the views folder to GET requests matching the root path
//use app.sendFile(), which requires an absolute path
//absolutePath = __dirname + realativePath/file.ext

const pathToIndex = __dirname + "/views/index.html";
app.get("/", (req, res) => res.sendFile(pathToIndex));

module.exports = app;
