const cors = require('cors');
const express = require('express');
const { dirname } = require('path');
const path = require('path');
const app = express();

//const indexRoutes = require('./routes/index');
const tasksRoutes = require('./routes/tasks');

//Settings
app.set('views',path.join(__dirname, 'views'))
app.set('port', process.env.PORT || 3000);
app.engine('html',require('ejs').renderFile)
app.set('view engine', 'ejs');

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Routes 
//app.use(indexRoutes);
app.use(('/api'),tasksRoutes);

//Static Files
app.use(express.static(path.join(__dirname, 'dist/client')));

//Star Server
app.listen(app.get('port'), () => {
console.log('server on port', app.get('port'));
});