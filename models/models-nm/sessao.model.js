module.exports = {
	
   
		createsessao(data, callback) {
			var sql = "INSERT INTO dwpt_northmusic.sessao (titulo_sessao, dia_sessao, hora_sessao, id_speaker, descricao_sessao, hora_fim) VALUES (?,?,?,?,?,?)"; 
			global.connection.query(
				sql, [data.titulo_sessao, data.dia_sessao, data.hora_sessao, data.id_speaker, data.descricao_sessao,data.hora_fim], function(error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);			
			});
			},
			listasessao(callback) {
				var sql = 'SELECT * from dwpt_northmusic.sessao';
				global.connection.query(sql, function(error, rows, fields){
					if (error) throw error;
					callback(rows);
				});
			},

			horaExists(data,callback){
				var sql = "SELECT * from dwpt_northmusic.sessao WHERE dia_sessao=? and (? >= hora_sessao and ? <= hora_fim or ? >= hora_sessao and ? <= hora_fim or ? < hora_sessao and ? > hora_fim)";
				global.connection.query(
					sql, [data.dia_sessao, data.hora_sessao, data.hora_sessao, data.hora_fim, data.hora_fim, data.hora_sessao, data.hora_fim],
					function (error, rows, fields) {
						if (error) throw error;
						if (rows.length != 0 ) {
							callback(true);
						} else {
							callback(false);
						}
						console.log(rows.length);
						
					});
			},
		



};