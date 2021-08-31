const app = require('express')();
const sessions = require('express-session');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
var logger = require('morgan');

// import express from "express";
// import * as Sentry from "@sentry/node";

const defaultRoutes = require('./routes/DefaultRoutes');
const UserRoutes = require('./routes/UserRoutes');
const cartRoutes = require('./routes/CartRoutes');
const wishlistRoutes = require('./routes/WishlistRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(sessions({
  secret: "$2a$08$ZlZQAmpSHsaFFKcdnkDpCugCICxR/DnMCehnaoE5OfXfxVcyJ4FNu",
  saveUninitialized:true,
  cookie: { maxAge: 1000000000000000 },
  resave: false 
}));

app.use('/', defaultRoutes);
app.use('/users', UserRoutes);
app.use('/cart', cartRoutes);
app.use('/wishlist', wishlistRoutes);


// Sentry.init({ dsn: "https://<key>@sentry.io/<project>" });

// // The request handler must be the first middleware on the app
// app.use(Sentry.Handlers.requestHandler());

// // All controllers should live here
// app.get("/", function rootHandler(req, res) {
//   res.end("Hello world!");
// });

// // The error handler must be before any other error middleware and after all controllers
// app.use(Sentry.Handlers.errorHandler());

// // Optional fallthrough error handler
// app.use(function onError(err, req, res, next) {
//   // The error id is attached to `res.sentry` to be returned
//   // and optionally displayed to the user for support.
//   res.statusCode = 500;
//   res.end(res.sentry + " ");
// });


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});

module.exports = app;