const fs = require('fs')
const store = require('./store') 
// const exec = require('child_process').exec

// fs.open('../cache/123','wx',(err,fd)=>{
//     console.log(111)
// })



function runStore(id,oriname,path,name,size){
  let foldername = './cache/'+id+'/'
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
      fs.writeFile(foldername+name,data,(err)=>{
        if(err)
          console.log(err)
      })
    }
  })
  let type = name.split('.')[1]
  console.log(type)
  store.store(id,oriname,name,type,size).then((res)=>{
    fs.unlink(path,(err)=>{               //删除最初的地址中的文件
      if(err) console.log(err)
    })
  })
}

exports.runStore = runStore
// runStore(123)