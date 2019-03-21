let express = require('express')
let router = express.Router()
let fs = require('fs')
let path = require('path')

router.post('/picture-upload', function(req, res) {
	console.log(req.body)
  console.log(req.files)
  console.log(req.files.file_data.path)
  // 获得文件的临时路径
  //var tmp_path = req.files.thumbnail.path
  var tmp_path = req.files.file_data.path
 	// 指定文件上传后的目录 - 示例为"images"目录。 
  var splitlast = req.files.file_data.name.split('.').length - 1
  var target_path = './userData/' + req.files.file_data.name.split('.')[splitlast]
  fs.exists(target_path, function (exist) {
	  if(!exist){
	    fs.mkdir(target_path, function(err){
	      if (err) {
	        return console.error(err)
	      }
	      console.log("目录创建成功。")
	    })
	  } //true
	})

	// 移动文件 
	try{
	  fs.rename(tmp_path, target_path, function(err) {
	    if (err) throw err
	    // 删除临时文件夹文件,
	    var list
	    if(req.files.file_data.name.split('.')[splitlast]=="xlsx"){
	      list = xlsx.parse(target_path)
	    }
	    fs.unlink(tmp_path, function() {
	      if (err) throw err
	        if(!!list){
						console.log(list)
						res.send(list)
						list.map(function(v) {
							console.log(v.name)
							v.data.map(function(val) {
								console.log(val)
							})
						})
					}
				res.send('File uploaded to: ' + target_path + ' - ' + req.files.file_data.size + ' bytes')
			})
		})
	} catch (error) {
		throw error
	}
})
module.exports = router
