const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const db = require('./server/config/database');
const mongoose = require('mongoose');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT || 4600;

// Connecting to mongodb Database
mongoose.connect(db.mongodbClientURl, { useNewUrlParser: true }).then(result => {
    console.log("mongodb connected");
    app.listen(port, (req, res) => {
        console.log(`RUNNING on port ${port}`)
    })
}).catch(err => {
    console.log(err)
})

app.use(express.static(path.join(__dirname, 'dist/EngineersManagementFE')));

// Requiring Routes
const indexRouter = require('./server/routes/index');
const usersRouter = require('./server/routes/users');
const imageupload = require('./server/routes/imageupload.route');
const showimage = require('./server/routes/showimage.route')
const clientDetails = require('./server/routes/clientDetails');
const billableEmployeesDetails = require('./server/routes/billableEmployees');
const billableEmployeesPackageDetails = require('./server/routes/billableEmployeesPackageDetails')

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/EngineersManagementFE/index.html'))
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static('public'))



app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Using routes
app.use(cors());
app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/imageupload.route', imageupload);
app.use('/showimage.route', showimage);
app.use('/clientDetails', clientDetails);
app.use('/billableEmployees', billableEmployeesDetails);
app.use('/billableEmployeesPackageDetails', billableEmployeesPackageDetails);


app.use(function(req, res, next) {
    next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});