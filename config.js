//const program = require('commander');
const fs = require('fs')
const prompt=require('prompt');


var schema = {
    properties: {
      Email: {
        required: true
      },
      Password: {
        hidden: true,
        required: true
      },
      Username :{
        required: true
      }
    }
  };

prompt.start();
prompt.get(schema, function (err, result) {
  var EMAIL = "EMAIL = " + result.Email;
  var PASSWORD = "PASSWORD = " + result.Password;
  var USERNAME = "USERNAME = " + result.Username;
  var stream = fs.createWriteStream(".env");
  stream.once('open', function(fd) {
  stream.write(EMAIL);
  stream.write("\n");
  stream.write(PASSWORD);
  stream.write("\n");
  stream.write(USERNAME);
  stream.write("\n");
  stream.end();
});
});
