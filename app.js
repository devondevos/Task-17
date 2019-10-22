const express = require('express');//this imports the express module
const app = express();
const router = express.Router();
const fileHandler = require('fs');
var pro = require('./projects.json') //this imports the json file



//the cors is a mechanism to let a user-agent resources from a domain outside of the domain from which the first resource was saved.
var cors = require('cors')

app.use(cors())


//this is the app.get function that gets the info from the json file to be displayed on postman
app.get('/api', function(req, res) {
fileHandler.readFile('projects.json', (err, data) => {
    if (err) res.send('File not found. First post to create file.');
    else
        res.send(pro);//this send the data stored in the json file to the html body
})
})
//this is the app.post function that lets the user add more to the json file using postman
app.post('/api', (req, res) => {
	let data ={"id": `${req.query.id}`, "title": `${req.query.title}`, "description": `${req.query.description}`, "URL": `${req.query.URL}`};
	pro.push(data); //this pushes the data the user enters on postman to the json file
	fileHandler.writeFile('projects.json',JSON.stringify(pro), (err) => {
	    if (err) throw err;
	    res.send('File created!');
	});
})

//this is the app.delete function that lets the user delete a specific id on postman
app.delete('/api', (req,res) => {
	pro = pro.filter((objects) => {   //this is the filter function that filters out which id will be excluded from the file, which in turn deletes it
		return objects.id !== req.query.id
	})
	fileHandler.writeFile('projects.json', JSON.stringify(pro), (err) => {
		if (err) {
			res.send('id not deleted')
		}
		res.send('id deleted')
	})
})

//this is the app.put function that lets the user update the title or description on postman
app.put('/api', (req,res) => { //this also puts params in place so that the info can be updated
	let update = {id:req.query.id, title:req.query.title, description:req.query.description}
	for(var webpro of pro){  //this if statements makes if the user decides to leave the description or title empty on postman, then it will not show error and it will stay the same
		if(webpro.id == update.id){
			if(update.title)
			{
				webpro.title = update.title
			}

			if(update.description)
			{
				webpro.description = update.description
			}
		}
	}
	fileHandler.writeFile('projects.json', JSON.stringify(pro), (err) => {
		if (err) {
			res.send('file not updated')
		}
		res.send('file updated')
	})

})


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
console.log(`Server is listening on port ${PORT}`);
});

