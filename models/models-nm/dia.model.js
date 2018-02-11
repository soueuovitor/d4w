module.exports = {
	createdia(data, callback) {
		var sql = "INSERT INTO dwpt_northmusic.dia (dia, preco_bilhete, limite) VALUES (?,?,?)"; 
		global.connection.query(
			sql, [data.dia, data.preco_bilhete, data.limite], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},
	listdia(callback) {
		var sql = 'SELECT * from dwpt_northmusic.dia';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},
	readdia(dia, callback) {
		var sql = "SELECT * from dwpt_northmusic.dia where dia=?";	
		global.connection.query(sql, [dia], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},
	updatedia(dia, data, callback) {
		var sql = "UPDATE dwpt_northmusic.dia SET adquirido=? WHERE dia=?"; 
		global.connection.query(
			sql, [data.adquirido, dia], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			  
		});
	},
   




};