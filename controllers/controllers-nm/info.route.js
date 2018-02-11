const express = require('express');
const router = express.Router();
const usersModel = require('../../models/models-nm/user.model');
const colabModel = require('../../models/models-nm/colab.model');
const speakerModel = require('../../models/models-nm/speaker.model');
const patrModel = require('../../models/models-nm/patrocinio.model');
const bilheteModel = require('../../models/models-nm/bilhete.model');

router.get('/', global.secure('admin'),  function(request, response){
    usersModel.listparticipante(function(participante){
        patrModel.listpatrocinio(function(patrocinio){
            colabModel.listacolab(function(colaborador){
                speakerModel.listaspeaker(function(speaker){
                    bilheteModel.listabilhete(function(bilheteira){

                    



        response.set("Content-Type", "text/html");
        response.render('./admin/info', {
            speaker : speaker,
            patrocinio : patrocinio,
            colaborador : colaborador,
            bilheteira : bilheteira
        });
    });
});
});

    });
});
});


module.exports = router;


