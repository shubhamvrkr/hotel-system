/**
 * File    : /server/app/routes.js
 * Purpose : Define the URL routes
 */
module.exports = function (app) {

	//DataBase Operations;
	var DatabaseConnector = require('./modules/database/databaseoperations.js')
	var database =  new DatabaseConnector(CONFIG.database.host,CONFIG.database.port);
	
	//Login API
	var Login = require('./modules/business/login/login.js');
	var loginOperation = new Login(database)
	app.post('/login', loginOperation.login.bind(loginOperation));
	
	//API for adding hotel staff by admin or super admin
	var Staff = require('./modules/business/staff/staff.js');
	var staffOperation = new Staff(database)
	app.post('/staff', passport.authenticate('jwt', { session: false }),authorization,staffOperation.addStaff.bind(staffOperation));
	app.get('/staff', passport.authenticate('jwt', { session: false }),authorization,staffOperation.getStaff.bind(staffOperation));
	app.put('/staff', passport.authenticate('jwt', { session: false }),authorization,staffOperation.updateStaff.bind(staffOperation));
	app.delete('/staff/:id', passport.authenticate('jwt', { session: false }),authorization,staffOperation.deleteStaff.bind(staffOperation));
	
	//API for adding hotel rooms by admin and super admin
	var Room = require('./modules/business/room/room.js');
	var roomOperation = new Room(database)
	app.post('/room', passport.authenticate('jwt', { session: false }),authorization,roomOperation.addRoom.bind(roomOperation));
	app.get('/room', passport.authenticate('jwt', { session: false }),authorization,roomOperation.getRoom.bind(roomOperation));
	app.put('/room', passport.authenticate('jwt', { session: false }),authorization,roomOperation.updateRoom.bind(roomOperation));
	app.delete('/room/:id', passport.authenticate('jwt', { session: false }),authorization,roomOperation.deleteRoom.bind(roomOperation));
	
	//API for uploading files by admin and super admin
	var Upload = require('./modules/business/filestorage/upload.js')
	var fileOperations = new Upload()
	app.post('/upload', passport.authenticate('jwt', { session: false }),authorization,fileOperations.upload.bind(fileOperations));
	
	//API for adding emenu items by admin and super admin
	var Emenu = require('./modules/business/emenu/emenu.js');
	var eMenuOperation = new Emenu(database)
	app.post('/emenu', passport.authenticate('jwt', { session: false }),authorization,eMenuOperation.addeMenu.bind(eMenuOperation));
	app.get('/emenu', passport.authenticate('jwt', { session: false }),authorization,eMenuOperation.geteMenu.bind(eMenuOperation));
	app.put('/emenu', passport.authenticate('jwt', { session: false }),authorization,eMenuOperation.updateeMenu.bind(eMenuOperation));
	app.delete('/emenu/:id', passport.authenticate('jwt', { session: false }),authorization,eMenuOperation.deleteeMenu.bind(eMenuOperation));
};
