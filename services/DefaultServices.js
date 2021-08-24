const axios = require('axios');

const RestAPIURL = "https://osf-digital-backend-academy.herokuapp.com/api/";
const secretKey ="$2a$08$ZlZQAmpSHsaFFKcdnkDpCugCICxR/DnMCehnaoE5OfXfxVcyJ4FNu";

/* GET home page
we are not passing the function any argument since it is not depending to any
*/
async function getHome(){
    const URL = `${RestAPIURL}/categories/parent/root?secretKey=${secretKey}`;
    const res = await axios.get(URL);
    return res.data;
}

/* GET gender pages depending(men or a woman)
this function will require a parameter to know the gender the person will search products for
*/

async function getGender(gender){
    const URL = `${RestAPIURL}/categories/parent/${gender}?secretKey=${secretKey}`;
    const res = await axios.get(URL);
    return res.data;
}

/* GET categories depending on the parent id
this function will use the parent_id)
*/

async function getCategories(parent_id){
    const URL = `${RestAPIURL}/categories/parent/${parent_id}?secretKey=${secretKey}`;
    const res = await axios.get(URL);
    return res.data;
}

/* GET list of products using a category 
function will use the category paramenter for the URL template
*/

async function getProductsCategory(category){
    const URL = `${RestAPIURL}/products/product_search?primary_category_id=${category}&secretKey=${secretKey}`;
    const res = await axios.get(URL);
    return res.data;
}

async function getProductsId(productId){
    const URL = `${RestAPIURL}/products/product_search?id=${productId}&secretKey=${secretKey}`;
    const res = await axios.get(URL);
    return res.data;
}


module.exports = {
    getHome: getHome,
    getGender: getGender,
    getCategories: getCategories,
    getProductsCategory: getProductsCategory,
    getProductsId: getProductsId
}