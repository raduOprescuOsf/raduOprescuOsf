const app = require('express')();
const sessions = require('express-session');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const defaultRoutes = require('./routes/DefaultRoutes');
const UserRoutes = require('./routes/UserRoutes');
const cartRoutes = require('./routes/CartRoutes');


app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const time = 86400000;
app.use(sessions({
  secret: "$2a$08$ZlZQAmpSHsaFFKcdnkDpCugCICxR/DnMCehnaoE5OfXfxVcyJ4FNu",
  saveUninitialized:true,
  cookie: { maxAge: time },
  resave: false 
}));

app.use('/', defaultRoutes);
app.use('/users', UserRoutes);
//app.use('/cart', cartRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});

module.exports = app;