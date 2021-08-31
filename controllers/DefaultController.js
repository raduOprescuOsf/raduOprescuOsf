const defaultServices = require('../services/DefaultServices');

/*
    this functions are for rendering the project pages 
    every function will use the ejs file to render and they are using function from services file
    to get the correct URL based on the API and secret key

*/

async function getHome(req, res, next) {
    const data = await defaultServices.getHome();
    if (data) {
        res.render('homepage.ejs', { title: 'Alibazon', data: data, session: req.session.userid });
    } else {
        const err = new Error("Gender categories not found!");
        err.status = 404;
        next(err);
    }
}



async function getGender(req, res, next) {
    let gender = "womens";
    const data = await defaultServices.getGender(req.params.id);
    if (data) {
        let products = [];
        if (req.params.id == "mens") {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id.substring(0, 4) === 'mens') {
                    products.push(data[i]);
                }
            }
            gender = "mens";
            res.render('gender.ejs', { title: 'Alibazon', data: products, gender: gender, session: req.session.userid });
        } else{
            for (let i = 0; i < data.length; i++) {
                if (data[i].id.substring(0, 6) === 'womens') {
                    products.push(data[i]);
                }
            }
            res.render('gender.ejs', { title: 'Alibazon', data: products, gender: gender, session: req.session.userid });
    
        }
    }

}

async function getCategories(req, res, next) {
    const data = await defaultServices.getCategories(req.params.id);
    if (req.params.parent_category_id == "mens") {
        if (data) {
            let products = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i].id.substring(0, 4) === 'mens') {
                    products.push(data[i]);
                }
            }
            gender = req.params.parent_category_id;
            res.render('categories.ejs', { title: 'Alibazon', data: products, gender: req.params.parent_category_id, id: req.params.id, session: req.session.userid });
        }
        else {
            const err = new Error("Category for gender not found!");
            err.status = 404;
            next(err);
        }
    } else if (req.params.parent_category_id == "womens") {
        if (data) {
            let products = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i].id.substring(0, 6) === 'womens') {
                    products.push(data[i]);
                }
            }
            gender = req.params.parent_category_id;
            res.render('categories.ejs', { title: 'Alibazon', data: products, gender: req.params.parent_category_id, id: req.params.id, session: req.session.userid });
        }
        else {
            const err = new Error("Category for gender not found!");
            err.status = 404;
            next(err);
        }
    } else {
        next();
    }
}

let parent2 = "";

async function getProductsCategory(req, res, next) {
    const parent = req.params.primary_category_id;
    const data = await defaultServices.getProductsCategory(req.params.id);
    parent2 = parent;
    if (req.params.id) {
        res.render('subcategories.ejs', { title: 'Alibazon', data: data, gender: gender, parent: req.params.primary_category_id, session: req.session.userid });
    } else {
        const err = new Error("Products not found!");
        err.status = 404;
        next(err);
    }

}


async function getProductId(req, res, next) {

    let gender = "womens";
    if (req.params.primary_category_id.substring(0, 4) == "mens") {
        gender = "mens";
    }
    if (req.params.id) {
        const data = await defaultServices.getProductsId(req.params.id);
        res.render('products.ejs', { title: 'Alibazon', data: data, gender: gender, parent: parent2, session: req.session.userid, img: "" });
    } else {
        const err = new Error("Product not found!");
        err.status = 404;
        next(err);
    }
}


module.exports = {
    getHome: getHome,
    getGender: getGender,
    getCategories: getCategories,
    getProductsCategory: getProductsCategory,
    getProductId: getProductId
};