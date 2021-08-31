const WishlistServices = require('../services/WishlistServices');


/*
    works just like cart controller
*/

async function createWishlist(data) {
    let products = [];
    if (typeof data === 'undefined') {
        return 0;       
    }
    try {
        for (let i = 0; i < data.items.length; i++) {
            const product = await WishlistServices.getProduct(data.items[i].productId);
            if (product) {
                const newProduct = {
                    "pid": product[0].id,
                    "name": product[0].name,
                    "imgsrc": product[0].image_groups[0].images[0].link,
                    "price": product[0].price,
                    "variantid": data.items[i].variant.product_id,
                    "quantity": data.items[i].quantity,
                    "color": data.items[i].variant.variation_values.color,
                    "size": data.items[i].variant.variation_values.size
                   
                };
                products.push(newProduct);
            }
        }
    } catch (err) {
        console.log(err);
    }
    return products;
}

async function getWishlist(req, res, next) {
    const data = await WishlistServices.getWishlist(req.session.token);
   // console.log('Ra');
    if (data) {
       // console.log('Ra');
        let products = await createWishlist(data);
        res.render('wishlist.ejs', { title: 'Alibazon', products: products, session: req.session.userid });
    } else {
        const err= new Error("Wishlist is missing");
        err.status = 404;
        next(err);
    }
}

async function addWishedProduct(req, res, next) {
    try {
        const data = await WishlistServices.addWishedProduct(req.body.productid, req.body.variantid, "1", req.session.token); //quantity = 1
        if (data) {
            res.redirect("/wishlist");
        } else {
            const err = new Error("err");
            next(err);
        }
    } catch (err) {
        next(err);
    }
}

async function removeWishedProduct(req, res, next) {
    try {
        const data = await WishlistServices.removeWishedProduct(req.body.productid, req.body.variantid, req.session.token);
        if (data) {
            res.redirect("/wishlist");
        } else {
            const err = new Error(data);
            next(err);
        }
    } catch (err) {
        next(err);
    }
}

async function updateWishedQuantity(req, res, next) {
    try {
        const data = await WishlistServices.updateWishedQuantity(req.body.productid, req.body.variantid, req.body.quantity, req.session.token);
        if (data) {
            res.redirect("/wishlist");
        } else {
            const err = new Error(data);
            next(err);
        }
    } catch (err) {
        next(err);
    }

}

module.exports = {
    getWishlist: getWishlist,
    addWishedProduct: addWishedProduct,
    removeWishedProduct: removeWishedProduct,
    updateWishedQuantity: updateWishedQuantity
}