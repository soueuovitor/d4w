module.exports = {

createbilhete(data, callback) {
    var sql = "INSERT INTO dwpt_northmusic.bilheteira ( username, dia, preco_bilhete) VALUES (?,?,? )"; 
    global.connection.query(
        sql, [data.username, data.dia, data.preco_bilhete ], function(error, rows, fields) {
        if (error) throw error;
        callback(rows[0]);			  
    });
},

listabilhete(callback) {
    var sql = 'SELECT * from dwpt_northmusic.bilheteira';
    global.connection.query(sql, function(error, rows, fields){
        if (error) throw error;
        callback(rows);
    });
    
},

};
