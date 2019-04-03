#!/usr/bin/env node
const {program, exit_error, exit_success, get_input, put_output } = require("./util.js")
const Typedefs = require("typedefs-js")

let help = () => console.log(`
Examples:

    # Generate JSON Schema from typedefs S-Expression
    echo "(name Bit (+ 1 1))" | typedefs codegen --target json
`)

program
    .on('--help', help)
    .option('-t, --target [platform]', 'Target platform: "haskell", "reasonml" or "json"')
    .parse(process.argv);

// TODO should get this from the `ParseJS.idr` library
let targets = [
    'haskell',
    'reasonml',
    'json'
]

async function main () {
    let inputSExpression = (await get_input()).toString().trim()
    
    let ty = Typedefs.parseType(inputSExpression)
    if(!ty) {
        exit_error("Failed to process input typedef")
    }
    
    let target = program.target
    if(targets.indexOf(target) < 0) {
        exit_error(`invalid target, ${target}. Must be one of: ${targets.join(' ')}`)
    }
    
    let result = Typedefs.generateCode(target, ty)
    put_output(result)
    exit_success()
}

main()