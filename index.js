const express = require('express');
const hbs = require('hbs');
const path = require('path')
const router = require("./routes/routes");
const session = require('express-session')
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge:300000 }

}))

hbs.registerPartials(__dirname + '/views/partials');
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use("/", router);


app.listen(process.env.PORT || 8080, ()=>{
  console.log(`escuchando en puerto ${process.env.PORT}`)
});