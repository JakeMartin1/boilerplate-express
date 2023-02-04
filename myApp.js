let express = require('express');
let app = express();
require('dotenv').config() // loads environment variables

console.log("Hello World-fromJake");
console.log(process.env.MENU_API_KEY);

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

//serve static assets with app.USE() & express.STATIC()
//ex of static assests: css, stylesheets, imgs, etc
const pathToAssets = __dirname + "/public"; //path on my server
app.use("/public", express.static(pathToAssets)); //specifying ptahs for client requests

app.get("/json", (req,res) => {
  let message = 'hello json';
  let name = 'jake';

  if (process.env.MESSAGE_STYLE == "uppercase") {
    message = message.toUpperCase();
    name = name.toUpperCase();
  }

  const jsonObj = {
    "message": message,
    "name": name,
    "age": 32
  };
  
  res.json(jsonObj)
});




module.exports = app;
