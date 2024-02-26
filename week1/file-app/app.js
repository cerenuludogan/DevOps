const fs = require("fs")
const express = require("express")

const app = express()
//read json file from local file system
const data = fs.readFileSync(`${__dirname}/data.json`,"utf8")
const dataObj = JSON.parse(data)

//write json file from local file system
dataObj.name = "Aslı"
dataObj.age = 24
const newData = JSON.stringify(dataObj)
fs.writeFileSync(`${__dirname}/data.json`,newData)
//console.log(dataObj)

app.get("/student" ,(req,res)=>{
    res.status(200).json({
        status: "success",
        data: dataObj,
    });
});


app.listen(3000,()=>{
    console.log("Server is listening on port 3000")
})