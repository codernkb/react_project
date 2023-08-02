const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express()
const bcrypt = require('bcrypt');
var cors = require('cors');
app.use(cors());
////////to receive body data
app.use(express.json());
// app.use(bodyParser.json());

const port=5000
//////connect db file
require("./db/config")
/////////register model connect/////////////
const Register=require("./Model/register");



////////////------------------////////////////////////////


app.post('/registerHere', async (req, res,next) => {
  try {
    const { name, email, mobile, password, conpassword, address } = req.body;
    const preUser = await Register.findOne({ email });

    if (!preUser) {
      if (password === conpassword) {
        const register = await Register({ name, email, mobile, password, conpassword, address });
        const result = await register.save();
        res.send({ message: "Register Successfully!!!", insertedData: result });
      } else {
        res.send({ message: "Your password and confirm password do not match." });
      }
    } else {
      res.send({ message: "Already exists this email id in our database." });
    }
  } catch (error) {
    res.status(500).send({ message: "Failed to register user.", error: error.message });
  }
});
/////////fetch api////////////////
app.get("/fetchAll", async (req, res,next) => {
  try {
    const list = await Register.find({ isDeleted: false });
    res.send(list);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch data.", error: error.message });
  }
});

//////// search api//////
app.get("/searchAll", async (req, res, next) => {
  let { query } = req.query;
  // const { name, email, mobile, address } = req.body;

  if (query && query.length >= 3) {
    try {
      const regex = new RegExp(query, 'ims');

      let results = await Register.find( {       
        $or: [
        { name: { $regex: regex } },
        { email: { $regex: regex } },
        { mobile: { $regex: regex } },
        { address: { $regex: regex } },
      ],
      isDeleted: false
    });
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: 'An error occurred while searching.' });
    }
  } else {
    res.status(400).json({ error: 'Query must be at least 3 characters long.' });
  }
});


/////////delete api////////////////

app.delete("/delete/:id", async (req, res, next) => {
  try {
    const deletedRecord = await Register.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
    if (!deletedRecord) {
      return res.status(404).send({ message: "Data not found." });
    }
    res.send(deletedRecord);
  } catch (error) {
    res.status(500).send({ message: "Failed to delete data.", error: error.message });
  }
});

/////////////get details for particuler//////////////
app.get("/getDetails/:id", async (req, res, next) => {
  try {
    const result = await Register.findById(req.params.id, { password: 0, conpassword: 0 });
    if (!result) {
      return res.status(404).send({ message: "Data not found." });
    }
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch data.", error: error.message });
  }
});
////////////update api/////////////////
app.put("/update/:id", async (req, res, next) => {
  try {
    const { name, email, mobile, password, conpassword, address } = req.body;
    const updatedData = { name, email, mobile, password, conpassword, address };
    const result = await Register.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!result) {
      return res.status(404).send({ message: "Data not found." });
    }
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Failed to update data.", error: error.message });
  }
});



app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
    console.log(`http://localhost:${port}`)
})