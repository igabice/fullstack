const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys')
require('./models/User');
require('./services/passport');


mongoose.connect(keys.mongoURI, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection; 

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
)
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

app.get('/', (req, res)=>{
    res.send({hi: 'there'})
});


const PORT = process.env.PORT || 5000;
app.listen(PORT);

//"scripts" : { "start": "node index.js"  },