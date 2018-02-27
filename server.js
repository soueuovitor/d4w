const port = 3000;
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const appnf = express();
const appts = express();
const appnm= express();

const validator = require('express-validator');
const fileUpload = require('express-fileupload');










//new
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportnf = require('passport');
const passportts = require('passport');
const passportnm = require('passport');

const usersModel = require('./models/models-nf/user.model');


const usersModelTs = require('./models/models-ts/user.model');


const usersModelNm = require('./models/models-nm/user.model');

var helmet = require('helmet')
 
const https = require("https"),
  fs = require("fs");








//This function will allow us to retrict the access to the routes
global.secure = function(type) {
	return function (request, response, next) {
		if (request.isAuthenticated()) {
			if (type) {
				if (type === request.user.type) {
					return next();
				}else{
					response.redirect('/');
				}
			}else{
				return next();
			}
		}
		response.redirect('/');
	}
};

//end of new

app.use(validator());
app.use(fileUpload({
    limits: { fileSize: 50 * 128 * 128 },
}));
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));





appnf.use(validator());
appnf.use(fileUpload({
    limits: { fileSize: 50 * 128 * 128 },
}));
appnf.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));


appts.use(validator());
appts.use(fileUpload({
    limits: { fileSize: 50 * 128 * 128 },
}));
appts.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));



appnm.use(validator());
appnm.use(fileUpload({
    limits: { fileSize: 50 * 128 * 128 },
}));
appnm.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));



//new
app.use(cookieParser());
app.use(session({
	secret: 'someRandomSecretKey',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());




appnm.use(cookieParser());
appnm.use(session({
	secret: 'someRandomSecretKey',
	resave: false,
	saveUninitialized: false
}));
appnm.use(passportnm.initialize());
appnm.use(passportnm.session());





appnf.use(cookieParser());
appnf.use(session({
	secret: 'someRandomSecretKey',
	resave: false,
	saveUninitialized: false
}));
appnf.use(passportnf.initialize());
appnf.use(passportnf.session());


appts.use(cookieParser());
appts.use(session({
	secret: 'someRandomSecretKey',
	resave: false,
	saveUninitialized: false
}));
appts.use(passportts.initialize());
appts.use(passportts.session());







passport.serializeUser(function(username, callback) {
	callback(null, username);
});

passport.deserializeUser(function(username, callback) {
	usersModel.read(username, function(data) {
		callback(null, data);
	})
});

passportnf.serializeUser(function(username, callback) {
	callback(null, username);
});

passportnf.deserializeUser(function(username, callback) {
	usersModel.read(username, function(data) {
		callback(null, data);
	})
});


passportts.serializeUser(function(username, callback) {
	callback(null, username);
});

passportts.deserializeUser(function(username, callback) {
	usersModelTs.read(username, function(data) {
		callback(null, data);
	})
});
//end of new

passportnm.serializeUser(function(username, callback) {
	callback(null, username);
});

passportnm.deserializeUser(function(username, callback) {
	usersModelNm.read(username, function(data) {
		callback(null, data);
	})
});
//end of new




app.set('view engine', 'ejs');
app.set('views','views/views-root');



appnf.set('view engine', 'ejs');
appnf.set('views','views/views-nf');



appts.set('view engine', 'ejs');
appts.set('views','views/views-ts');



appnm.set('view engine', 'ejs');
appnm.set('views','views/views-nm');


global.connection = mysql.createConnection({
	host     : 'd4w.pt',
	user     : 'dwpt',
	password : 'Rumoao9.5',

}).on('enqueue', function (sequence) {
	if ('Query' === sequence.constructor.name) {
		console.log(sequence.sql);
	}
});

/*



*/




app.listen(15000, function(){

	console.log('server started');
});




appnf.listen(15001, function(){
	console.log('Server started at: ' + port);
});


appts.listen(15002, function(){
	console.log('Server started at: ' + port);
});

appnm.listen(15003, function(){
	console.log('Server started at: ' + port);
});




//Midleware that sets the isAuthenticated variable in all views
app.use(function(request, response, next){
	response.locals.user = request.user;
	response.locals.isAuthenticated = request.isAuthenticated();
	next();
});

appnf.use(function(request, response, next){
	response.locals.user = request.user;
	response.locals.isAuthenticated = request.isAuthenticated();
	next();
});


appts.use(function(request, response, next){4


	response.locals.user = request.user;
	response.locals.isAuthenticated = request.isAuthenticated();
	next();
});


appnm.use(function(request, response, next){4


	response.locals.user = request.user;
	response.locals.isAuthenticated = request.isAuthenticated();
	next();
});



app.use('/', require('./controllers/controllers-root/index-frontend.route'));
app.use('/public', express.static('public/public-root'));

/*
app.use('/gestao', require('./controllers/controllers-root/index-backend.route'));
app.use('/login', require('./controllers/controllers-root/login.route'));
app.use('/logout', require('./controllers/controllers-root/logout.route'));
app.use('/sessoes', require('./controllers/controllers-root/sessoes.route'));
app.use('/bilheteira', require('./controllers/controllers-root/bilheteira.route'));
app.use('/parametros', require('./controllers/controllers-root/parametros.route'));

app.use('/listagem', require('./controllers/controllers-root/listagens.route'));
app.use('/patrocinador', require('./controllers/controllers-root/patrocinador.route'));
app.use('/colaborador', require('./controllers/controllers-root/colaborador.route'));
app.use('/speaker', require('./controllers/controllers-root/speaker.route'));
app.use('/profile', require('./controllers/controllers-root/profile.route'));
*/




appnf.use('/', require('./controllers/controllers-nf/index.route'));


appnf.use('/admin', require('./controllers/controllers-nf/admin.route'));
appnf.use('/workshop', require('./controllers/controllers-nf/workshop.route'));

appnf.use('/colab', require('./controllers/controllers-nf/colab.route'));
appnf.use('/public', express.static('public'));
//appnf.use('/users', require('./controllers/controllers-nf/user.route'));

//new

appnf.use('/login', require('./controllers/controllers-nf/login.route'));
appnf.use('/logout', require('./controllers/controllers-nf/logout.route'));
appnf.use('/alterColab', require('./controllers/controllers-nf/alterColab.route'));
appnf.use('/alterSpeaker', require('./controllers/controllers-nf/alterSpeaker.route'));
appnf.use('/alterPatrocinador', require('./controllers/controllers-nf/alterPatrocinador.route'));
appnf.use('/alterSessao', require('./controllers/controllers-nf/alterSessao.route'));

appnf.use('/registerColab', require('./controllers/controllers-nf/registerColab.route'));
appnf.use('/register', require('./controllers/controllers-nf/register.route'));
appnf.use('/galeria', require('./controllers/controllers-nf/galeria.route'));

appnf.use('/patrocinadores', require('./controllers/controllers-nf/patrocinadores.route'));
appnf.use('/sessoes', require('./controllers/controllers-nf/sessoes.route'));

appnf.use('/speakers', require('./controllers/controllers-nf/speakers.route'));
appnf.use('/comprarBilhete', require('./controllers/controllers-nf/comprarBilhete.route'));
appnf.use('/participantes', require('./controllers/controllers-nf/participantes.route'));

appnf.use('/feedback', require('./controllers/controllers-nf/feedback.route'));
appnf.use('/public', express.static('public/public-nf'));

/* ------------------------------------------------------- */

appts.use('/', require('./controllers/controllers-ts/index-frontend.route'));
appts.use('/public', express.static('public/public-ts'));


appts.use('/gestao', require('./controllers/controllers-ts/index-backend.route'));
appts.use('/login', require('./controllers/controllers-ts/login.route'));
appts.use('/logout', require('./controllers/controllers-ts/logout.route'));
appts.use('/sessoes', require('./controllers/controllers-ts/sessoes.route'));
appts.use('/bilheteira', require('./controllers/controllers-ts/bilheteira.route'));
appts.use('/parametros', require('./controllers/controllers-ts/parametros.route'));

appts.use('/listagem', require('./controllers/controllers-ts/listagens.route'));
appts.use('/patrocinador', require('./controllers/controllers-ts/patrocinador.route'));
appts.use('/colaborador', require('./controllers/controllers-ts/colaborador.route'));
appts.use('/speaker', require('./controllers/controllers-ts/speaker.route'));
appts.use('/profile', require('./controllers/controllers-ts/profile.route'));



appnm.use('/', require('./controllers/controllers-nm/home.route'));
appnm.use('/public', express.static('public/public-nm'));
appnm.use('/login', require('./controllers/controllers-nm/login.route'));
appnm.use('/admin', require('./controllers/controllers-nm/admin.route'));
appnm.use('/registo', require('./controllers/controllers-nm/registo.route'));
appnm.use('/patrocinio', require('./controllers/controllers-nm/patrocinio.route'));
appnm.use('/speaker', require('./controllers/controllers-nm/speaker.route'));
appnm.use('/logout', require('./controllers/controllers-nm/logout.route'));
appnm.use('/colaborador', require('./controllers/controllers-nm/colaborador.route'));
appnm.use('/participante', require('./controllers/controllers-nm/participante.route'));
appnm.use('/info', require('./controllers/controllers-nm/info.route'));
appnm.use('/sessoes', require('./controllers/controllers-nm/sessoes.route'));
appnm.use('/dia', require('./controllers/controllers-nm/dia.route'));

