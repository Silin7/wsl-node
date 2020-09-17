const express = require('express')
const app = express()
const xlsx = require('node-xlsx')
const fs = require('fs')

app.use('/', (req, res, next) => {
  fs.readdir('./input', function (err, files) {
    files.forEach((file) => {
      if (file === 'myFile.xlsx') {
        let path = `${__dirname}/input/${file}`;
        let data = xlsx.parse(`${__dirname}/input/myFile.xlsx`)[0].data
        console.log(xlsx.parse(`${__dirname}/input/myFile.xlsx`))
        console.log(data)
        var buffer = xlsx.build([{ name: "王思林test", data: data }]); 
        fs.writeFile(path.replace(/input/, 'output').replace(/\./, '修改版.'), buffer, function(err){ 
          if (err) {
              console.log(err);
              return ;
          } else {
            res.end('success')
          }
        });
      }
    })
  })
  next();
})

app.use('/login', (req, res, next) => {
  console.log('登录了！')
  next();
})

app.listen(8088, function () {
  console.log('服务器启动成功......')
})