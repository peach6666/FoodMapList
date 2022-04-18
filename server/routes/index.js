var express = require('express');
var router = express.Router();

/* GET home page. */
let data=[
  
]

router.post('/',function(req,res,next){
  const list=req.body
  data.push({
    //...為展開運算子，把list陣列展開
    ...list,
    id:new Date().getTime()
  })
  res.send({data})
  res.end();
});

router.get('/', function(req, res, next) {
  res.json(data)
  res.end();
});

router.delete('/:id', function(req, res, next) {
  //req.params就是前端請求物件的參數，這邊的id就是storeInf的id
  const deleteObject=req.params.id
  //遍歷整個data物件，第一參數就是目前代入的物件，第二參數是索引值
  //此函式用以刪除符合id的該筆資料
  data.forEach((item,key)=>{
    if(item.id==deleteObject){
      data.splice(key,1)
    }
  })
  res.send({
    success:true,
    data
  })
  res.end();
});

module.exports = router;