import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) =>{
    res.render("index.ejs");
});
app.get("/postCreations", (req, res) =>{
    res.render("postCreations");
});

app.post("/submit", (req,res)=>{
    const title = req.body.title;
    const content = req.body.content;
    console.log(title, content);
    res.render("index.ejs", {title: title, content: content});
});
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});