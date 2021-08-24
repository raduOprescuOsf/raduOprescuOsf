const userServices = require('../services/UserServices');

let session = "";


async function getAuthentification(req, res){
    //console.log(req.body);
    res.render('signIn.ejs', {title: "Alibazon", session: session.userid});

}

async function getSignUp(req, res, next){
    res.render('signUp.ejs', {title: "Alibazon"});
}

async function signUp(req, res, next){
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    if(name.length !== 0 && email.length !== 0 && password.length !== 0){
        const user = await userServices.signUp(name, email, password);
        if(user.user){
            res.render('signIn.ejs', {title: "Alibazon", session: session.userid});
        }else{
            res.send("Invalid user or password");
        }
    }else{
        const err = new Error("Name, email and password required! Bad request!");
        err.status = 400;
        next(err);
    }


}

async function signIn(req, res, next){

    const email = req.body.email;
    const password = req.body.password;
    if(email.length !== 0 && password.length !== 0){
        const user = await userServices.signIn(email, password);
        if(user.user){
            session = req.session;
            session.userid = email;
            req.session.token = user.token;
            console.log(user.token);
            res.redirect('/users/profile');
        }else{
            alert("Invalid email or password!");
            res.send("Invalid user");
        }
    
    }else{
        const err = new Error("Email and password required! Bad request!");
        err.status = 400;
        next(err);
    }


}


async function getProfile(req, res, next) {
    session = req.session;
    if (session.userid) {
        res.render('user.ejs', { title: 'Alibazon', session: session.userid });
    } else {
        res.render('user.ejs', { title: 'Alibazon' });
        res.sendFile('../views/auth', { root: __dirname });
    }
}


function signOut(req, res) {
    req.session.destroy();
    session = "";
    res.redirect('/');
}


module.exports = {
    signUp: signUp,
    signIn: signIn,
    signOut: signOut,
    getAuthentification: getAuthentification,
    getSignUp: getSignUp,
    getProfile: getProfile
  }
  