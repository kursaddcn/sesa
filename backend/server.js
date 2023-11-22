const express =  require('express');
const mongoose = require('mongoose');
const kittyRoute = require('../backend/routers/Route');
const app = express();

app.use(express.json());
const cors = require('cors');
app.use(kittyRoute);
app.use(cors());

const dbURL = 'mongodb+srv://kursatcann07:Kur.can07@sesademo.0w2mr.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(dbURL)
    .then(r => console.log("Bağlantı Kuruldu"))
    .catch((err)=> console.log(err));
app.listen(10000);


