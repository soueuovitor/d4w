const express = require('express');
const router = express.Router();
const speakerModel = require('../../models/models-nm/speaker.model');
const fileUpload = require('express-fileupload');

router.use(fileUpload());

router.get('/', global.secure('admin'), function(request, response) {
	speakerModel.listaspeaker(function(speaker) {
		response.set("Content-Type", "text/html");
		response.render('./admin/speaker', {errors: [], 
			speaker : speaker
		})
	})	
});
router.post('/spe', function(request, response) {
	request.checkBody('nome_speaker', 'Nome do Speaker deverá ter entre 4 a 30 caracteres!').isLength({min: 4, max: 30});
	request.checkBody('telefone', 'Telemóvel inserido não é válido! Tente de novo!').isLength({min: 9, max: 9});
	request.checkBody('NIF_speaker', 'NIF inserido não é valido! Tente de novo! ').isLength({min: 9, max: 9});
	request.checkBody('cache_speaker', 'Cache do Speaker deverá ter entre 2 a 15 caracteres!').isLength({min: 2, max: 15});

	var errors = request.validationErrors();
	


	if (!request.files)
	return response.status(400).send('No files were uploaded.');
    if (errors) {
		speakerModel.listaspeaker(function(speaker) {
		response.render('./admin/speaker', {
			isNew: true,
			speaker: {},
			errors: errors,
			speaker : speaker 
				});
			});
	}else{

	var fields =	request.files;


	let sampleFile = request.files.sampleFile;

	sampleFile.mv('./public/img/'+request.body.nome_speaker +'.jpg', function(err) {
		if (err)
		  return response.status(500).send(err);
	 
	  });
		var data = {
			'nome_speaker': request.body.nome_speaker,
			'telefone': request.body.telefone,
			'NIF_speaker': request.body.NIF_speaker,
			'cache_speaker': request.body.cache_speaker
		};
		speakerModel.createspeaker(data, function(){
			response.redirect('/speaker');
		});
	}
}); 
router.get('/:id_speaker', global.secure('admin'),  function(request, response) {
	speakerModel.readspeaker(request.params.id_speaker, function(speaker) {
		if (speaker != undefined) {
			response.set("Content-Type", "text/html");
			response.render('./admin/speaker_edit', {
				isNew: false,
				speaker : speaker,
				errors: []
			})		  
		}else{
			response.status(404).end();
		}
	})	
});

router.post('/:id_speaker', function(request, response) {	

	request.checkBody('nome_speaker', 'Nome do Speaker deverá ter entre 4 a 30 caracteres!').isLength({min: 4, max: 30});
	request.checkBody('telefone', 'Telemóvel inserido não é válido! Tente de novo!').isLength({min: 9, max: 9});
	request.checkBody('NIF_speaker', 'NIF inserido não é valido! Tente de novo!').isLength({min: 9, max: 9});
	request.checkBody('cache_speaker', 'Cache do Speaker deverá ter entre 2 a 15 caracteres!').isLength({min: 2, max: 15});
	
	var errors = request.validationErrors(); 
	var data = {
		
		'nome_speaker': request.body.nome_speaker,
		'telefone': request.body.telefone,	
		'NIF_speaker': request.body.NIF_speaker,	
		'cache_speaker': request.body.cache_speaker	
	};
	if (!request.files)
	return response.status(400).send('No files were uploaded.');
	if (errors) { 
		data.id_speaker = request.params.id_speaker;
		response.render('./admin/speaker_edit', {
			isNew: false,
			speaker: data,
			errors: errors    

		});
	}else{	
		var fields =	request.files;


		let sampleFile = request.files.sampleFile;
		
		sampleFile.mv('./public/img/'+request.body.nome_speaker +'.jpg', function(err) {
			if (err)
			  return response.status(500).send(err);
		 
		  });
		speakerModel.updatespeaker(request.params.id_speaker, data, function(){
			response.redirect('/speaker/');
		});
	}
});
router.get('/:id_speaker/delete', global.secure('admin'),  function(request, response){
	speakerModel.removespeaker(request.params.id_speaker, function() {
		response.redirect('/speaker');
	})	
});

module.exports = router;