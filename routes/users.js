var express = require('express');
var router = express.Router();
//var colors = require('colors/safe'); // does not alter string prototype
//console.log(colors.red('This String Will Display RED'));


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

 var multer  =   require('multer');  
	
 var storage =   multer.diskStorage({  
				  destination: function (req, file, callback) {  
					callback(null, 'public/images/uploads');  
				  },  
				  filename: function (req, file, callback) {  
					callback(null, file.originalname);  
				  }  
			 });

var upload = multer({ storage : storage}); 
/* File Upload. */
router.post('/adduser',upload.single('myfile'),function(req, res, next) {
	
	//Set Error Messages 
	const firstNameRequired = 'First Name is required!';
	const lastNameRequired = 'Last Name is required!';
	var firstNameRequiredmsg='';
	var lastNameRequiredmsg='';
	var firstname='';
	var lastname='';
    //const emailRequired = 'Email is required!';
    //const emailNotValid = 'Email is wrong!';


    // Start Validation
    var a=req.checkBody('firstname', firstNameRequired).notEmpty();
    req.checkBody('lastname', lastNameRequired).notEmpty();
   // req.checkBody('employeeEmail', emailNotValid).isEmail();
    //req.checkBody('employeeMobile', mobileRequired).notEmpty();

    //req.sanitize('employeeName').trim();
   // req.sanitize('employeeName').escape();
    // End Validation
   var errors = req.validationErrors();
    console.log(errors);
	console.log(a);
	console.log(req.body);
	console.log(req.body.firstname);
	console.log(upload);
    if(!errors){
		    firstname = req.body.firstname,
            lastname  = req.body.lastname,
			country = req.body.country,
            subject  = req.body.subject,
			res.render('index', { title: 'Express',firstnameSet: firstname,lastnameSet:lastname });
       
    }else{
        //console.log(employeeData.employeeName);
       // const userFirstnameRequired = errors.find(el => el === firstNameRequired );
         // var userLastNameRequired = errors.find(el => el === lastNameRequired);
       // const employeeEmailNotValid = errors.find(el => el === emailNotValid);
       // const employeeMobileRequired = errors.find(el => el === mobileRequired);
	   for (var i = 0; i < errors.length; i++) {
		   if(firstNameRequired==errors[i].msg){
			   firstNameRequiredmsg=firstNameRequired;
		   }
		   if(lastNameRequired==errors[i].msg){
			   lastNameRequiredmsg=lastNameRequired;
		   }
              
       }
      // console.log(userLastNameRequired);
        res.render('index',{
            firstNameRequiredmsgerr : firstNameRequiredmsg,
			lastNameRequiredmsgerr : lastNameRequiredmsg,
			firstnameSet:'',
			lastnameSet:'',
			errors:errors,
			title: 'Express',
        });
		//res.render('error');
    }
	
	
	
	 /* req.checkBody("firstname", "Enter a valid email address.").notEmpty();

	  var errors = req.validationErrors();
	  if (errors) {
		res.send(errors);
		return;
	  } else {
		// normal processing here
		res.send('aaaa');
	  }*/
});
module.exports = router;
