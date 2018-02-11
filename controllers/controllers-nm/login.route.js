const express = require('express');
const router = express.Router();
const usersModel = require('../../models/models-nm/user.model');

router.get('/', function(request, response){
	if (request.isAuthenticated()) {
		response.redirect('/');
		return;
	}
	console.log(request.username);
	console.log(request.isAuthenticated());
	response.set("Content-Type", "text/html");
    response.render('./index/login3', { errors: [], errors2: [] });
});
	
router.get('/bilheteira', function(request, response){
	//console.log(request.user);
	//console.log(request.isAuthenticated());
	response.set("Content-Type", "text/html");
    response.render('./index/bilheteira', {});
});


router.post('/', function(request, response) {
	request.checkBody('username', 'Username invalido').isLength({min: 1, max: 30});
	request.checkBody('password', 'Password invalida').isLength({min: 1, max: 30});
	var errors2 = request.validationErrors();
	
	if (errors2) {
		response.render('./index/login3', { errors2: errors2 ,errors : []});
		return;
	}

	usersModel.areValidCredentials(request.body.username, request.body.password, function(areValid) {
		if (areValid) {
			//Create the login session
			request.login(request.body.username, function(err) {
				response.redirect('/bilheteira');
			});		
		}else{
			response.render('./index/login3', { errors2: [
				{ msg: 'Username ou Password incorretas' }
			], errors : []});
		}
	});
});



/*router.post('/registo', function(request, response) {
	request.checkBody('user_participante', 'Username should have between 2 and 30 chars').isLength({min: 3, max: 30});
	request.checkBody('email_participante', 'Email not valid').isEmail();
	request.checkBody('password_participante', 'Password should have between 4 and 30 chars').isLength({min: 4, max: 30});
	request.checkBody('nome_participante', 'nome should have between 2 and 30 chars').isLength({min: 4, max: 30});
	request.checkBody('nif_participante', 'Not a NIF').isLength({min: 4, max: 30});

	var errors = request.validationErrors();	
	if (errors) {
		response.render('./index/registo', {
			isNew: true,
			participantes: {},
			errors: errors, errors2 : [],
			
		});
	}else{
		var data = {
			'nome_participante': request.body.nome_participante,
			'email_participante': request.body.email_participante,
			'nif_participante': request.body.nif_participante,
			'password_participante': request.body.password_participante,
			'user_participante': request.body.user_participante
			
		};
		usersModel.createparticipante(data, function(){
			request.login(request.body.user_participante, function(err) {
				response.redirect('/bilheteira');
			});
		});
	}
}); */
module.exports = router;