const axios = require('axios');



const RestAPIURL = "https://osf-digital-backend-academy.herokuapp.com/api/";
const secretKey ="$2a$08$ZlZQAmpSHsaFFKcdnkDpCugCICxR/DnMCehnaoE5OfXfxVcyJ4FNu";

async function signUp(name, email, password){
    const URL = `${RestAPIURL}auth/signup`;
    
    const user = {
        "name": name,
        "email": email,
        "password": password,
        "secretKey": secretKey
    };
    //var jsonParser = bodyParser.json(user);
    try{
        const res = await axios.post(URL, user);
        return res.data;  
    }catch(err){
        console.log(err);
    }

}

async function signIn(email, password){

    const URL = `${RestAPIURL}auth/signin`;
    const user = {
        "email": email,
        "password": password,
        "secretKey": secretKey
    };
    //var jsonParser = bodyParser.json(user);
    try{
        const res = await axios.post(URL, user);
        return res.data; 
    }catch(err){
        console.log(err);
    }

}

module.exports = {
    signUp: signUp,
    signIn: signIn
}
  