const express = require("express")
const app = express();
const mysql = require("mysql");
const DB_SETTING = {
	host: "localhost",
	user: "nodeman",
	database: "nodetest",
	password: "ubuntu"
};
app.set("view engine", "ejs");

app.get("/",function(req,res)
{
	res.render("index",{});
});

app.get("/user", function(req,res)
{
	const data = {
		error: false,
		user: []
	};
	
	const db = mysql.createConnection(DB_SETTING);

	db.connect();
	db.query("select * from user;", function(err,rows,fields)
	{
		if(err)
		{
			console.log(`err: ${err}`);
			data.error = err;
			return;
		}
		data.user = rows;
		console.dir(data);
		res.render("user",data);
	});
	db.end();
});

app.get("/add", function(req,res)
{
	const data = {
		error: false,
		user: []
	};
	
	const db = mysql.createConnection(DB_SETTING);

	const id = Math.floor(Math.random()*100);
	const name = id+"sann";

	db.connect();
	db.query(`insert into user values(${id}, "${name}");`, function(err,rows,fields)
	{
		if(err)
		{
			console.log(`err: ${err}`);
			data.error = err;
			return;
		}
		res.redirect("/user");
	});
	db.end();
});

app.listen(3000,function()
{
	console.log(this.address().port);
});
