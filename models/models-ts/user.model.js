module.exports = {
	list(callback) {
		var sql = 'SELECT * from dwpt_techsummit.users WHERE ativo=1';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},

	read(username, callback) {
		var sql = "SELECT * from dwpt_techsummit.users where username=?";	
		global.connection.query(sql, [username], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},	

	create(data, callback) {
		var sql = "INSERT INTO dwpt_techsummit.users (username, name, morada, telemovel, email, nif, password,ativo) VALUES (?,?,?,?,?,?,?,1)"; 
		global.connection.query(
			sql, [data.username, data.name, data.morada, data.telemovel, data.email, data.nif, data.password], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},

	update(username, data, callback) {
		var sql = "UPDATE dwpt_techsummit.users SET name=?, morada=?, telemovel=?, email=?, nif=?, password=? WHERE username=?"; 
		global.connection.query(
			sql, [data.name, data.morada, data.telemovel, data.email, data.nif, data.password, username], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},
	
	remove(username, callback) {
		var sql = "UPDATE dwpt_techsummit.users SET ativo=0 where username=?"; 
		global.connection.query(sql, [username], function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},

	//New
	areValidCredentials(username, password, callback) {
		var sql = "SELECT * from dwpt_techsummit.users where ativo=1 AND username=?";
		global.connection.query(sql, [username], function(error, rows, fields){
			if (error) throw error;
			if (rows.length == 1 && rows[0].password === password) {
				callback(true);
			}else{
				callback(false);
			}
		});
	}
};
