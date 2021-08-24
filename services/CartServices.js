const axios = require('axios');

const RestAPIURL = "https://osf-digital-backend-academy.herokuapp.com/api/";
const secretKey ="$2a$08$ZlZQAmpSHsaFFKcdnkDpCugCICxR/DnMCehnaoE5OfXfxVcyJ4FNu";


async function getCart(token){
    const URL = `${RestAPIURL}/cart?secretKey=${secretKey}`;
    try{
        const res = await axios.get(URL,{
        headers: {
            "Authorization": `Bearer ${token}`
        }
        });
        return res.data;
    }catch(err){
        return err;
    }
}

async function getProduct(productId){
    const URL = `${RestAPIURL}/products/product_search?id=${productId}`;
    const res = await axios.get(URL);
    return res.data;
}


async function addProduct(productId, variantId, quantity){
    const URL = `${RestAPIURL}cart/addItem`;
    try{
        const product = {
            'product': productId,
            'variant': variantId,
            'quantity': quantity,
            'secretKey': secretKey
        };
        const res = await axios.post(URL, product, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return res.data;
    }catch(err){
        console.log(err);
    }
}


async function removeProduct(productId, variantId){
    const URL = `${RestAPIURL}cart/removeItem`;
    try{
        const product = {
            'product': productId,
            'variant': variantId,
            'secretKey': secretKey
        };
        const res = await axios.delete(URL, product, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return res.data;
    }catch(err){
        return err;
    }
}

async function updateQuantity(productId, variantId, quantity){
    const URL = `${RestAPIURL}cart/changeItemQuantity`;
    try{
        const product = {
            'product': productId,
            'variant': variantId,
            'quantity': quantity,
            'secretKey': secretKey
        };
        const res = await axios.post(URL, product,{
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return res.data;
    }catch(err){
        return err;
    }

}

module.exports = {
    getCart: getCart,
    getProduct: getProduct,
    addProduct: addProduct,
    removeProduct: removeProduct,
    updateQuantity: updateQuantity
}