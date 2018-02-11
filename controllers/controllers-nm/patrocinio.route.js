const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const patrModel = require('../../models/models-nm/patrocinio.model');




router.use(fileUpload());

router.get('/', global.secure('admin'), function(request, response) {
	patrModel.listpatrocinio(function(patrocinio) {
		response.set("Content-Type", "text/html");
		response.render('./admin/patrocinio', {errors: [],
			patrocinio : patrocinio
		})
	})	
}); 
router.get('/:nome_patrocinio', global.secure('admin'),  function(request, response) {
	patrModel.readpatrocinio(request.params.nome_patrocinio, function(patrocinio) {
		if (patrocinio != undefined) {
			response.set("Content-Type", "text/html");
			response.render('./admin/pat_edit', {
				isNew: false,
				patrocinio : patrocinio,
				errors: [] 
			})		
		}else{
			response.status(404).end();
		}
	})	
});

router.post('/registoPat', function(request, response) {
	request.checkBody('nome_patrocinio', 'Nome do Patrocínio deverá ter entre 1 a 30 caracteres!').isLength({min: 1, max: 30});
	request.checkBody('valor_patrocinio', 'Valor do Patrocínio deverá ter entre 1 a 10 caracteres!').isLength({min: 1, max: 10});

	var errors = request.validationErrors();	


	if (!request.files)
    return response.status(400).send('No files were uploaded.');
	if (errors) {
		patrModel.listpatrocinio(function(patrocinio) {
		response.render('./admin/patrocinio', {
			isNew: true,
			patrocinio	: {},
			errors: errors,
			patrocinio : patrocinio
		});
	});
	}else{
		var fields = 		request.files;


		let sampleFile = request.files.sampleFile;

		sampleFile.mv('./public/img/'+request.body.nome_patrocinio +'.jpg', function(err) {
			if (err)
			  return response.status(500).send(err);
		 
		  });
		var data = {
			'nome_patrocinio': request.body.nome_patrocinio,
			'valor_patrocinio': request.body.valor_patrocinio
			
		};
		patrModel.createpatrocinio(data, function(){
			response.redirect('/patrocinio');

		});
	}  
}); 

router.post('/:nome_patrocinio', function(request, response) {	
	request.checkBody('valor_patrocinio', 'Valor do Patrocínio deverá ter entre 1 a 10 caracteres!').isLength({min: 1, max: 10});
	var errors = request.validationErrors();	
	var data = {
		'nome_patrocinio': request.body.nome_patrocinio,
		'valor_patrocinio': request.body.valor_patrocinio
	
	};
	
	if (!request.files)
    return response.status(400).send('No files were uploaded.');
	if (errors) {
		data.nome_patrocinio = request.params.nome_patrocinio;   
		response.render('./admin/pat_edit', {
			isNew: false,
			patrocinio: data,
			errors: errors
		});
	}else{  
		var fields = 		request.files;


		let sampleFile = request.files.sampleFile;
		
		sampleFile.mv('./public/img/'+request.params.nome_patrocinio +'.jpg', function(err) {
			if (err)
			  return response.status(500).send(err);
		 
		  });	
		patrModel.updatepatrocinio(request.params.nome_patrocinio, data, function(){
			response.redirect('/patrocinio/');
		});
	}
});
router.get('/:nome_patrocinio/delete', global.secure('admin'),  function(request, response){
	patrModel.removepatrocinio(request.params.nome_patrocinio, function() {
		response.redirect('/patrocinio');
	})	
});

module.exports = router;