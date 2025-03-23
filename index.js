import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

//absolute Path to the JSON File
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const postsFile = path.join(__dirname, "data", "posts.json");


const app = express();
const port = 3000;
//const publish = [];


app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) =>{
    // reads the content of the file and save it on data
  const data = fs.readFileSync(postsFile, "utf-8");
    //parses the JSON string into an array
  const publish = JSON.parse(data);
  res.render("index.ejs", { publish });
    
});
app.get("/postCreations", (req, res) =>{
    res.render("postCreations");
});

app.post("/submit", (req,res)=>{
   
    const posts = {
       id: Date.now(),
       title: req.body.title,
       content: req.body.content
   };
   const data = fs.readFileSync(postsFile, "utf-8");
   const publish = JSON.parse(data);

    publish.push(posts);

    // Save back to file
    fs.writeFileSync(postsFile, JSON.stringify(publish, null, 2));
       res.redirect("/");
   });
app.get("/edit/:id", (req,res) =>{
    // get id from the URL
    const id = Number(req.params.id); 
    console.log(req.params.id);
    // load posts
    const dataPosts = JSON.parse(fs.readFileSync(postsFile, "utf-8")); 
    // find the matching post
    const postToEdit = dataPosts.find(post => post.id === id);
    console.log(postToEdit); 
    res.render("postEdit.ejs", {post: postToEdit});
});
app.post("/edit/:id", (req,res) =>{
//1. Read posts.json ➝ get all posts
const data = fs.readFileSync(postsFile, "utf-8");
const publish = JSON.parse(data);

//2. Find the post where post.id === id
const id = Number(req.params.id); 
const postToEdit = publish.find(post => post.id === id);

//3.Update that post’s title & content with req.body.title and req.body.content 
if (postToEdit) {
    postToEdit.title = req.body.title;
    postToEdit.content = req.body.content;
  }
//4.Write the entire updated array back to posts.json using fs.writeFileSync
fs.writeFileSync(postsFile, JSON.stringify(publish, null, 2));

//5.Redirect to /       
res.redirect("/");

});
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});