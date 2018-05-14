const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const fs = require("fs");

app.use(bodyParser.json());

app.get("/hello", function(req, res){
  res.send("Hello!")
})
// - Create route for creating new users
app.post("/create", function(req, res){
  let newUser = req.body;
  let strCurrArr = fs.readFileSync("./storage.json", "utf8");
  let currArr = JSON.parse(strCurrArr);
  currArr.push(newUser);
  fs.writeFileSync("./storage.json", JSON.stringify(currArr));
  res.send("posted!");
})
// - Get route for getting all users
app.get("/view", function(req, res){
  let strCurrArr = fs.readFileSync("./storage.json", "utf8");
  let currArr = JSON.parse(strCurrArr);
  res.send(strCurrArr);
})
// - Get route for getting a user by name
app.get("/view/:name", function(req, res){
  let strCurrArr = fs.readFileSync("./storage.json", "utf8");
  let currArr = JSON.parse(strCurrArr);
  let foundUser = currArr.filter(item=>item.name === req.params.name);
  res.json(foundUser[0]);
})
// - Update route for updating a user by name
app.patch("/update/:name", function(req, res){
  let strCurrArr = fs.readFileSync("./storage.json", "utf8");
  let currArr = JSON.parse(strCurrArr);
  let updatedData = currArr.map((item)=>{
    if(item.name === req.params.name){
      return req.body;
    }else{
      return item;
    }
  });
  fs.writeFileSync("./storage.json", JSON.stringify(updatedData));
  res.send("Update Data");
})
// - Delete route for deleting a user by name
app.delete("/delete/:name", function(req, res){
  let strCurrArr = fs.readFileSync("./storage.json", "utf8");
  let currArr = JSON.parse(strCurrArr);
  let filteredData = currArr.filter((item)=>{
    return item.name !== req.params.naame
  })
  fs.writeFileSync("./storage.json", JSON.stringify(filteredData));
  res.send("deleted!");

})

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
