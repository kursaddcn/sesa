const express = require('express');
const userModel = require("../models/UserDataSchema");
const productModel = require("../models/ProductSchema");
const app = express();
const cors = require('cors');
const nodemailer = require("nodemailer");
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sesa.info.service@gmail.com',
        pass: 'testMail07'
    }
});
app.put("/updatePassword", async (req, res) => {
    const min = 100000;
    const newPassword = Math.floor(min + Math.random() * 9000000);
    const newUser = new userModel({
        userMail:req.body.userMail,
    })

    userModel.getUserByMail(newUser.userMail, (err, user) => {
        if (err) {
            res.send({
                message: "Sistem Hatası",
                code: 0,
            })
        }
        if (user) {
            //return res.json({success: false, msg: "User not found!"});  verificationCode:user.userVerificationCode,
            const mailOptions = {
                from: 'sesa.info.service@gmail.com',
                to: req.body.userMail.toString(),
                subject: 'E-mail Verification Code From [SESA]',
                text: "Your New Password : " + newPassword.toString(),
            }

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
    })

    userModel.findOneAndUpdate({userMail: req.body.userMail}, {
        userPassword:newPassword.toString(),
    }, {new: true}, function (err, result) {console.log(result);})

});
app.post('/resendVerificationCode',async (req, res) => {
    const newUser = new userModel({
        userMail:req.body.userMail,
    })

    userModel.getUserByMail(newUser.userMail, (err, user) => {
        if (err) {
            res.send({
                message: "Sistem Hatası",
                code:0,
            })
        }
        if (user) {
            //return res.json({success: false, msg: "User not found!"});  verificationCode:user.userVerificationCode,
            const mailOptions = {
                from: 'sesa.info.service@gmail.com',
                to: req.body.userMail.toString(),
                subject: 'E-mail Verification Code From [SESA]',
                text: "Your Verification Code : " + user.userVerificationCode.toString(),
            }

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }

        else if (!user) {
            //return res.json({success: false, msg: "User not found!"});
            res.send({
                stat: false,
            })
        }
    })


});
app.post('/addNewUser', async (req, res) => {
    const min = 100000;
    const code = Math.floor(min + Math.random() * 9000000);

    const mailOptions = {
        from: 'sesa.info.service@gmail.com',
        to: req.body.userMail.toString(),
        subject: 'E-mail Verification Code From [SESA]',
        text: "Your Verification Code : " + code.toString(),
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    const newUser = new userModel({
        userName:req.body.userName,
        userSurname:req.body.userSurname,
        userMail:req.body.userMail,
        userPassword:req.body.userPassword,
        userType:req.body.userType,
        userVerificationCode:code.toString(),
        userMarketCode:req.body.userMarketCode,
        userProductList:[],
        userFilters :[{
            isVegetarianSelected:false,
            isVeganSelected:false,
            isPescatarianSelected:false,
            isGlutenFreeSelected:false,
            isHalalSelected:false,
            isKosherSelected:false,
            isEggSelected:false,
            isFishSelected:false,
            isMilkSelected:false,
            isPeanutSelected:false,
            isAlmondSelected:false,
            isCashewSelected:false,
            isWalnutSelected:false,
            isSesameSelected:false,
            isSoySelected:false,
            isMushroomSelected:false,
            isCrueltyFreeSelected:false,
        }],
    })

    newUser.save(function (err) {
        if (err) {
            res.send({
                message: err,
                status: false
            });
        } else {
            res.send({
                message: "KAYIT BAŞARIYLA OLUŞTURULDU",
                status: true
            })
        }
    });

});
app.post("/getUserByMail",  async (req, res) => {
    const newUser = new userModel({
        userMail:req.body.userMail,
    })

    userModel.getUserByMail(newUser.userMail, (err, user) => {
        console.log(user);
        if (err) {
            res.send({
                message: "Sistem Hatası",
                code:0,
            })
        }

        if (user) {
            //return res.json({success: false, msg: "User not found!"});
            res.send({
                message: "Mail Adresi Kullanımda!",
                stat: true,
                code:1,
                verificationCode:user.userVerificationCode,
            })
        }

        else if (!user) {
            //return res.json({success: false, msg: "User not found!"});
            res.send({
                message: "Mail Adresi Müsait",
                stat: false,
                code:2,
            })
        }
    })
})
app.post('/login', async (req, res) => {
    let currentUser = new userModel({
        userMail: req.body.userMail,
        userPassword: req.body.userPassword,
    });
    await userModel.getUserByMail(currentUser.userMail, (err, user) => {
            if (err) {
                res.send({
                    mes: err,
                    stat: false
                })
            }
            if (!user) {
                //return res.json({success: false, msg: "User not found!"});
                res.send({
                    mes: "Mail Adresi Mevcut Değil !",
                    stat: false
                })
            } else {
                userModel.comparePassword(currentUser, (err, user) => {
                        if (err) {
                            res.send({
                                mes: err,
                                stat: false
                            })
                        }
                        if (!user) {
                            res.send({
                                mes: "Şifre Yanlış",
                                stat: false
                            })
                        } else {
                            res.send({
                                mes: "Başarılı Giriş",
                                stat: true,
                                onlineUser: user,

                                /*token: tokenS*/
                            })

                        }
                    }
                )
            }
        }
    );
});
app.post('/changePassword', async (req, res) => {
    let currentUser = new userModel({
        userMail: req.body.userMail,
        userPassword: req.body.userPassword,
        newPassword: req.body.newPassword,
    });
    await userModel.comparePassword(currentUser, (err, user) => {
        if (err) {
            res.send({
                mes: err,
                stat: false,
                statCode :0,
            })
        }
        if (!user) {
            res.send({
                mes: "Şifre Yanlış",
                stat: false,
                statCode:1,
            })
        } else {
            res.send({
                mes: "Başarılı Giriş",
                stat: true,
                onlineUser: user,
                statCode:2,
                /*token: tokenS*/
            })
            userModel.findOneAndUpdate({userMail: req.body.userMail}, {
                userPassword:req.body.newPassword.toString(),
            }, {new: true}, function (err, result) {console.log(result);})
        }
    })
});
app.post('/getUserFilters', async (req, res) => {
    let currentUser = new userModel({
        userMail: req.body.userMail,
    });
    await userModel.getUserByMail(currentUser.userMail, (err, user) => {
        if (err) {
            res.send({
                mes: err,
                stat: false,
                statCode :0,
            })
        }
        if (!user) {
            res.send({
                mes: "Kullanıcı Yok",
                stat: false,
                statCode:1,
            })
        } else {
            res.send({
                mes: "Başarılı",
                stat: true,
                onlineUser: user,
                statCode:2,
                /*token: tokenS*/
            })
        }
    })
});
app.post('/updateUserFilters', async (req, res) => {
    let currentUser = new userModel({
        userMail: req.body.userMail,
    });
    await userModel.getUserByMail(currentUser.userMail, (err, user) => {
        if (err) {
            res.send({
                mes: err,
                stat: false,
                statCode :0,
            })
        }
        if (!user) {
            res.send({
                mes: "Kullanıcı Yok",
                stat: false,
                statCode:1,
            })
        } else {
            res.send({
                mes: "Başarılı",
                stat: true,
                onlineUser: user,
                statCode:2,
                /*token: tokenS*/
            })
            userModel.findOneAndUpdate({userMail: req.body.userMail}, {
                userFilters :[{
                    isVegetarianSelected:req.body.userFilter[0].isVegetarianSelected,
                    isVeganSelected:req.body.userFilter[0].isVeganSelected,
                    isPescatarianSelected:req.body.userFilter[0].isPescatarianSelected,
                    isGlutenFreeSelected:req.body.userFilter[0].isGlutenFreeSelected,
                    isHalalSelected:req.body.userFilter[0].isHalalSelected,
                    isKosherSelected:req.body.userFilter[0].isKosherSelected,
                    isEggSelected:req.body.userFilter[0].isEggSelected,
                    isFishSelected:req.body.userFilter[0].isFishSelected,
                    isMilkSelected:req.body.userFilter[0].isMilkSelected,
                    isPeanutSelected:req.body.userFilter[0].isPeanutSelected,
                    isAlmondSelected:req.body.userFilter[0].isAlmondSelected,
                    isCashewSelected:req.body.userFilter[0].isCashewSelected,
                    isWalnutSelected:req.body.userFilter[0].isWalnutSelected,
                    isSesameSelected:req.body.userFilter[0].isSesameSelected,
                    isSoySelected:req.body.userFilter[0].isSoySelected,
                    isMushroomSelected:req.body.userFilter[0].isMushroomSelected,
                    isCrueltyFreeSelected:req.body.userFilter[0].isCrueltyFreeSelected,
                }],
            }, {new: true}, function (err, result) {console.log(req.body);})


        }
    })
});
app.post('/addNewProduct',  (req, res) => {

    const newProduct = new productModel({
        productId: req.body.productId,
        title: req.body.title,
        price: req.body.price,
        ingredients: req.body.ingredients,
        location: req.body.location,
        productType: req.body.productType,
        extraInformation:req.body.extraInformation,
        productFilters :[{
        isVegetarian: req.body.productFilters[0].isVegetarian,
        isVegan: req.body.productFilters[0].isVegan,
        isPescatarian: req.body.productFilters[0].isPescatarian,
        isGlutenFree:req.body.productFilters[0].isGlutenFree,
        isHalal: req.body.productFilters[0].isHalal,
        isKosher: req.body.productFilters[0].isKosher,
        isEggIncluded: req.body.productFilters[0].isEggIncluded,
        isFishIncluded: req.body.productFilters[0].isFishIncluded,
        isMilkIncluded: req.body.productFilters[0].isMilkIncluded,
        isPeanutIncluded: req.body.productFilters[0].isPeanutIncluded,
        isAlmondIncluded: req.body.productFilters[0].isAlmondIncluded,
        isCashewIncluded: req.body.productFilters[0].isCashewIncluded,
        isWalnutIncluded: req.body.productFilters[0].isWalnutIncluded,
        isSesameIncluded: req.body.productFilters[0].isSesameIncluded,
        isSoyIncluded: req.body.productFilters[0].isSoyIncluded,
        isMushroomIncluded: req.body.productFilters[0].isMushroomIncluded,
        isCrueltyFree: req.body.productFilters[0].isCrueltyFree,
    }]});


    newProduct.save(function (err) {
        if (err) {
            res.send({
                message: err,
                status: false
            });
        } else {
            res.send({
                message: "KAYIT BAŞARIYLA OLUŞTURULDU",
                status: true
            })
        }
    });

});
app.post("/getProductByType",  async (req, res) => {
    const newProduct = new productModel({
        productType:req.body.productType,
    })

    productModel.getProductByType(newProduct.productType, (err, product) => {
        if (err) {
            res.send({
                message: "Sistem Hatası",
                code:0,
            })
        }

        if (!product) {
            res.send({
                mes: "Product Yok",
                stat: false,
                statCode:1,
            })
        } else {
            res.send({
                mes: "Başarılı",
                stat: true,
                instantProduct: product,
                statCode:2,
                /*token: tokenS*/
            }
    )}
})});
app.post("/getProductById",  async (req, res) => {
    const newProduct = new productModel({
        productId:req.body.productId,
    })

    productModel.getProductById(newProduct.productId, (err, product) => {
        console.log(product);
        if (err) {
            res.send({
                message: "Sistem Hatası",
                code:0,
            })
        }

        if (!product) {
            res.send({
                mes: "Product Yok",
                stat: false,
                statCode:1,
            })
        } else {
            res.send({
                    mes: "Başarılı",
                    stat: true,
                    instantProduct: product,
                    statCode:2,
                    /*token: tokenS*/
                }
            )}
})});
app.post("/getProductByIdSync",  (req, res) => {
    const newProduct = new productModel({
        productId:req.body.productId,
    })

    productModel.getProductById(newProduct.productId, (err, product) => {
        console.log(product);
        if (err) {
            res.send({
                message: "Sistem Hatası",
                code:0,
            })
        }

        if (!product) {
            res.send({
                mes: "Product Yok",
                stat: false,
                statCode:1,
            })
        } else {
            res.send({
                    mes: "Başarılı",
                    stat: true,
                    instantProduct: product,
                    statCode:2,
                    /*token: tokenS*/
                }
            )}
    })});
app.post('/getUserProductList', async (req, res) => {
    let currentUser = new userModel({
        userMail: req.body.userMail,
    });
    await userModel.getUserByMail(currentUser.userMail, (err, user) => {
        if (err) {
            res.send({
                mes: err,
                stat: false,
                statCode :0,
            })
        }
        if (!user) {
            res.send({
                mes: "Kullanıcı Yok",
                stat: false,
                statCode:1,
            })
        } else {
            res.send({
                mes: "Başarılı",
                stat: true,
                onlineUser: user,
                statCode:2,
                /*token: tokenS*/
            })
        }
    })
});
app.post('/updateUserProductList', async (req, res) => {
    let currentUser = new userModel({
        userMail: req.body.userMail,
    });
    await userModel.getUserByMail(currentUser.userMail, (err, user) => {
        if (err) {
            res.send({
                mes: err,
                stat: false,
                statCode :0,
            })
        }
        if (!user) {
            res.send({
                mes: "Kullanıcı Yok",
                stat: false,
                statCode:1,
            })
        } else {
            res.send({
                mes: "Başarılı",
                stat: true,
                onlineUser: user,
                statCode:2,
                /*token: tokenS*/
            })
            userModel.findOneAndUpdate({userMail: req.body.userMail}, {
                $push: { userProductList: req.body.addedProductId }
            }, {new: true}, function (err, result) {console.log(req.body);})


        }
    })
});
app.post('/deleteUserProductList', async (req, res) => {
    let currentUser = new userModel({
        userMail: req.body.userMail,
    });
    await userModel.getUserByMail(currentUser.userMail, (err, user) => {
        if (err) {
            res.send({
                mes: err,
                stat: false,
                statCode :0,
            })
        }
        if (!user) {
            res.send({
                mes: "Kullanıcı Yok",
                stat: false,
                statCode:1,
            })
        } else {
            res.send({
                mes: "Başarılı",
                stat: true,
                onlineUser: user,
                statCode:2,
                /*token: tokenS*/
            })
            userModel.findOneAndUpdate({userMail: req.body.userMail}, {
                userProductList: [],
            }, {new: true}, function (err, result) {console.log(req.body);})


        }
    })
});
app.post('/getAllProducts', async (req, res) => {
    let products = await productModel.find({}, {},{limit: 200});
    res.send({
        allProducts:products,
    })
});
module.exports = app;

