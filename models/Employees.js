const mongoose=require('mongoose');
const EmployeesSchema=mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    joining_date:{
        type: Date,
        default: Date.now
    }
});

module.exports= mongoose.model('Employees', EmployeesSchema);
