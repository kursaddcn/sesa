const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId: Number,
    title: String,
    price: Number,
    ingredients: String,
    location: Number,
    productType: String,
    extraInformation: String,
    productFilters :[{
        isVegetarian: Boolean,
        isVegan: Boolean,
        isPescatarian: Boolean,
        isGlutenFree: Boolean,
        isHalal: Boolean,
        isKosher: Boolean,
        isEggIncluded: Boolean,
        isFishIncluded: Boolean,
        isMilkIncluded: Boolean,
        isPeanutIncluded: Boolean,
        isAlmondIncluded: Boolean,
        isCashewIncluded: Boolean,
        isWalnutIncluded: Boolean,
        isSesameIncluded: Boolean,
        isSoyIncluded: Boolean,
        isMushroomIncluded: Boolean,
        isCrueltyFree: Boolean
    }]
});
const productModel = module.exports = mongoose.model('productModel', productSchema);

module.exports.getProductByType =  function (productTypeEx, callback) {
    const messageToSearchWith = new productModel({productType:productTypeEx});
    const query = {productType: messageToSearchWith.productType};
    productModel.find(query,callback);
}
module.exports.getProductById =  function (productIdEx, callback) {
    const messageToSearchWith = new productModel({productId:productIdEx});
    const query = {productId: messageToSearchWith.productId};
    productModel.findOne(query,callback);
}

