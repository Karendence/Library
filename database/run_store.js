const fs = require('fs')
const store = require('./store')
const solr = require('solr-client')
// const exec = require('child_process').exec

// fs.open('../cache/123','wx',(err,fd)=>{
//     console.log(111)
// })

// Create a client
let host = "127.0.0.1"
let port = "8983"
let core = "run"
let path = "/solr"
var client = solr.createClient(host,port,core,path)

client.autoCommit = true

function runStore(id,oriname,path,name,size){
  let foldername = './cache/'+id+'/'
  let run = "C:\\Library\\cache\\"+id+"\\"+oriname
  fs.exists(foldername,(err,fd)=>{    //判断是否存在当前用户的文件夹
    if(err)
      console.log(err)
    else {
      fs.mkdir(foldername,(err)=>{     //如果不存在就创建一个
        if(err) console.log(err)
      })
    }
  })

  fs.readFile(path,(err,data)=>{       //将其转移到目标文件夹中同时在数据库中生成对应
    if(err)
      console.log(err)
    else{
      fs.writeFile(foldername+oriname,data,(err)=>{
        if(err)
          console.log(err)
      })

  var options = {   //上传的文件
   path : run,
   format : 'extract'
 }

 client.addRemoteResource(options,function(err,obj){  //上传索引库的配置
    if(err){
       console.log(err)
    }else{
       console.log(obj)
    }
   client.commit(function(err,res){  //设置commit=true
     if(err) console.log(err)
     if(res) console.log(res)
   })
 })




    }
  })
  let type = name.split('.')[1]
  console.log(type)
  store.store(id,oriname,oriname,type,size).then((res)=>{
    fs.unlink(path,(err)=>{               //删除最初的地址中的文件
      if(err) console.log(err)
    })
  })
}

exports.runStore = runStore
// runStore(123)