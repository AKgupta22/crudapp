const mongoose= require("mongoose")

const employee_schema= new mongoose.Schema({
    id:{
        type:Number
    },
    name:{
        type:String
    },
    Dsg:{
       type:String
    },
    Salary:{
        type:Number
    },
    City:{
        type:String
    },
    State:{
        type:String
    }
})

const Employee= mongoose.model("emp",employee_schema)

module.exports=Employee