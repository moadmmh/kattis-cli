#!/usr/bin/env node

const config = require('./config');
const program = require('commander');
const functions = require('./functions');
const users = require('./user');

program
    .version('1.0.4', '-v, --version');

program.on('--help', () => {
    console.log('\n  All options:');
    console.log('    -p, --problem              Problem ID from Kattis');
    console.log('    -f, --file                 Source Code File To be submitted');
    console.log('    -u, --user                 Username to be chosen');
});

program
  .command('submit')
  .option('-p, --problem', 'Problem ID')
  .option('-f, --file', 'Source Code File')
  .action(function (pblm,file) {
      if (typeof pblm === "string" && typeof file === "string"){
          var file_dir = process.cwd()+ "/" +file;
          functions.submission(pblm,file_dir);
        }
      else
          console.log("Invalid !!");
  });

program
  .command('config')
  .action (function(){
      config.userConfiguration();
  });

program
  .command('user')
  .option('-u, --user', 'Username')
  .action (function(usr){
    if (typeof usr === "string")
      users.userinfo(usr);
    else
      console.log("Invalid !!")
  });

program.parse(process.argv);
