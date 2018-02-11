const express = require('express');
const router = express.Router();
const usersModel = require('../../models/models-nm/user.model');

router.get('/', global.secure('admin'), function(request, response) {
	usersModel.listparticipante(function(participante) {
		response.set("Content-Type", "text/html");
		response.render('./admin/participante', {
			participante : participante
		})
	})	
});
router.get('/:user_participante', global.secure('admin'),  function(request, response) {
	usersModel.readparticipante(request.params.user_participante, function(participante) {
		if (participante != undefined) {
			response.set("Content-Type", "text/html");
			response.render('./admin/participante_edit', {
				isNew: false,
				participante : participante,
				errors: []
			})		
		}else{
			response.status(404).end();
		}
	})	
});

router.post('/:user_participante', function(request, response) {	
	//request.checkBody('user', 'username should have between 8 and 25 chars').isLength({min: 8, max: 25});
	//request.checkBody('nome', 'nome should have between 8 and 25 chars').isLength({min: 8, max: 25});
	//request.checkBody('email', 'email should have between 8 and 20 chars').isLength({min: 8, max: 20});
	//request.checkBody('nif', 'nif should have between 8 and 15 chars').isLength({min: 8, max: 15});
	var data = {
		'user_participante': request.body.user_participante,
		'nome_participante': request.body.nome_participante,
		'email_participante': request.body.email_participante,	
		'nif_participante': request.body.nif_participante	
        
        

	};
	var errors = request.validationErrors();	
	if (errors) {
		data.user_participante = request.params.user_participante;
		response.render('./admin/user_participante', {
			isNew: false,
			participante: data,
			errors: errors
		});
	}else{	
		usersModel.updateparticipante(request.params.user_participante, data, function(){
			response.redirect('/participante/');
		});
	}
});
router.get('/:user_participante/delete', global.secure('admin'),  function(request, response){
	usersModel.removeparticipante(request.params.user_participante, function() {
		response.redirect('/participante');
	})	
});

module.exports = router;