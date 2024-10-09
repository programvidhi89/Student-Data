const express = require("express");
const path = require("path");
const studentModel = require("./models/studenModel");
const app = express();

app.use(express.json());
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

app.get("/",async (req,res)=>{
    const students = await studentModel.find();
    res.render("students",{students});
})

app.get("/students/add",(req,res)=>{
    res.render("addStudent");
})
app.get("/students",async (req,res)=>{
    const students = await studentModel.find();
    res.render("studentList",{students});
})
app.post("/students/add",async (req,res)=>{
    const {firstName,lastName,studentId,course,email,phone} = req.body;
    const student = await studentModel.create({firstName,lastName,studentId,course,email,phone});
    res.redirect("/");
})


app.get("/students/edit/:id",async (req,res)=>{
    const student = await studentModel.findOne({_id:req.params.id});
    res.render("editStudent",{student});
})
app.post("/students/update/:id",async (req,res)=>{
    const student = await studentModel.findOneAndUpdate({_id:req.params.id},req.body);
    res.redirect("/");
})
app.post("/students/delete/:id",async (req,res)=>{
    const student = await studentModel.deleteOne({_id:req.params.id});
    res.redirect("/");
})
app.get("/students/search",async(req,res)=>{
    const searchQuery = req.query.query.trim();
    try{
        const students = await studentModel.find({
            $or: [
              
                { studentId: parseInt(searchQuery )},               
               
            ]
        });
        if(students.length==0){
            return res.status(404).send("no students found");
        }
        res.render("students",{students})
    }catch(err){
        console.error(err);
        res.status(500).send('Server error');
    }
})


app.listen(3000,(req,res)=>{
    console.log("server is running on port no 3000");
})