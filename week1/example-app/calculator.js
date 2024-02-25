const express = require("express")
const app = express()

app.get("/calculator",(req,res)=>{
    res.send("Hesap Makinesi Uygulaması")
})

//Toplama İslemi
app.get("/api/topla/:number/:number2", (req, res) => {
    const number = parseInt(req.params.number);
    const number2 = parseInt(req.params.number2);
    const sonuc = number + number2;
    res.send(`Sonuc: ${sonuc}`);
});
//Carpma İslemi
app.get("/api/carp/:number/:number2", (req, res) => {
    const number = parseInt(req.params.number);
    const number2 = parseInt(req.params.number2);
    const sonuc = number * number2;
    res.send(`Sonuc: ${sonuc}`);
});
//Cikarma İslemi
app.get("/api/cikar/:number/:number2", (req, res) => {
    const number1 = parseInt(req.params.number);
    const number2 = parseInt(req.params.number2);

    if(number1 < number2){
        res.send("İslem gerçeklestirilemez")
    }else{
        const sonuc = number1 - number2
        res.send(`Sonuc: ${sonuc}`)
    }
   
});
//Bolme İslemi
app.get("/api/bol/:number/:number2", (req, res) => {
    const number1 = parseInt(req.params.number);
    const number2 = parseInt(req.params.number2);

    if(number1 < number2){
        res.send("İslem gerçeklestirilemez")
    }else{
        const sonuc = number1 / number2
        res.send(`Sonuc: ${sonuc}`)
    }
   
});


app.listen(3000 , () =>{
    console.log("Server is running on port 3000")
})