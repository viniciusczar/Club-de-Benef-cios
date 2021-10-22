const mysql = require ('mysql2');

/*
module.exports = {
    async execSQLQuery(sqlQry) {
        console.log(sqlQry);
        const connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : '',
    database : 'dbase',
    });

    connection.query(sqlQry, function(error, results, fields){
        if(error) 
        console.log(error);
        else
        
        connection.end();
    });
}
}*/

const connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : '',
    database : 'dbase',
    });

module.exports = connection;

/*let concat = "'%"+ref+"%' ";
                const sqlQry = 'SELECT A.ID, A.BUSINESS_ID, A.DSC, A.VL_OR, A.VL_DESC, A.CREATED_AT FROM ADVERTS AS A INNER JOIN BUSINESSES AS B ON A.BUSINESS_ID = B.ID INNER JOIN OWNERS O ON B.OWNERS_ID = O.ID WHERE A.DSC LIKE '+concat+'AND O.HABILITED = '+'"Sim"'+';'
                
                 connection.query(sqlQry, function(error, results, fields, res){
                    if(error) 
                    console.log(error);
                    else
                    console.log(results)
                    connection.end();
                });
                console.log(results);*/



