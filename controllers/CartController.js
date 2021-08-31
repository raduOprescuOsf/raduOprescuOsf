const CartServices = require('../services/CartServices');

/*
    the function will create a cart based on the products
    the user selected in the previous session  
*/

async function createCart(data) {
    let products = [];
    if (typeof data === 'undefined') {
        return 0;       
    }
    try {
        for (let i = 0; i < data.items.length; i++) {
            const product = await CartServices.getProduct(data.items[i].productId);
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

/*
    this function will get the products based on the token the user had on the previous session
*/

async function getCart(req, res, next) {
    const data = await CartServices.getCart(req.session.token);
    if (data) {
        let products = await createCart(data);
        res.render('shoppingcart.ejs', { title: 'Alibazon', products: products, session: req.session.userid });
    } else {
        const err= new Error("Cart is missing");
        err.status = 404;
        next(err);
    }
}

/*
    the function will add a product to the cart based on the product id and variant(size + color), the quantity will be 1 by default
    also it uses user session token to remeber the selected items 
*/

async function addProduct(req, res, next) {
    try {
        const data = await CartServices.addProduct(req.body.productid, req.body.variantid, "1", req.session.token); 
        if (data) {
            res.redirect("/cart");
        } else {
            const err = new Error("err");
            next(err);
        }
    } catch (err) {
        next(err);
    }
}

/*
    the function will update the quantity of a product based on the infomation given by the selected item
*/

async function updateQuantity(req, res, next) {
    try {
        const data = await CartServices.updateQuantity(req.body.productid, req.body.variantid, req.body.quantity, req.session.token);
        if (data) {
            res.redirect("/cart");
        } else {
            const err = new Error(data);
            next(err);
        }
    } catch (err) {
        next(err);
    }

}

/*
    the function will delete the selected item from the cart 
*/

async function removeProduct(req, res, next) {
    try {
        const data = await CartServices.removeProduct(req.body.productid, req.body.variantid, req.session.token);
        if (data) {
            res.redirect("/cart");
        } else {
            const err = new Error(data);
            next(err);
        }
    } catch (err) {
        next(err);
    }
}



module.exports = {
    getCart: getCart,
    addProduct: addProduct,
    removeProduct: removeProduct,
    updateQuantity: updateQuantity
}