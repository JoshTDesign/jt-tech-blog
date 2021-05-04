const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
// const path = require('path');

const sequelize = require("./config/connection")
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const bcrypt = require("bcrypt");


const User = require("./models/User")
const Article = require("./models/Article")
const Comment = require("./models/Comment")
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;




// const sess = {
//   secret: 'tacocat',
//   cookie: {},
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize
//   })
// };

const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session(
  {
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    store: new SequelizeStore({
      db: sequelize,
    }),
  }
));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middleware allowing users to access client-side files
app.use(express.static('public'));

// app.get("/addone",(req, res) => {
//   if(req.session.count){
//     req.session.count += 1
//   } else {
//   req.session.count = 1;
//   }
//   res.send('added one!');
// });














app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});