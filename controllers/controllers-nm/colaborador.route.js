const express = require('express');
const router = express.Router();
const colabModel = require('../../models/models-nm/colab.model');

router.get('/', global.secure('admin'), function(request, response) {
	colabModel.listacolab(function(colaborador) {
		response.set("Content-Type", "text/html");
		response.render('./admin/colaborador', {errors: [], 
			colaborador : colaborador
		})
	})	
});
router.post('/colab', function(request, response) {
	request.checkBody('user_colaborador', 'Username deverá ter entre 1 a 20 caracteres!').isLength({min: 1, max: 20});
	request.checkBody('nome_colaborador', 'Nome do colaborador deverá ter entre 1 a 20 caracteres!').isLength({min: 1, max: 20});
	request.checkBody('email_colaborador', 'O email inserido não é válido! Tente de novo!').isEmail();
	request.checkBody('telefone_colaborador', 'O telefone inserido não é válido! Tente de novo!').isLength({min: 9, max: 9});
	request.checkBody('funcao_colaborador', 'Função do colaborador deverá ter entre 1 a 30 caracteres!').isLength({min: 1, max: 30});
	request.checkBody('nif_colaborador', 'NIF inserido não é válido! Tente de novo!').isLength({min: 1, max: 9});
	request.checkBody('salario_colaborador', 'Salário do colaborador deverá ter entre 1 a 8 caracteres!').isLength({min: 1, max: 8});
	request.checkBody('password_colab', 'Password deverá ter entre 4 a 16 caracteres ').isLength({min: 4, max: 16});

	var errors = request.validationErrors();
	
	if(!request.files)
	if (errors) {
		colabModel.listacolab(function(colaborador) {
		response.render('./admin/colaborador', {
			isNew: true,
			colaborador : {},
			errors: errors,
			colaborador : colaborador
		});
	});

	}else{
		var data = {
			'user_colaborador': request.body.user_colaborador,
			'nome_colaborador': request.body.nome_colaborador,
			'email_colaborador': request.body.email_colaborador,
			'telefone_colaborador': request.body.telefone_colaborador,
			'funcao_colaborador': request.body.funcao_colaborador,
			'nif_colaborador': request.body.nif_colaborador,
			'salario_colaborador': request.body.salario_colaborador,
			'tipo_colab': request.body.tipo_colab,
			'password_colab': request.body.password_colab
		};
		colabModel.createcolab(data, function(){
			response.redirect('/colaborador');
		});
	}
}); 
router.get('/:user_colaborador', global.secure('admin'),  function(request, response) {
	colabModel.readcolab(request.params.user_colaborador, function(colaborador) {
		if (colaborador != undefined) {
			response.set("Content-Type", "text/html");
			response.render('./admin/colab_edit', {
				isNew: false,
				colaborador : colaborador,
				errors: []
			})		
		}else{   
			response.status(404).end();
		}
	})	
});

router.post('/:user_colaborador', function(request, response) {	
	request.checkBody('nome_colaborador', 'Nome do colaborador deverá ter entre 1 a 20 caracteres!').isLength({min: 1, max: 20});
	request.checkBody('email_colaborador', 'O email inserido não é válido! Tente de novo!').isEmail();
	request.checkBody('telefone_colaborador', 'O telefone inserido não é válido! Tente de novo!').isLength({min: 9, max: 9});
	request.checkBody('funcao_colaborador', 'Função do colaborador deverá ter entre 1 a 30 caracteres!').isLength({min: 1, max: 30});
request.checkBody('salario_colaborador', 'Salário do colaborador deverá ter entre 1 a 8 caracteres!').isLength({min: 1, max: 8});	
	
	var errors = request.validationErrors();
	var data = {
		
		'nome_colaborador': request.body.nome_colaborador,
		'email_colaborador': request.body.email_colaborador,	
		'telefone_colaborador': request.body.telefone_colaborador,	
        'funcao_colaborador': request.body.funcao_colaborador,
        'salario_colaborador': request.body.salario_colaborador,
        

	};
	
	if(!request.files)
	
	if (errors) {
		data.user_colaborador = request.params.user_colaborador;
		response.render('./admin/colab_edit', {
			isNew: false,
			colaborador: data,
			errors: errors
		});

	}else{	

		colabModel.updatecolab(request.params.user_colaborador, data, function(){
			response.redirect('/colaborador/');
		});
	}
});
router.get('/:user_colaborador/delete', global.secure('admin'),  function(request, response){
	colabModel.removecolab(request.params.user_colaborador, function() {
		response.redirect('/colaborador');
	})	
});


module.exports = router;