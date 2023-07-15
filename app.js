const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
//express app
const app = express();

//connect to mongodb
const DbUri =
  "mongodb+srv://narminshamil:test1234@cluster0.0sq0tbt.mongodb.net/note-tuts?retryWrites=true&w=majority";
mongoose
  .connect(DbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => {
    console.log(err);
  });

//register view engine
app.set("view engine", "ejs");

//middleware & static files
app.use(express.static("public"));
//morgan- third-party middleware
app.use(morgan("dev"));

//mongoose and mongo sandbox routes
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "new Blog 3",
    snippet: "about my new blog",
    body: "more about my new blog",
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//get blog collections
app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//get a single blog
app.get("/single-blog", (req, res) => {
  Blog.findById("64b1c3f3b950c09b9dcd0e1e")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/", (req, res) => {

  res.redirect('/blogs')
});

app.get("/about", (req, res) => {
  // res.send('<p>about page</p>')
  //  res.sendFile('./views/about.html',{root:__dirname})
  res.render("about", { title: "About" });
});

//redirects
// app.get('/about-us',(req, res)=>{
//     res.redirect('/about')
// })

//blog routes
app.get('/blogs',(req, res)=>{
  Blog.find().sort({createdAt:-1})
      .then((result)=>{
        res.render('index',{title:'All blogs',blogs:result})
      })
      .catch((err)=>{
        console.log(err)
      })
})


app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

//404 page
app.use((req, res) => {
  // res.status(404).sendFile('./views/404.html',{root:__dirname})
  res.status(404).render("404", { title: "404" });
});
