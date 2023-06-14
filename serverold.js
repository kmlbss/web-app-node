const http=require('http')
const fs=require('fs')

const serverold=http.createServer((req, res)=>{
    //console.log('request made') // this is running in the server not in the browser
    console.log(req.url,req.method)
    //set header content type
    // res.setHeader('Content-Type','text/plain');
    //
    // res.write("hello, this is kamala")
    //
    // res.end();// 3 steps

    // res.setHeader('Content-Type','text/html')
    // res.write('<p>hello</p>')
    // res.write('<p>hello,again</p>')
    // res.end()

    //returning html pages
    res.setHeader('Content-Type','text/html')
    //send an html file
    fs.readFile('./views/index.html',(err, data)=>{
        if(err) {
            console.log(err)
            res.end()
        }
        else{
            // res.write(data)
            res.end(data)
        }
    })



})

serverold.listen(3000,'localhost',()=>{
    console.log('listening for request on port 3000')
})