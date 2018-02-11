const express = require('express');
const router = express.Router();


router.get('/', global.secure('admin'), function(request, response){
	//console.log(request.user);
	//console.log(request.isAuthenticated());
	response.set("Content-Type", "text/html");
    response.render('./admin/admin1', {});
});
router.get('/financas', function(request, response){
	//console.log(request.user);
	//console.log(request.isAuthenticated());
	response.set("Content-Type", "text/html");
    response.render('./admin/financas', {});
});

/*router.get('/patrocinio', function(request, response){
	//console.log(request.user);
	//console.log(request.isAuthenticated());
	response.set("Content-Type", "text/html");
    response.render('./admin/patrocinio', {});
});*/

/*router.get('/speakers', function(request, response){
	//console.log(request.user);
	//console.log(request.isAuthenticated());
	response.set("Content-Type", "text/html");
    response.render('./admin/speakers', {});
});*/

module.exports = router;