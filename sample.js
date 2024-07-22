const mysql = require ('mysql');

const tresd = mysql.createConnection({
	
	host:'localhost',
	user: 'TEST',
	password: 'Fortitude',
	database: 'sqltest'
})

tresd.connect(function(err){
	if(err)throw err;
	var sql = "CREATE TABLE cars (id INT (11) AUTO_INCREMENT PRIMARY KEY, carname VARCHAR (255), model VARCHAR (255), year VARCHAR (255))";
	tresd.query(sql, function (err, res){
		if (err) throw err;
		console.log("Created Successfully");
	});
	
});

tresd.conenect(function(err){
	if(err)throw err;
	var carTy = 
	var sql = "INSERT INTO cars"
	
}