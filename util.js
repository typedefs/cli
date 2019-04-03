let fs = require('fs')

// setup basic options `ioFV`
const program = require('commander')
    .option('-i, --input [filename]', 'File to read input from')
    .option('-o, --output [filename]', 'File to write output to')
    .option('--force', 'Force file overwrite')

function exit_error(msg) {
    console.error(msg);
    process.exit(1);
}

function exit_success() {
    process.exit(0);
}

// only load non-empty input
async function get_input () {
    let rawInput = await get_raw_input()
    if(rawInput.toString('utf8').trim() === "") {
        exit_error('You must pass non empty input')
    }
    return rawInput
}

// reads the input from STDIN or file
async function get_raw_input () {
    // read from input file
    let fn = program.input
    if (fn) {
        if (!fs.existsSync(fn)) {
            exit_error(`input file "${fn}" does not exist`)
        }
        // TODO check directory?
        return fs.readFileSync(fn)
    } else {
        // read from standard input
        return require("get-stdin").buffer()
    }
}

async function put_output (out) {
    let fn = program.output
    if (fn) {
        if (fs.existsSync(fn) && !program.force) {
            exit_error(`output file "${fn}" already exists`)
        }
        return fs.writeFileSync(fn, out)
    } else {
        // write to standard output
        console.log(out)
    }
}

module.exports = { program, exit_error, exit_success, get_input, put_output }