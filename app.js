const express=require('express');
const app=express();
const port= process.env.PORT || 80;
const path=require('path');
const mongoose=require('mongoose');
const Employees = require('./models/Employees');
const { dirname } = require('path');
require('dotenv/config');
var emplist;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//MIDDlEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/static',express.static('static'));




// app.get('/',async (req,res)=>{                    //created initially just for testing
//     try{
//         const allEmps=await Employees.find();        
//         res.json(allEmps)
        
//     }catch(err){
//         res.json({message:err});
//     }
// })

app.get('/about',(req,res)=>{
    res.render('about.pug');
})

//MAIN
app.get('/getAll', async (req,res)=>{
    try{
        const allEmps=await Employees.find();
        res.render('demo',{emplist:allEmps})
        
    }catch(err){
        res.json({message:err});
    }
})

// app.get('/name/:empName', async(req,res)=>{          //SEARCH BY NAME {{initially planned but not implemented yet}}
//     try{
//         const oneEmp= await Employees.findOne(req.params.empName);
//         res.render('demo',{oneEmp:oneEmps})
//     }catch(err){
//         res.json({message:err});
//     }
// })

//CREATE AN EMPLOYEE
app.post('/save', async (req,res)=>{
    const emp= new Employees({
        name: req.body.name,
        age:req.body.age,
        phone:req.body.phone,
        email:req.body.email
    });
    try{
        const saved=await emp.save();
        res.redirect('/getAll');
    }catch(err)
    {
        res.json({message: err});
    }
})

//DELETE AN EMPLOYEE
app.delete('/delete/:empId', async (req,res)=>{
    try{
        const delEmp= await Employees.deleteOne({_id:req.params.empId});
        
    }catch(err){
        res.json({message:err});
}
})


//load edit form
app.get('/edit/:empId', async(req,res)=>{
    try{
        const oneEmp= await Employees.findById(req.params.empId);
        res.render('edit',{oneEmp:oneEmp});
    }catch(err){
        res.json({message:err});
    }
}) 

//submit  and update edit form
app.post('/edit/:empId', async (req,res)=>{
    let modifiedEmp=  {};
        modifiedEmp.name= req.body.name;
        modifiedEmp.age=req.body.age;
        modifiedEmp.phone=req.body.phone;
        modifiedEmp.email=req.body.email;
        
        let query={_id:req.params.empId};

    try{
        const saved=await Employees.updateOne(query,modifiedEmp);
        res.redirect('/getAll');
    }catch(err) 
    {
        res.json({message: err});
    }
}) 


//connect to DB
mongoose.connect( process.env.DB_CONNECTION,
    {useNewUrlParser: true, useUnifiedTopology: true},
     ()=>{
    console.log('connected to MongoDB');
})

app.listen(port, ()=>{
    console.log('app started on port 80');
})