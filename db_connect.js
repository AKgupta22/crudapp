const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://akash:AKgupta22@cluster0.urbjzyg.mongodb.net/emp?retryWrites=true&w=majority").then(() => {
    console.log("DB CONNECTED");
}).catch((error) => {
    console.log(error);
})