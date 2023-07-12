const express = require('express')
const morgan = require('morgan')
//express app
const app=express();

//register view engine
app.set('view engine','ejs')

//listen for requests
app.listen(3000);

//morgan- third-party middleware
app.use(morgan('dev'))
// app.use(morgan('tiny'))
// app.use(morgan('short'))
// app.use(morgan('combined'))

// app.use((req, res, next) => {
//     console.log('new request made:');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     next(); // tells what to do next or proceed to the next func
// });


//middleware & static files
app.use(express.static('public'))


app.get('/', (req, res)=>{
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    ];
   // res.send('<p>home page</p>')
   //  res.sendFile('./views/index.html',{root:__dirname})
    res.render('index',{title:'Home',blogs})
})


app.get('/about', (req, res)=>{
   // res.send('<p>about page</p>')
   //  res.sendFile('./views/about.html',{root:__dirname})
    res.render('about',{title:'About'})
})

//redirects
// app.get('/about-us',(req, res)=>{
//     res.redirect('/about')
// })

app.get('/blogs/create',(req, res)=>{
res.render('create',{title:'Create a new blog'})
})

//404 page
app.use((req, res)=>{
    // res.status(404).sendFile('./views/404.html',{root:__dirname})
    res.status(404).render('404',{title:'404'})
})
