var express = require('express');
var router = express.Router();
var response = require('./response');//response.js imported and used  sendResponse function

/* GET users listing. */
router.post('/users', function(req, res, next) {
	
  /*-------Fetch data from url------------*/
   var name=req.query.name;
   var phone=req.query.phone;
 /*---------------------------------------*/  
   
  var query = "INSERT INTO users (user_name,user_phone) VALUES (?,?)";
 
  dbConfig.connect(function(err) {
	  
	    if (err) throw response.sendError(res,err);
	    dbConfig.query( query,[ name, phone], function (err, result) {
			if (err) throw response.sendError(res,err); 
			else{
				
				response.sendResponse(res,result.insertId,'users inserted succesfully.');   
			}
	   });
  })
  console.log("Result: " + req.query.name);
  
  //res.send('respond with a resource');
});

module.exports = router;
