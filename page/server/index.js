const strFunction = require('./js/strFunction.js')
const http = require("http")
const path = require("path")
const url = require("url")
const fs = require("fs")

const app = http.createServer()

app.on('request', function (request, response) {
  
  if (request.url !== "./favicon.ico") {
    let pathName = url.parse(request.url, true).pathname
    response.writeHead(200,{
      "Content-Type": strFunction(pathName) + ";charset=UTF-8"
    })
    let urlPath = path.join(__dirname, pathName)
    fs.readFile(urlPath, (err, data) => {
      if (err) {
        response.end(JSON.stringify({
          msg: err,
          code: -1,
        }))
      } else {
        // response.end(JSON.stringify({
        //   msg: 'success',
        //   code: 0,
        //   data: data.toString()
        // }))
        response.end(data)
      }
    })

    
  }
})

app.listen(8088, function () {
  console.log('服务器启动成功......')
})