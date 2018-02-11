const express = require('express');
const router = express.Router();
const diaModel = require('../../models/models-nm/dia.model');




router.get('/', global.secure('admin'), function(request, response){
	//console.log(request.user);
	//console.log(request.isAuthenticated());
	diaModel.listdia(function(dia) {
	
		response.set("Content-Type", "text/html");
		response.render('./admin/dia', {
			dia : dia,
		})
	
})
});
router.post('/diacreate', function(request, response) {
	//request.checkBody(' ', 'Nome do Patrocinio should have between 2 and 30 chars').isLength({min: 2, max: 30});
	
	var errors = request.validationErrors();

	if (errors) {
		diaModel.listdia(function(dia) {
		response.render('./admin/dia', {
			isNew: true,
			user: {}, 
			errors: errors,
			dia: dia
		});
		});

	}else{
		var data = {
			'dia': request.body.dia,
			'preco_bilhete':request.body.preco_bilhete,
			'limite' :request.body.limite
			
			
		};
		console.log(request.body.dia);
		diaModel.createdia(data, function(){
			response.redirect('/dia');
		});
	}
}); 



    module.exports = router;