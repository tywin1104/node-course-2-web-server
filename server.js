const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req,res,next)=>{
	var log = `${new Date().toString()}, ${req.method}, ${req.url}`;
	fs.appendFile('server.log',log+ '\n',(err)=>{
		if(err) console.log(err);
	});
	next();
});
// app.use((req,res,next)=>{
// 	res.render('maintain.hbs');
// });
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase();
});


app.get('/', (req,res)=>{
  res.render('home.hbs',{
  	pageTitie:'About page',
  	name: 'Tianyi zhang'
  });
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
  	pageTitie:'About page'
  });
});

app.get('/projects',(req,res)=>{
	res.render('projects.hbs',{
		pageTitle: 'Projects'
	});
});

app.listen(port,()=>{
	console.log(`Server is up on port ${port}`);
});