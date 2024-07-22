const mysql = require('mysql');
const path = require('path');
const connector = mysql.createConnection({
	host:'localhost',
	user: 'TEST',
	password: 'Fortitude',
	database: 'sqltest'
})
connector.connect(function(err){
	if(err)throw err;
	var sql = "CREATE TABLE Users (id INT (11) AUTO_INCREMENT PRIMARY KEY, Username VARCHAR (255), Fullname VARCHAR (255), Email VARCHAR (255), Password VARCHAR (255), DateOfBirth VARCHAR (255), Address VARCHAR (255))";
	connector.query(sql, function (err, res){
		if (err) throw err;
		console.log("Created Successfully");
	});
	
});

