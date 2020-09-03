const http = require("http")
const path = require("path")
const url = require("url")
const fs = require("fs")

const app = http.createServer()

app.on('request', function (request, response) {
  response.writeHead(200,{
    "Content-Type": "text/html;charset=UTF-8"
  })
  if (request.url !== "./favicon.ico") {
    let pathName = url.parse(request.url, true).pathname
    let urlPath = path.join(__dirname, "public", pathName)
    fs.readFile(urlPath, (err, data) => {
      console.log(data)
      console.log(data.toString())
      if (err) {
        response.end(JSON.stringify({
          msg: err,
          code: -1,
        }))
      } else {
        response.end(JSON.stringify({
          msg: 'success',
          code: 0,
          data: data.toString()
        }))
      }
    })

    
  }
})

app.listen(8088, function () {
  console.log('服务器启动成功......')
})