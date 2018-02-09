module.exports = {
	list(callback) {
		var sql = 'SELECT lotacaoW,precoBilhete,nomeW,localW, DATE_FORMAT(data_inicioW, "%d/%m/%Y") AS data_inicioW,  DATE_FORMAT(data_fimW, "%d/%m/%Y") AS data_fimW from dwpt_techsummit.parametros';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},
	
	bilhetes(callback) {
		var sql = 'SELECT * from dwpt_techsummit.bilhetes';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},
	
	createBilhete(data, callback) {
		var sql = "INSERT INTO dwpt_techsummit.bilhetes (username,dataVal) VALUES (?,?)";
		var sqlF = "INSERT INTO dwpt_techsummit.parametros (lotacaoW) VALUES(?)";		
		
		global.connection.query(
			sql, [data.username, data.datas], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},
	
	update(idParametros, data, callback) {
		var sql = "UPDATE dwpt_techsummit.parametros SET lotacaoW=? WHERE idParametros=1"; 
		global.connection.query(
			sql, [data.lotacaoW, idParametros], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},

};