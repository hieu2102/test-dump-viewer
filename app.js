const express = require('express'),
	bodyParser = require('body-parser'),
	cors = require("cors"),
	app = express(),
	mongoose = require('mongoose'),
	uri = 'mongodb://localhost:27017/my_database',
	schema = mongoose.Schema;

mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({
		extended: false
	}), bodyParser.json(),
	cors());
app.listen(8080);

const examSchema = new schema({
	code: String,
	name: String
});
const exam = mongoose.model('exams', examSchema);

const examDumpSchema = new schema({
	code: String,
	content: {}
});
const examDump = mongoose.model('examDumps', examDumpSchema);

app.get('/examList', (req, res) => {
	exams = exam.find({}).exec()
		.then((examList, err) => {
			if (examList) {
				res.status(200).json(examList);
			} else {
				console.log(err)
				res.status(400).json({
					'message': 'error'
				});
			}
		})
});

app.get('/dump/:code', (req, res) => {
	examCode = req.params.code;
	examDump.find({
			"code": examCode
		}).exec()
		.then(result => {
			if (result) {
				res.status(200).json(result);
			} else {
				res.status(400).json({
					'message': 'error'
				});
			}
		});
});

app.post('/create', (req, res) => {
	exam.create({
		code: req.body.code,
		name: req.body.name
	}).then(result => {
		examDump.create({
			code: req.body.code,
			content: req.body.content
		}).then(result => {
			res.status(201).json({
				'message': 'created'
			});
		});
	});
});

app.put('/update', (req, res) => {
	var filter =  {code:req.body.code},
	update = {content: req.body.content};
	examDump.findOneAndUpdate(filter, update).then(result=>{
		res.status(200).json({message: result})
	});
});