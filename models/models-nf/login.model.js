module.exports = {

	areValidCredentials(username, password, callback) {
		var sql = "SELECT password FROM  dwpt_nortephotography.users WHERE username=?";
		global.connection.query(sql, [username], function (error, rows, fields) {
			console.log(rows.username )
			if (error) throw error;
			if (rows.length == 1 && rows[0].password === password) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},
	
}