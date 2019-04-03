#!/usr/bin/env node
let program = require('commander')

// load package.json to get version
let path = require('path')
let packageJson = require(path.join(__dirname, 'package.json'))

// provide title for the `ps` command
process.title = 'typedefs'


program
    .version(packageJson.version)
    .command('codegen', 'generate code from S-expression')
    .parse(process.argv);