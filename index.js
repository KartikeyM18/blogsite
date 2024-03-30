import express from "express";

const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("homepage.ejs",{title: title, content: cont});
});

app.get("/create", (req, res) => {
    res.render("create.ejs");
});

let title = []; 
let cont = [];
  

app.post("/create", (req, res) => {
    title.push(req.body["title"]);
    cont.push(req.body["content"]);
    res.redirect("/");
});


app.post("/edit", (req,res) => {
    const key = Object.keys(req.body);
    // console.log(key);
    if(key[0][0] === 'd'){
        const index = Number(key[0][key[0].length -1]);
        title.splice(index,1);
        cont.splice(index,1);
        res.redirect("/");
    }
    else{
        const index = Number(key[0][key[0].length -1]);
        var objToSend = {
            title: title[index],
            content: cont[index],
            index: index,
        };
        // console.log(objToSend);
        res.render("edit.ejs", objToSend);
    }
    
    
});


app.post("/update", (req, res) =>{
    const key = Object.keys(req.body);
    var index = key[0];
    // console.log(index);
    title[index] = req.body["title"];
    cont[index] = req.body["content"];
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening at port ${port}.`);
});

