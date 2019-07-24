#!/usr/bin/env node

const config = require('./config');
const program = require('commander');
const functions = require('./functions');

program
    .version('1.0.1', '-v, --version');

program.on('--help', () => {
    console.log('\n  All options:');
    console.log('    -p, --problem              Problem ID from Kattis');
    console.log('    -f, --file                 Source Code File To be submitted');
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
          console.log("Invalid !!!!!!");
  });
program
  .command('config')
  .action (function(){
      config.userConfiguration();
  });
program.parse(process.argv);
