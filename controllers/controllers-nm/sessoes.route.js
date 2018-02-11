const express = require('express');
const router = express.Router();
const usersModel = require('../../models/models-nm/user.model');
const diaModel = require('../../models/models-nm/dia.model');
const speakerModel = require('../../models/models-nm/speaker.model');
const sessaoModel = require('../../models/models-nm/sessao.model');



router.get('/', global.secure('admin'), function(request, response){
	//console.log(request.user);
	//console.log(request.isAuthenticated());
	diaModel.listdia(function(dia) {
		console.log(dia[0].dia);
		speakerModel.listaspeaker(function(speaker){
		sessaoModel.listasessao(function(sessao){
		response.set("Content-Type", "text/html");
		response.render('./admin/sessoes', { errors: [],
			dia : dia,
			speaker : speaker,
			sessao : sessao
		})
	})
})
})
});



router.post('/sessao', function(request, response) {
	request.checkBody('titulo_sessao', 'Título da sessão deverá ter entre 4 a 30 caracteres!').isLength({min: 4, max: 30});
	
	var errors = request.validationErrors();	

	if (errors) {
        sessaoModel.listasessao(function(sessao) {
        diaModel.listdia(function(dia) {
	    speakerModel.listaspeaker(function(speaker) {
		
		response.render('./admin/sessoes', {
			isNew: true,
			sessao: {}, 
			errors: errors,
			sessao: sessao,
			dia: dia,
			speaker: speaker,
		});
		});	
		});
	
	});
	}else{
		var c   = 	request.body.dia_sessao.split('/') ;
									
									
								var dt2 = parseInt(c[2]) + '-'+ parseInt(c[0])  + '-'+ parseInt(c[1]);
		var data = { 
			'titulo_sessao': request.body.titulo_sessao,
			'dia_sessao': dt2,
			'descricao_sessao' : request.body.descricao_sessao,
			'hora_sessao': request.body.hora_sessao,
			'id_speaker': request.body.id_speaker,
			'hora_fim' :request.body.hora_fim
			
			
		};
		sessaoModel.horaExists(data, function(areValid){
			if(areValid){
				sessaoModel.listasessao(function(sessao) {
					diaModel.listdia(function(dia) {
					speakerModel.listaspeaker(function(speaker) {
						
					response.render('./admin/sessoes', {
						isNew: true,
						sessao: {}, 
						
						sessao: sessao,
						dia: dia,
						speaker: speaker,
						
							
						
							
							errors: [{ msg: 'Já existe sessao a decorrer, escolha outro horario' }]
						
					});
					});	
					});
				
				});
				
	
	
			}else{
				console.log(request.body.dia_sessao);
				sessaoModel.createsessao(data, function(){
					response.redirect('/sessoes');
				});
				
				
			}
			
		});
	}
}); 
router.get('/lista', global.secure('admin'), function(request, response){
	diaModel.listdia(function(dia) {
		speakerModel.listaspeaker(function(speaker){
		response.set("Content-Type", "text/html");
		response.render('./admin/sessoes_list', {
			dia : dia,
			speaker : speaker
		})
	})
})
});

    module.exports = router;