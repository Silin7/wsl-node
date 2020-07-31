const http = require("http")
const url = require("url")


const app = http.createServer(function (req, res) {
  console.log(req.url)
  console.log()
  if (req.url !== "./favicon.ico") {
    res.writeHead(200,{
      "Content-Type": "text/html;charset=UTF-8"
    })
    // 
    let urlmsg = url.parse(req.url, true)
    console.log(urlmsg)
    console.log(urlmsg.query.name)
    console.log(urlmsg.query.password)
    // 
    res.end(JSON.stringify({
      msg: 'success',
      code: 0,
    }))
  }
})

app.listen(8088)