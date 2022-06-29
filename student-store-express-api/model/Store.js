//use a Storage class that has been created for you
const { storage } = require('../data/storage');

class Store {
    //list all products currently in the db.json file
    static listAllProducts() {
        return storage.get('products').value();
    }

    //fetch a single product by its id
    static getProdById(productId) {
        let prodById = storage.get('products').find({ id: Number(productId) }).value();
        return prodById;
        //throw error if not 
    }

    //fetch a single order by its id
    static getOrderById(id) {
        let orderById = storage.get('purchases').find({ id: Number(id) }).value();
        return orderById;
        //throw error if not 
    }
    //create a purchase order 
    static createPurchaseOrder(purchases) {
        storage.get('purchases').push(purchases).write();
    }

    //get purchases by user 
    static getPurchaseLength() {
        return storage.get('purchases').value().length;
    }

    static listAllPurchases() {
        return storage.get('purchases').value();
    }
}

module.exports = Store;
