[![Build Status](https://travis-ci.com/typedefs/cli.svg?branch=master)](https://travis-ci.com/typedefs/cli)

# Typedefs Commandline Tool

Use the Typedefs JS library from the commandline.

**Note**: this is for the convenience of NPM users, there is nothing JS or NPM specific about the Typedefs compiler and it can be installed without NPM. See https://github.com/typedefs/typedefs for more information.

## Installation

To install this tool globally, run

```sh
npm install -g typedefs
```

## Usage

```
Usage: typedefs-cli [options] [command]

Options:
  -V, --version  output the version number
  -h, --help     output usage information

Commands:
  codegen        generate code from S-expression
  help [cmd]     display help for [cmd]
```

Using the code generator:


```sh
echo "(name Bit (+ 1 1))" | typedefs codegen --target json
```

Options:

```
  -i, --input [filename]   File to read input from
  -o, --output [filename]  File to write output to
  --force                  Force file overwrite
  -t, --target [platform]  Target platform: "haskell", "reasonml" or "json"
```