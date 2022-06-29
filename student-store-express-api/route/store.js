const express = require("express");
const router = express.Router();

const storeModel = require("../model/Store");

router.get('/store', (req, res, next) => {
    try {
        let allProds = storeModel.listAllProducts();
        let result = [];
        allProds.map((prod) => {
            result = [...result, { "products": prod }];
        });
        return res.json(result);
    } catch (err) {
        next(err);
    }
});


router.get('/store/:productId', (req, res, next) => {
    try {
        let product = storeModel.getProdById(req.params.productId);
        return res.json(product);
    } catch (err) {
        next(err);
    }
});

router.get('/orders', (req,res, next) => {
    try {
        let allPurchases = storeModel.listAllPurchases();
        let result = [];
        allPurchases.map((purchase) => {
            result = [...result, { "purchase": purchase }];
        });
        return res.json(result);
    } catch (err) {
        next(err);
    }
});

router.get('/orders/:id', (req, res, next) => {
    try {
        let order = storeModel.getOrderById(req.params.id);
        return res.json(order);
    } catch (err) {
        next(err);
    }
});

router.post('/store', (req, res) => {
    try {
        const {
            shoppingCart,
            user
        } = req.body;
        if (shoppingCart == "" || user == "" || user.email == "" || user.name == "") {
            return res.status(400);
        } else {
            //calculate the total
            //console.log(user);
            const newOrder = {
                id: storeModel.getPurchaseLength() + 1,
                name: user.name,
                email: user.email,
                order: shoppingCart,
                total: 0,
                createdAt : Date(),
            }
            storeModel.createPurchaseOrder(newOrder);
            // console.log(newOrder);
        }
        //storeModel.createPurchaseOrder({ shoppingCart: shoppingCart, user: user });
        return res.status(200).json(shoppingCart);
    } catch(err) {
        next(err);
    }
})


module.exports = router;