



const express = require('express')
const app = express()
const xlsx = require('node-xlsx')
const fs = require('fs');


app.get('/login/get', (req, res, next) => {
  console.log(req.query)
  console.log(req.query.name)
  console.log(req.query.password)
  
//readdir为读取该文件夹下的文件

  fs.readdir('./input', function(err,files){
    files.forEach((file) => {
        let path = `${__dirname}/input/${file}`;
        console.log(path);
        //表格解析
        let sheetList = xlsx.parse(path);
        //对数据进行处理
        sheetList.forEach((sheet) => {
            sheet.data.forEach((row, index) => {
                let rowIndex = index;
                row.forEach((cell, index) => {
                    let colIndex = index;
                    if(cell !== undefined){
                        sheet.data[rowIndex][colIndex] = cell.replace(/replaced text1/g, '').replace(/replaced text2/g, '');
                        let reg = /\{([\u4e00-\u9fa5\.\w\:\、\/\d\s《》-]*)\|[\u4e00-\u9fa5\.\w\:\、\/\d\s《》-]*\}/;
                        let tempStr = sheet.data[rowIndex][colIndex];
                        while(reg.test(tempStr)){
                            tempStr = tempStr.replace(reg, RegExp.$1);
                            // console.log(tempStr);
                        }
                        sheet.data[rowIndex][colIndex] = tempStr;
                    }
                })
            })
            console.log(sheet);
        })
        //数据进行缓存
        let buffer = xlsx.build(sheetList);
        //将缓存的数据写入到相应的Excel文件下
        fs.writeFile(path.replace(/input/, 'output').replace(/\./, '修改版.'), buffer, function(err){ 
            if (err) {
                console.log(err);
                return ;
            }
        });
    })
  })
})

app.listen(8088, () => {
  console.log('服务器启动成功......')
})