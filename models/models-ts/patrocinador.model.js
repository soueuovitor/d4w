module.exports = {
	list(callback) {
		var sql = 'SELECT * from dwpt_techsummit.patrocinadores WHERE ativo=1';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},

	read(idPatrocinadores, callback) {
		var sql = "SELECT * from dwpt_techsummit.patrocinadores where idPatrocinadores=?";	
		global.connection.query(sql, [idPatrocinadores], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},	

	createPatrocinador(data, callback) {
		var sql = "INSERT INTO dwpt_techsummit.patrocinadores (nomeP, valor,ativo) VALUES (?,?,1)"; 
		global.connection.query(
			sql, [data.nome, data.valor], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},

	update(idPatrocinadores, data, callback) {
		var sql = "UPDATE dwpt_techsummit.patrocinadores SET nomeP=?, valor=? WHERE idPatrocinadores=?"; 
		global.connection.query(
			sql, [data.nome, data.valor, idPatrocinadores], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},
	
	remove(idPatrocinadores, callback) {
		var sql = "UPDATE dwpt_techsummit.patrocinadores SET ativo=0 where idPatrocinadores=?"; 
		global.connection.query(sql, [idPatrocinadores], function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	}
	

};