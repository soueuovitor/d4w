module.exports = {

comprarBilhete(data, callback) {
		var sql = "INSERT INTO  dwpt_nortephotography.bilhetes (data_bilhete, username_comprador) VALUES (?,?)";
		global.connection.query(
			sql, [data.dia, data.user],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	},

	workshop(callback) {
		var sql = 'SELECT * from  dwpt_nortephotography.workshop';
		global.connection.query(sql, function (error, rows, fields) {
			if (error) throw error;
			callback(rows);
		});
	},

	readUser(username, callback) {
		var sql = "SELECT * from  dwpt_nortephotography.users where username=?";
		global.connection.query(sql, [username], function (error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);
		});
	},







	listBilhetes(callback) {

		var sql = 'SELECT  username_comprador, DATE_FORMAT(data_bilhete, "%Y-%m-%d") AS data_bilhete from  dwpt_nortephotography.bilhetes';
		global.connection.query(sql, function (error, rows, fields) {

console.log(rows[0])

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

	
	listDias(callback) {
		
		var sql = 'SELECT * from  dwpt_nortephotography.dia';
		global.connection.query(sql, function (error, rows, fields) {
		
	
			callback(rows);
		});
	}





	
	
}