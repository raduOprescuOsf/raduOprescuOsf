const defaultServices = require('../services/DefaultServices');


async function getHome(req, res, next){
    const data = await defaultServices.getHome();
   // console.log(data);
    if(data){
        res.render('homepage.ejs', {title: "Alibazon", data: data, session: req.session.userid});

    }else{
        const err= new Error("Homepage is missing");
        err.status = 404;
        next(err);
    }
}

async function getGender(req, res, next){
    let gender = '';
    const data = await defaultServices.getGender(req.params.id);
    //console.log(req.params.id);
    //console.log(data);
    if(data){
        let products = [];
        if(req.params.id == 'mens'){
            for(let i=0; i < data.length; i++){
                products.push(data[i]);
            }
            gender = 'mens';
            res.render('gender.ejs', {title:"Alibazon", data: products, gender: gender, session: req.session.userid});
        }else if(req.params.id == 'womens'){
            for(let i=0; i < data.length; i++){
                products.push(data[i]);
            }
            gender = 'womens';
            res.render('gender.ejs', {title:"Alibazon", data: products, gender: gender, session: req.session.userid});
        }else{
            const err = new Error("Gender not found!");
            err.status = 404;
            next(err);
        }
    }
}


async function getCategories(req, res, next){
    const parent_id = req.params.parent_category_id;
    const id = req.params.id;
    const data = await defaultServices.getCategories(id);
    //console.log(data);
    if(parent_id == 'mens'){
          
        if(data){
            let products = [];
            for(let i=0; i<data.length; i++){
                products.push(data[i]);
            }
            res.render('categories.ejs', {title: "Alibazon", gender: parent_id, data: products, id: id, session: req.session.userid});
        }
    }else if(parent_id == 'womens'){
        if(data){
            let products = [];
            for(let i=0; i<data.length; i++){
                products.push(data[i]);
            }
            res.render('categories.ejs', {title: "Alibazon", gender: parent_id, data: products, id: id, session: req.session.userid});
        }
    }else{
        const err = new Error("Category not found!");
        err.status = 404;
        next(err);
    }

}

let parent = '';

async function getProductsCategory(req, res, next){
    const parent_id = req.params.primary_category_id;
    const category = req.params.id;
    const products = await defaultServices.getProductsCategory(category);
    parent = parent_id;
    const parent_category = parent.split("-");
    let gender = '';
    if(parent_id[0] == 'w'){
        gender = 'womens';
    }else{
        gender = 'mens';
    }
    //console.log(products);
    if(category){
        res.render('subcategories.ejs', {title: "Alibazon", data: products, parent: parent, gender: gender, session: req.session.userid});
    }else{
        const err = new Error("Products not found!");
        err.status = 404;
        next(err);
    }

}


async function getProductId(req, res, next){
    const category = req.params.primary_category_id;
    const id = req.params.id;
    let gender = '';
    let img='';
    if(category[0] == 'w'){
        gender = 'womens';
    }else{
        gender = 'mens';
    }
    if(id){
       const product = await defaultServices.getProductsId(id);
       res.render('products.ejs', {title: "Alibazon", data: product, gender: gender, category: category, parent: parent, img: "", session: req.session.userid});
    }else{
    const err = new Error("Products not found!");
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