var http = require('http');
var mongoose =  require('mongoose')
var app = require('./app')
var config = require('./config/config')


var server = http.createServer(app);

mongoose.set('strictQuery', false)

mongoose.connect(config.dbUrl, {})
    .then(
        () => {

            console.log('DB Connection Successful')
            server.listen(3000);
            server.on('error', function(error){
                console.log(error)
            });
            server.on('listening', function(){
                console.log("Listening on port 3000")
            });
        }
    )
    .catch((err) => {
      console.log(err);
    });


