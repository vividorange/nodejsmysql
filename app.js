const express = require("express")
const app = express();
const mysql = require("mysql");
const DB_SETTING = {
	host: "localhost",
	user: "sampleman",
	database: "sampledb",
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

app.listen(3000,function()
{
	console.log(this.address().port);
});
