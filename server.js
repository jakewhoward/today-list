// To-do list api server

// Inport config

var config = require('config');

// Import dependencies

var _       = require('lodash');
var fs      = require('fs');
var express = require('express');
var r       = require('rethinkdbdash')();

// Initialize express app

var app = express();

// API Router

var api_router = express.Router();

api_router.use('/', require('body-parser').json());

// API Home
api_router.route('/')
	.get(function(req, res) {
		res.status(200).json({
			status : 'ok'
		});
	});

// Basic CRUD routes

api_router.route('/:table')
	// Get records from database
	.get(function(req, res) {
		
		// Get records from database table
		r.db('ToDay_List').table(req.params.table)
			.run()
			.then(function(result) {
				res.status(200).json(result);
			})
			.error(function(err) {
				res.status(500).json({
					erros : err.message
				});
			})
	})

	// Insert records into database

	.post(function(req, res){
		r.db('ToDay_List').table(req.params.table)
			.insert(req.body)
			.run()
			.then(function(result) {
				res.status(200).json(result);
			})
			.error(function(err) {
				res.status(500).json({
					erros : err.message
				});
			});
	});

// Basic record routes

api_router.route('/:table/:id')
	// Get record by id
	.get(function(req, res){

		// Get records from database table
		r.db('ToDay_List').table(req.params.table).get(req.params.id)
			.run()
			.then(function(result) {
				res.status(200).json(result);
			})
			.error(function(err) {
				res.status(500).json({
					errors : err.message
				});
			});
	})

	// Update record by id
	.patch(function(req, res){
		r.db('ToDay_List').table(req.params.table).get(req.params.id)
			.update(req.body)
			.run()
			.then(function(result) {
				res.status(200).json(result);
			})
			.error(function(err) {
				res.status(500).json({
					errors : err.message
				});
			});
	})

	// Delete a record
	.delete(function(req, res){
		r.db('ToDay_List').table(req.params.table).get(req.params.id)
			.delete()
			.run()
			.then(function(result) {
				res.status(200).json(result);
			})
			.error(function(err) {
				res.status(500).json({
					errors : err.message
				});
			});

	});

// Assign API routes to the api subfolder
app.use('/api', api_router);

// Start listening to traffic

app.listen(3000, function(){
	console.log('Listening on port 3000...');
});