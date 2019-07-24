#!/usr/bin/env node

const config = require('./config');
const program = require('commander');
const functions = require('./functions');

program
    .version('1.0.1', '-v, --version');

program.on('--help', () => {
    console.log('\n  All options:');
    console.log('    -p, --problem              Problem ID from Kattis');
});

program
  .command('submit')
  .option('-p, --problem', 'Problem ID')
  .action(function (pblm) {
      if (typeof pblm === "string")
          functions.submission(pblm);
      else
          console.log("Invalid !!!!!!");
  });

program.parse(process.argv);
