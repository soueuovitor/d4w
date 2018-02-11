module.exports = {
    listaspeaker(callback) {
		var sql = 'SELECT * from dwpt_northmusic.speaker';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
		
	},
    readspeaker(id_speaker, callback) {
		var sql = "SELECT * from dwpt_northmusic.speaker where id_speaker=?";	
		global.connection.query(sql, [id_speaker], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
    },
    createspeaker(data, callback) {
		var sql = "INSERT INTO dwpt_northmusic.speaker (nome_speaker, telefone, NIF_speaker, cache_speaker) VALUES (?,?,?,?)"; 
		global.connection.query(
			sql, [data.nome_speaker, data.telefone, data.NIF_speaker, data.cache_speaker], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});

    },
    updatespeaker(id_speaker, data, callback) {
		var sql = "UPDATE dwpt_northmusic.speaker SET nome_speaker=?, telefone=?, NIF_speaker=?, cache_speaker=? WHERE id_speaker=?"; 
		global.connection.query(
			sql, [data.nome_speaker, data.telefone, data.NIF_speaker, data.cache_speaker, id_speaker], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
		});
	},
	
	removespeaker(id_speaker, callback) {
		var sql = "DELETE from dwpt_northmusic.speaker WHERE id_speaker=?"; 
		global.connection.query(sql, [id_speaker], function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},
};