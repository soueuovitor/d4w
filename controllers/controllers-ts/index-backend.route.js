const express = require('express');
const router = express.Router();

const pat = require('../../models/models-ts/patrocinador.model');
const spe = require('../../models/models-ts/speaker.model');
const bil = require('../../models/models-ts/bilheteira.model');
const col = require('../../models/models-ts/colaborador.model');
const param = require('../../models/models-ts/parametros.model');
const ses = require('../../models/models-ts/sessoes.model');

router.get('/',global.secure('admin'), function(request, response){
		pat.list(function(patrocinadores){
			spe.list(function(speaker) {
				bil.bilhetes(function(bilheteira) {
					col.pagos(function(colaborador) {
						param.list(function(parametros){
							ses.list(function(sessoes){
								response.set("Content-Type", "text/html");
								response.render('index-backend', {
									patrocinador : patrocinadores,
									speaker : speaker,
									bilheteira : bilheteira,
									colaborador : colaborador,
									parametros : parametros,
									sessoes : sessoes
								})
							})
						})
					})
				})
			})
		})
});

module.exports = router;