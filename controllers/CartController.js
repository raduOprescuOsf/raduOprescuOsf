const CartServices = require('../services/CartServices');
const cartController = require('../services/CartServices');

async function createCart(req, res, data){

    let products = [];
    if(typeof data === 'undefined'){
        return 1;
    }
    try{
        for(let i=0; i < data.items.length; i++){
            const product = await CartServices.getProduct(data.items[i].productId);
            if(product){
                const newProduct = {
                    "pid": product[0].id,
                    "name": product[0].name,
                    "imgsrc": product[0].image_groups[0].image_groups[0].link,
                    "price": product[0].price,
                    "variantid": data.items[i].variant_variant_id,
                    "quantity": data.items[i].quantity
                };  
                products.push(newProduct);
            }
        }
    }catch(err){
        next(err);
    }
    return products;

}

async function getCart(req, res, next){

    const data = await CartServices.getCart(req.session.token);
    if(data){
        let products = await createCart(data);
        res.render('cart.ejs', {title: "Alibazon", products: products});
    }else{
        const err= new Error("Cart is missing");
        err.status = 404;
        next(err);
    }

}

async function addProduct(req, res, next){

    try{
        const data = await CartServices.addProduct(req.body.productId, req.body.variantid, 1);
        if(data){
            res.redirect("/cart");
        }else{
            const err= new Error("Failed to add product");
            err.status = 401;
            next(err);
        }
    }catch(err){
        next(err);
    }

}

async function updateQuantity(req, res, next){

    try{
        const data = await CartServices.updateQuantity(req.body.productId, req.body.variantid, req.body.quantity);
        if(data){
            res.redirect("/cart");
        }else{
            const err= new Error("Failed to change product");
            err.status = 401;
            next(err);
        }
    }catch(err){
        next(err);
    }


}


async function removeProduct(req, res, next){

    try{
        const data = await CartServices.removeProduct(req.body.productId, req.body.variantid);
        if(data){
            res.redirect("/cart");
        }else{
            const err= new Error("Failed to add product");
            err.status = 401;
            next(err);
        }
    }catch(err){
        next(err);
    }

}

module.exports ={
    getCart: getCart,
    addProduct: addProduct,
    updateQuantity: updateQuantity,
    removeProduct: removeProduct
}