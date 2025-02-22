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

app.use(logMiddleware); 
//want middleware to log regardless of request method

//need this to come first because it needs to apply to all requests

//serve static assets with app.USE() & express.STATIC()
//ex of static assests: css, stylesheets, imgs, etc
const pathToAssets = __dirname + "/public"; //path on my server
app.use("/public", express.static(pathToAssets)); //specifying paths for client requests



const pathToIndex = __dirname + "/views/index.html";
app.get("/", (req, res) => res.sendFile(pathToIndex));

const pathToAbout = __dirname + "/views/about.html";
app.get("/about", (req, res) => res.sendFile(pathToAbout));

const pathToContact = __dirname + "/views/contact.html";
app.get("/contact", (req, res) => res.sendFile(pathToContact));

app.get("/redorblue", (req, res) => {
  let rbcolor;
  
  if (process.env.VGCOLOR == "red") {
    rbcolor = __dirname + "/views/red.html"
  } 
  else if (process.env.VGCOLOR == "blue") {
    rbcolor = __dirname + "/views/blue.html";
  } 
  else {
    res.send("404 page not found") 
    return 
  }
  res.sendFile(rbcolor)
});


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

//authentication snytax
app.get("/users/:username" , authMiddleware , (req,res) => {
  const username = req.params.username;
  res.send(`Hello, ${username}!`);
});

//use a middleware function to find the current date and time 
//when a get request is made to the route now 
//and send the time as a json object in the response
app.get( "/now", timeMidWare, (req,res) => {
  res.json({time: req.time})
  console.log(req.time);
});

//eget route parameter input
//path ex: /user/:userID/book/:bookID -> user/codydf/book'3412
//req.params: {userID: "codydf", bookID: "3412"}

//handle GET 
//request to the route /:word/echo
//respond with a json object {echo: word}
app.get( "/:word/echo", (req,res) => res.json({echo: req.params.word}));

//handle GET
//request through the route user/:userID/book/:bookID
//send both params in the response as a json object
app.get( '/user/:userID/book/:bookID' , (req,res) => {
  res.json({
    user: req.params.userID , 
    book: req.params.bookID
  });
});

//GET query parameter input
//route: /name
//actual url entered: /name?first=Cody&last=Feldhaus
//? signifies when the query parameters start
//& signifies an additional query parameter

app.get("/name" , (req,res) => {
  res.json({
    name: `${req.query.first} ${req.query.middle.charAt(0)} ${req.query.last}`
  })
})


//middleware snytax
/* 
req = request object ; res = response object ; next = the next
function in the middleware pipeline
function someMiddleware(req, res, next) {
  //some code that does stuff
  next();
}

*/
//middleware logger
//log message to console for every request
//format: "{method} {path} - {ip}"
//access using req.ethod, req.path & req.ip


function logMiddleware( req , res , next ) {
  console.log(`${req.method} request was made to ${req.path} by IP: ${req.ip}`)
  next();
};

//authentication middleware
function authMiddleware(req,res,next) {
  const token = req.header("Authorization");
  // if (token == "secret-token") {
  if ( 5 == 5){
    next();
  } else {
    res.status(401).send("Unauthorized")
  };
};

function timeMidWare(req,res,next) {
  req.time = new Date().toString();
  next();
};


module.exports = app;
