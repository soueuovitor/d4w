const express = require('express');
const router = express.Router();
const usersModel = require('../../models/models-nm/user.model');
const diaModel = require('../../models/models-nm/dia.model');
const speakerModel = require('../../models/models-nm/speaker.model');
const sessaorModel = require('../../models/models-nm/sessao.model');
const bilheteModel = require('../../models/models-nm/bilhete.model');
const patrModel = require('../../models/models-nm/patrocinio.model');



router.get('/', function(request, response){
	console.log(request.user);
	console.log(request.isAuthenticated());
	patrModel.listpatrocinio(function(patrocinio) {
		speakerModel.listaspeaker(function(speaker) {
	response.set("Content-Type", "text/html");
    response.render('./index/home', {
		user: request.user, errors: [],
		patrocinio : patrocinio,
		speaker : speaker
	});  
});  
});  
});
/*router.get('/bilheteira', function(request, response){
	console.log(request.user);
	console.log(request.isAuthenticated());
	response.set("Content-Type", "text/html");
    response.render('./index/bilheteira', {});
});*/
router.get('/eventos', function(request, response){
	//console.log(request.user);
	//console.log(request.isAuthenticated());
	diaModel.listdia(function(dia) {
		sessaorModel.listasessao(function(sessao) {
			speakerModel.listaspeaker(function(speaker) {
		response.set("Content-Type", "text/html");
		response.render('./index/eventos', {
			dia : dia,
			sessao: sessao,
			speaker: speaker
		})
	})
	})
	})
}); 
router.get('/bilheteira', function(request, response) {
	diaModel.listdia(function(dia) {
		response.set("Content-Type", "text/html");
		response.render('./index/bilheteira', {errors: [],
			dia : dia
		})
	})		
});

router.post('/compra', function(request, response) {
	//request.checkBody('numero', 'Numero should have between 8 and 25 chars').isLength({min: 8, max: 25});
	//request.checkBody('username', 'Username should have between 8 and 25 chars').isLength({min: 8, max: 25});
	//request.checkBody('dia', 'Dia should have between 8 and 25 chars').isLength({min: 8, max: 25});
var errors = request.validationErrors();
var c   = 	request.body.dia.split('/') ;
									
									
								var dt2 = parseInt(c[2]) + '-'+ parseInt(c[0])  + '-'+ parseInt(c[1]);
							
								var ad = request.body.adquirido 
							var disponivel =  request.body.limite - request.body.adquirido
			for(var i = 0; i < request.body.numero; i++){
		 ad++;
	
		
	}
			if (errors) {
	diaModel.listdia(function(dia) {
		response.set("Content-Type", "text/html");
		response.render('./index/bilheteira', {errors: [],
			dia : dia
		})
	})
	}else{					
	var data = {
		'numero': request.body.numero,
		'limite' : request.body.limite,
		'username': request.body.user,
		'dia': dt2,
		'preco_bilhete': request.body.preco_bilhete,
		'adquirido' :ad
		
	};
	if(ad < request.body.limite){
		
	for(var i = 0; i < request.body.numero; i++){
		bilheteModel.createbilhete(data, function(){});
		
	}
	console.log(ad);
		diaModel.updatedia(dt2, data, function(){ 
		response.redirect('/bilheteira');
			console.log(ad);
		});
	}else{
		console.log(ad);
		console.log(request.body.limite);
	
			diaModel.listdia(function(dia) {
		response.render('./index/bilheteira', {
			dia : dia,
			errors: [{ msg: 'Nao existem tantos bilhetes dispoiveis. apenas existem ' + disponivel + 'bilhetes dispoiveis	' }]
			
		})
	})
			
	
		
	}
	}




});

module.exports = router;