# Introduction

Simple serial communication with Arduino using NodeJS.

## Installation

    $ git clone git://github.com/xoan/node-arduino
    $ cd node-arduino/serial
    $ npm install express serialport socket.io

## Wiring

Attach a `LM35DZ` to `A0` and a `LED` to `D8` (or change pins in `temp/temp.ino` to fit your needs).

## Running

    $ node serial.js [port]

Point you browser to [http://localhost:8080](http://localhost:8080)

