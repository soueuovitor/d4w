module.exports = {
	listacolab(callback) {
		var sql = 'SELECT * from dwpt_northmusic.colaborador';
		global.connection.query(sql, function (error, rows, fields) {
			if (error) throw error;
			callback(rows);
		});

	},

	readcolab(user_colaborador, callback) {
		var sql = "SELECT * from dwpt_northmusic.colaborador where user_colaborador=?";
		global.connection.query(sql, [user_colaborador], function (error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);
		});
	},

	createcolab(data, callback) {
		var sql = "INSERT INTO dwpt_northmusic.colaborador (user_colaborador, nome_colaborador, email_colaborador, telefone_colaborador, funcao_colaborador, nif_colaborador, salario_colaborador, tipo_colab, password_colab) VALUES (?,?,?,?,?,?,?,?,?)";
		global.connection.query(
			sql, [data.user_colaborador, data.nome_colaborador, data.email_colaborador, data.telefone_colaborador, data.funcao_colaborador, data.nif_colaborador, data.salario_colaborador, data.tipo_colab, data.password_colab],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	},

	updatecolab(user_colaborador, data, callback) {
		var sql = "UPDATE dwpt_northmusic.colaborador SET nome_colaborador=?, telefone_colaborador=?,  email_colaborador=?, funcao_colaborador=?, salario_colaborador=? WHERE user_colaborador=?";
		global.connection.query(
			sql, [data.nome_colaborador, data.telefone_colaborador, data.email_colaborador, data.funcao_colaborador, data.salario_colaborador, user_colaborador],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	},

	removecolab(user_colaborador, callback) {
		var sql = "DELETE from dwpt_northmusic.colaborador WHERE user_colaborador=?";
		global.connection.query(sql, [user_colaborador], function (error, rows, fields) {
			if (error) throw error;
			callback(rows);
		});
	},




	/*emailExists(email, callback) { 

		var sql = "SELECT * FROM users WHERE email=?";
		global.connection.query(sql, [email], function (error, rows, fields) {
			if (error) throw error;
			if (rows.length == 1 && rows[0].email === email) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},

}*/

};