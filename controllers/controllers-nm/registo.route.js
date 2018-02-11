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
    response.render('./index/registo', { errors: [], errors2: [] });
});
	
router.get('/bilheteira', function(request, response){
	//console.log(request.user);
	//console.log(request.isAuthenticated());
	response.set("Content-Type", "text/html");
    response.render('./index/bilheteira', {});
});


router.post('/', function(request, response) {
	request.checkBody('user_participante', 'Username deverá ter entre 3 a 20 caracteres!').isLength({min: 3, max: 20});
	request.checkBody('email_participante', 'O email inserido não é válido!').isEmail();
	request.checkBody('password_participante', 'Password deverá ter entre 4 a 20 caracteres!').isLength({min: 4, max: 20});
	request.checkBody('nome_participante', 'Nome deverá ter entre 4 a 20 caracteres!').isLength({min: 4, max: 20});
	request.checkBody('nif_participante', 'NIF inserido não é válido!').isLength({min: 4, max: 30});

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
}); 
module.exports = router;