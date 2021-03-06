const axios = require('axios');

const RestAPIURL = "https://osf-digital-backend-academy.herokuapp.com/api/";
const secretKey = "$2a$08$ZlZQAmpSHsaFFKcdnkDpCugCICxR/DnMCehnaoE5OfXfxVcyJ4FNu";

/*
    will get the cart from api using a token
*/

async function getCart(token) {
    const URL = `${RestAPIURL}cart?secretKey=${secretKey}`;
    try {
        const res = await axios.get(URL, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return res.data;
    } catch (err) {
        return err;
    }

}

// will get a selcted product using it's id 

async function getProduct(productID) {
    const URL = `${RestAPIURL}/products/product_search?id=${productID}&secretKey=${secretKey}`;
    const res = await axios.get(URL);
    return res.data;
}

// will add a product to the cart using it's id, variant and quantity(we will use a constructor to define the product)
// token is used to remeber the user that added the product to it's specific cart

async function addProduct(productId, variantId, quantity, token) {
    const URL = `${RestAPIURL}cart/addItem`;
    try {
        const product = {
            "productId": productId,
            "variantId": variantId,
            "quantity": quantity,
            "secretKey": secretKey
        };
        const res = await axios.post(URL, product, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

// remove an item that was selcted from the cart 

async function removeProduct(productId, variantId,token) {
    const URL = `${RestAPIURL}cart/removeItem`;
    try {
        const product = {
            "productId": productId,
            "variantId": variantId,
            "secretKey": secretKey
        };
        const res = await axios.delete(URL, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
            data: product
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

async function updateQuantity(productId, variantId, quantity, token) {
    const URL = `${RestAPIURL}cart/changeItemQuantity`;
    try {
        const product = {
            "productId": productId,
            "variantId": variantId,
            "quantity": quantity,
            "secretKey": secretKey,
        };
        const res = await axios.post(URL, product, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
}


module.exports = {
    getCart: getCart,
    getProduct: getProduct,
    addProduct: addProduct,
    removeProduct: removeProduct,
    updateQuantity: updateQuantity
}