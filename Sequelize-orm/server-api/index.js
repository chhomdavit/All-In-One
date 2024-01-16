const express = require("express");
const app = express();
const cors = require("cors");
const bodyPaser = require("body-parser")

app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({extended:false}));
app.use(cors({origin : "*"}));

app.get("/", (req,res)=>{
    res.send("hellow Davit");
    })


require("./src/routes/product.route")(app)

const port = 8080
app.listen(port,()=>{
    console.log("http://localhost:"+port)
})