const express = require('express');
const cors = require('cors');
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config"); 

const app = express();

app.use(cors());
app.use(express.json());

app.post("/signup", async (req, res) => {
    const data = {
        email: req.body.email,
        password: req.body.password
    };

    try {
        
        const existingUser = await collection.findOne({ where: { email: data.email } });
        if (existingUser) {
            return res.json({ msg: "User already exists. Try another email." });
        }

       
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword;

       
        const userData = await collection.insertMany([data]); 
        res.status(201).json({ msg: "User signed up successfully!", userData });

    } catch (error) {
        res.status(500).json({ error: "Error signing up user", details: error.message });
    }
});


app.post("/signin", async (req, res) => {
    try {
        const check = await collection.findOne({ email: req.body.email });
        if (!check) {
            return res.send("Username not found");
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (isPasswordMatch) {
            res.send("Home");
        } else {
            res.send("Wrong password");
        }
    } catch (error) {
        res.send("Wrong details");
    }
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on Port: ${port}`);
});
