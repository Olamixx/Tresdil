const mysql = require('mysql');
const path = require('path');
const bodyparser = require('body-parser');
const connector = mysql.createConnection({
	host:'localhost',
	user: 'TEST',
	password: 'Fortitude',
	database: 'sqltest'
});
connector.connect(err =>{
	if (err) throw err;
	console.log('Connected to database');	
});
const express = require("express");
const app = express();
const port = 3000;


app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname + '/public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public', '/index.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '/public', '/signup.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/public', '/login.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '/public', '/dashboard.html'));
});

app.post('/signup', (req, res) => {
    const {username, fullname, email,password, dateOfBirth, address} = req.body;

	const sql = "INSERT INTO Users (Username, Fullname, Email, Password, DateOfBirth, Address) VALUES (?,?,?,?,?,?)"; 
	const values = [username, fullname, email,password, dateOfBirth, address];
       connector.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting user into database:', err.stack);
            return res.status(500).send('An error occurred during signup.');
        }
        console.log('User registered successfully');
        res.redirect('/login');
    });
    });
	
	app.get('/login', (req, res) => {
    const { username, password } = req.body;
	
	console.log('Username: ', username);
	console.log('Password: ', password);

    const sql = "SELECT * FROM Users WHERE Username = ? AND Password = ?";
    const values = [username, password];

    connector.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error querying the database:', err.stack);
            return res.status(500).send('An error occurred during login.');
        }

        if (results.length > 0) {
           
            res.send('Login successful');
        } else {
            
            res.status(401).send('Invalid username or password');
        }
    });
});
	app.get('/user/dashboard', (req, res) => {
    const username = req.query.username;

    if (!username) {
        return res.status(400).send('Username is required');
    }

    const sql = "SELECT Username, Email, Fullname FROM Users WHERE Username = ?";
    connector.query(sql, [username], (err, results) => {
        if (err) {
            console.error('Unable to query database:', err.stack);
            return res.status(500).send('An error occurred');
        }

        if (results.length > 0) {
            const userData = {
                Username: results[0].Username,
                Email: results[0].Email,
                Fullname: results[0].Fullname
            };
            res.json(userData);
        } else {
            res.status(404).send('User not found');
        }
    });
});

	app.listen(port,()=>{
		console.log("App is listening on port: " + port);
	});