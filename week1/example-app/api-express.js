const express = require("express")
const app = express()

//routes
app.get("/",(req,res) =>{
    res.send("Hello, world")
})

app.get("/about",(req,res)=>{
    res.send("About page")
})

app.get("/api/:name",(req,res)=>{
    res.send(`"Hello" ${req.params.name}`)
})

app.get("/api/number/:number",(req,res)=>{
    const number = req.params.number;
    res.send(`"Your number", ${number}`);
})

app.get("/api/number/:number/:number2", (req, res) => {
    const number = parseInt(req.params.number);
    const number2 = parseInt(req.params.number2);
    const sum = number + number2;
    res.send(`Your sum is ${sum}`);
});

app.listen(3000 , () =>{
    console.log("Server is running on port 3000")
})
