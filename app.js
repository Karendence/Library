const express = require('express')
const superagent = require('superagent')
const cheerio = require('cheerio')
const Q = require('q')
const bodyParser = require('body-parser');
const multer = require('multer');
const testLogin = require('./database/user/testLogin')
const getBorrowInfo = require('./database/user/getBorrowInfo')
const getNews = require('./database/news/getNews')
const getHot = require('./database/book/getHotBorrow')
const getNewBook =require('./database/book/getNewBook')
const latestComment = require('./database/book/latestComment')
const collect = require('./database/user/collect')
const getHotCollect = require('./database/book/getHotCollect')
const getHotComment = require('./database/book/getHotComment')
const getInfo = require('./database/user/getInfo')
const changeInfo = require('./database/user/changeInfo')
const changeUserImg = require('./fs/testfs')


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
  console.log(req)
  runStore.runStore(id,req.files.file.originalname,req.files.file.path,req.files.file.name,req.files.file.size)
  res.json({result:"success"})
})

app.get('/gettest',(req,res)=>{
  console.log(req.query)
  if(req.query.userid){
    rungetStore.rungetStore(req.query.userid).then((data)=>{
      res.json(data)
    })
  }
})

app.get(/download+\d{3}$/,(req,res)=>{
  let string = './cache/'+req.path.substring(9,12)+'/'+req.query.name
  res.download(string)
})





app.get('/getHotCollect',(req,res)=>{//热门收藏
  getHotCollect.getHotCollect().then((data)=>{
    res.json(data)
  })
})

app.get('/getHotComment',(req,res)=>{
  getHotComment.getHotComment().then((data)=>{
    res.json(data)
  })
})

app.post('/getBorrowInfo',(req,res)=>{
  getBorrowInfo.getBorrowInfo(req.body.id).then((data)=>{
    res.json(data)
  })
})

app.post('/getUserInfo',(req,res)=>{//当前登录用户所有信息
  getInfo.getInfo(req.body.id).then((data)=>{
    res.json(data)
  })
})

app.post('/getUserImg',(req,res)=>{
  changeUserImg.changeUserImg(req.body.id,req.body.userimg)
  res.json({result:"success"})
})

app.post('/changeUserInfo',(req,res)=>{///修改用户信息
  changeInfo.changeInfo(req.body).then((data)=>{
    res.json(data)
  })
})

app.get('/latestComment',(req,res)=>{//首页最新评论
  latestComment.latestComment().then((data)=>{
    res.json(data)
  })
})

app.post('/login',(req,res)=>{//登录
  let data = req.body
  testLogin.testLogin(data.userName,data.pwd).then((result)=>{
    console.log(result)
    if(result.length==0) res.json("fail")
    else {res.json(result)}
  })
})

app.post('/collect',(req,res)=>{//收藏某本书籍
  let data = req.body
  collect.collect(req.body.userid,req.body.bookid).then((data)=>{
    res.json(data)
  })
})


app.get('/getNews5',(req,res)=>{//获取最新的新闻
  getNews.getNews().then((data)=>{
    res.json(data)
  })
})



app.get('/getNewBooks',(req,res)=>{//新进的书籍
  getNewBook.getNewBook().then((data)=>{
    res.json(data)
  })
})

app.get('/getBookHot',(req,res)=>{//热门借阅
  getHot.getHot().then((data)=>{
    res.json(data)
  })
})

app.listen(3000,function(){
})