/**

     * success response method.

*/

var sendResponse = function(res,result, message){
						var response = {success:'true', 'data' : result, 'message': message};
						res.contentType('application/json');
						res.status(200).send(JSON.stringify(response));			   			   
                   }

 /**

     * return error response.

     *

*/
				   
				   
var sendError = function(res, message){
						var response = {success:'false', 'message': message};
						res.contentType('application/json');
						res.status(200).send(JSON.stringify(response));			   			   
                   }				   



module.exports = { sendResponse:sendResponse,
                   sendError:sendError
                 }; //function export to used another module

//module.exports = sendError;//function export to used another module
