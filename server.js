const express = require("express");
const hbs = require("express-handlebars");
const info = require('./models/info');

const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://galina:galina@cluster0.ehnbj.mongodb.net/IT?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const app = express();

var username = "unknown";
var mood = [];

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static("./public"));

app.engine(
  ".hbs",
  hbs({
    extname: "hbs",
    partialsDir: "./views/layouts/",
    layoutsDir: "./views",
    defaultLayout: "index.hbs",
  })
);

app.set("view engine", ".hbs");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home.hbs", {
    username: username,
  });
});


function search(req){
  console.log(req.query.search);
  if(req.query.search == undefined || req.query.search == ''){
    return {}
  }else{
    console.log(req.query.search);
    return {
      Name:new RegExp(req.query.search +'*','i')
    }
  }
}

router.get("/mood", (req, res) => {
  info.find(search(req)).lean().exec((err,data) => {
    console.log(data);
    res.render("inputs.hbs", {
      username: username,
      table: data,
    });
  })

});

router.post("/mood/deleterow",(req,res) => {
  console.log(req.body.id);
  info.deleteOne({_id:req.body.id},(err,data) => {
    console.log(data);
  });
  res.send({status:'reload'});
})

router.get("/youtube", (req, res) => {
  res.render("news.hbs", {
    username: username,
  });
});

router.get("/fourlab", (req, res) => {
  res.render("previusLab.hbs", {
    username: username,
  });
});

router.get("/map", (req, res) => {
  res.render("map.hbs", { username: username });
});

router.post("/user", (req, res) => {
  console.log(req.body.login);
  username = req.body.login;
  res.redirect("/");
});

router.post("/mood", (req, res) => {
  console.log(req.body);
 // mood.push(req.body);
  var i = new info();
  i.Mood = req.body.mood;
  i.Name = req.body.name;
  i.Work = req.body.work;
  i.save();
  res.send({ update: "update" });
});

app.use("/", router);

app.listen(3000, () => console.log("http://localhost:3000"));
