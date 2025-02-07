const express=require('express');
const path=require("path");
const bcrypt=require("bcrypt");
const collection=require("./config");

const app=express();


app.post("/signup", async(req,res)=>{
    const data={
        name:req.body.username,
        password:req.body.password
    }

    const existingUser=await collection.findOne({name:data.name});
    if(exisitingUser)
    {
        res.send("user already exist. try another name");
    }
    else{
        const saltRounds=10;
        const hasedPassword=await bcrypt.hash(data.password,saltRounds);
        data.password=hasedPassword;
    }
    const userData=await collection.insertMany(data);
    console.log(userData);
});

app.post("/signin", async(req,res)=>{
 try{
    const check=await collection.findOne({name:req.body.username});
    if(!check)
    {
        res.send("username not found");
    }
    const isPasswordMatch=await bcrypt.compare(req.body.password,check.password);
    if(isPasswordMatch)
    {
        res.render("home");
    }
    else
    {
        req.send("wrong password");
    }
 }
 catch{
    res.send("wrong details");
 }
})
const port=5000;

app.listen(port,()=>{
    console.log(`Server running on Port: ${port}`)
})