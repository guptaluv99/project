const mongoose = require('mongoose');
if(process.env.NODE_ENV === 'production') var dbURI = 'mongodb://' + process.env.DBUserName + ':' + process.env.DBPassword + '@' + process.env.DBHost + ':' + process.env.DBPort + '/' + process.env.DBName + '?authSource=admin';
else var dbURI = 'mongodb://' + process.env.DBHost + ':' + process.env.DBPort + '/' + process.env.DBName;

mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false});
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection created in \"' + process.env.NODE_ENV + '\" mode');
});
mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
