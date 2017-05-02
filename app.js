const express = require('express')
const Q = require('q')
const bodyParser = require('body-parser');
const multer = require('multer')



const getInfo = require('./database/user/getInfo')



const testLogin = require('./database/user/testLogin')
const runStore = require('./database/run_store')
const rungetStore = require('./database/rungetStore')


let app = express()

app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.all('*', function(req, res, next) {//开发模式下允许跨域访问
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With,Authorization');
    next();//对于所有的路由执行下面的操作
});

app.post('/gettest',(req,res)=>{             //上传文件
  let id = req.query.userid
  runStore.runStore(id,req.files.file.originalname,req.files.file.path,req.files.file.name,req.files.file.size)
  res.json({result:"success"})
})

app.get('/gettest',(req,res)=>{ //下载的表显示出来
  if(req.query.userid){
    rungetStore.rungetStore(req.query.userid).then((data)=>{
      res.json(data)
    })
  }
})

app.get(/download+\d{3}$/,(req,res)=>{ //下载
  let string = './cache/'+req.path.substring(9,12)+'/'+req.query.name
  res.download(string)
})

app.get('/biao',(req,res)=>{
    testLogin.getChart(req.query.userid).then((data)=>{
        res.json(data)
    })
})





app.post('/getUserInfo',(req,res)=>{//当前登录用户所有信息
  getInfo.getInfo(req.body.id).then((data)=>{
    res.json(data)
  })
})


app.post('/login',(req,res)=>{//登录
  let data = req.body
  console.log(req.body)
  testLogin.testLogin(data.userName,data.pwd).then((result)=>{
    
    if(result.length==0) res.json("fail")
    else {res.json(result)}
  })
})

app.listen(3000,function(){
})