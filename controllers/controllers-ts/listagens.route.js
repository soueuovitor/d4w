const pat = require('../../models/models-ts/patrocinador.model');
const spe = require('../../models/models-ts/speaker.model');
const col = require('../../models/models-ts/colaborador.model');
const ses = require('../../models/models-ts/sessoes.model');
const use = require('../../models/models-ts/user.model');

const express = require('express');
const router = express.Router();

router.get('/',global.secure('admin'), function(request, response){
	pat.list(function(patrocinadores){
		spe.list(function(speaker) {
			col.list(function(colaborador) {
				ses.list(function(sessao) {
					use.list(function(user) {
						response.set("Content-Type", "text/html");
						response.render('listagens-backend', {
							patrocinadores : patrocinadores,
							speaker : speaker,
							colaborador : colaborador,
							sessao : sessao,
							user : user
						})
					})
				})
			})
		})
	})
});

module.exports = router;
