module.exports = {
	
	readColab(username, callback) {
		var sql = "SELECT * from  dwpt_nortephotography.colaboradores where username_col=?";
		global.connection.query(sql, [username], function (error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);
		});
	},
	listWorkshop(callback) {
		var sql = 'SELECT * from  dwpt_nortephotography.workshop';
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

	
	listColaboradores(callback) {
		var sql = 'SELECT * from  dwpt_nortephotography.colaboradores';
		global.connection.query(sql, function (error, rows, fields) {
			if (error) throw error;
			callback(rows);
		});
	}
	
}