const mongoose = require('mongoose');

const userDataModel = new mongoose.Schema({
    userName:String,
    userSurname:String,
    userMail:String,
    userPassword:String,
    userType:Number,
    userVerificationCode:String,
    userMarketCode:Number,
    userProductList:[],
    userFilters :[{
        isVegetarianSelected:Boolean,
        isVeganSelected:Boolean,
        isPescatarianSelected:Boolean,
        isGlutenFreeSelected:Boolean,
        isHalalSelected:Boolean,
        isKosherSelected:Boolean,
        isEggSelected:Boolean,
        isFishSelected:Boolean,
        isMilkSelected:Boolean,
        isPeanutSelected:Boolean,
        isAlmondSelected:Boolean,
        isCashewSelected:Boolean,
        isWalnutSelected:Boolean,
        isSesameSelected:Boolean,
        isSoySelected:Boolean,
        isMushroomSelected:Boolean,
        isCrueltyFreeSelected:Boolean
    }]
});
const userModel = module.exports = mongoose.model('userModel', userDataModel);

module.exports.getUserByMail =  function (userMailEx, callback) {
    const messageToSearchWith = new userModel({userMail:userMailEx});
    const query = {userMail: messageToSearchWith.userMail};
    userModel.findOne(query,callback);
}

module.exports.comparePassword =  function (userData, callback) {
    const compareMailAndPassword = new userModel({userMail:userData.userMail,userPassword: userData.userPassword});
    const query = {userMail: compareMailAndPassword.userMail , userPassword:compareMailAndPassword.userPassword};
    userModel.findOne(query, callback);
}

