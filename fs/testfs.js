const fs = require('fs')
const Q = require('q')
const exec = require('child_process').exec
// const data = require(`../qiniu/img/img_of_user/123.jpg`)

// fs.readFile('../qiniu/img/img_of_user/123.jpg', (err, data) => {
//   if (err) {
//     if (err.code === "ENOENT") {
//       console.error('myfile does not exist');
//       return;
//     } else {
//       throw err;
//     }
//   }
//   console.log(data)
//   fs.writeFile('./fs.jpg',data,(err)=>{
//     if(err)
//       console.log(err)
//   })
//   fs.writeFile('./123.text',"123",(err)=>{
//     if(err)
//       console.log(err)
//   })
//   return data
// })

function changeUserImg(id,data){
  let base64Data = data.replace(/^data:image\/\w+;base64,/, "")
  let dataBuffer = new Buffer(base64Data,'base64')
  fs.writeFile('./qiniu/img/img_of_user/'+id+'.jpg',dataBuffer,(err)=>{
    if(err) console.log(err)
    else{
      let cmd = "cd qiniu && node qiniuTest.js user"
      exec(cmd,(err)=>{
        if(err)
          console.log(err)
      })
    }
  })

}

exports.changeUserImg = changeUserImg

