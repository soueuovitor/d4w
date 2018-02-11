module.exports = {
	listpatrocinio(callback) {
		var sql = 'SELECT * from dwpt_northmusic.patrocinio';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
    },
    readpatrocinio(nome_patrocinio, callback) {
		var sql = "SELECT * from dwpt_northmusic.patrocinio where nome_patrocinio=?";	
		global.connection.query(sql, [nome_patrocinio], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
    },
    updatepatrocinio(nome_patrocinio, data, callback) {
		var sql = "UPDATE dwpt_northmusic.patrocinio SET valor_patrocinio=? WHERE nome_patrocinio=?"; 
		global.connection.query(
			sql, [data.valor_patrocinio, nome_patrocinio], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},
    removepatrocinio(nome_patrocinio, callback) {
		var sql = "DELETE from dwpt_northmusic.patrocinio WHERE nome_patrocinio=?"; 
		global.connection.query(sql, [nome_patrocinio], function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},
	createpatrocinio(data, callback) {
		var sql = "INSERT INTO dwpt_northmusic.patrocinio (nome_patrocinio, valor_patrocinio) VALUES (?,?)"; 
		global.connection.query(
			sql, [data.nome_patrocinio, data.valor_patrocinio], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});


    },
};
