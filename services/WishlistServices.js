const axios = require('axios');

const RestAPIURL = "https://osf-digital-backend-academy.herokuapp.com/api/";
const secretKey = "$2a$08$ZlZQAmpSHsaFFKcdnkDpCugCICxR/DnMCehnaoE5OfXfxVcyJ4FNu";

async function getWishlist(token) {
    const URL = `${RestAPIURL}wishlist?secretKey=${secretKey}`;
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

async function getProduct(productID) {
    const URL = `${RestAPIURL}/products/product_search?id=${productID}&secretKey=${secretKey}`;
    const res = await axios.get(URL);
    return res.data;
}


async function addWishedProduct(productId, variantId, quantity, token) {
    const URL = `${RestAPIURL}wishlist/addItem`;
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



async function removeWishedProduct(productId, variantId,token) {
    const URL = `${RestAPIURL}wishlist/removeItem`;
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


async function updateWishedQuantity(productId, variantId, quantity, token) {
    const URL = `${RestAPIURL}wishlist/changeItemQuantity`;
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
    getWishlist: getWishlist,
    getProduct: getProduct,
    addWishedProduct: addWishedProduct,
    removeWishedProduct: removeWishedProduct,
    updateWishedQuantity: updateWishedQuantity
}