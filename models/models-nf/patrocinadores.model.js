module.exports = {

	listPatrocinadores(callback) {
		var sql = 'SELECT * from  dwpt_nortephotography.patrocinador';
		global.connection.query(sql, function (error, rows, fields) {
			if (error) throw error;
			callback(rows);
		});
	},
	
	listFeedback(callback) {
		var sql = 'SELECT * from  dwpt_nortephotography.feedback';
		global.connection.query(sql, function (error, rows, fields) {
			if (error) throw error;
			callback(rows);
		});
	},

	createPatrocinio(data, callback) {
		var sql = "INSERT INTO  dwpt_nortephotography.patrocinador (nome_patrocinador, valor_doado ) VALUES (?,?)";
		global.connection.query(
			sql, [data.name, data.valor],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	}
	
	
}