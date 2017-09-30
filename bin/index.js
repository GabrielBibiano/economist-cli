#! /usr/bin/env node
const request = require('request-promise')
const Table = require('cli-table')
const cheerio = require('cheerio')
const colors = require('chalk')
const { isPositive, thisTime } = require('../src/functions.js')

const options = {
    uri: 'http://www.infomoney.com.br/',
    transform(body){
        return cheerio.load(body);
    }
}

let table = new Table({
    chars: { 
        'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
        , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
        , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
        , 'right': '║' , 'right-mid': '╢' , 'middle': '│' 
    }
})

table.push( ["   Name:     ", "    Variation:   ", "    Current Value:    "]);

request(options).then(($) => {
    $('.ticker .ticker-box').each(function(){
        let title = $(this).find('a').text().trim()
        let percent = $(this).find('.ticker-box-positive span').text().trim()
        let value = $(this).find('.ticker-box-value .value').text().trim()
        
        percent = percent.substr(0, percent.length - 2);

        let resultPercent
        if(percent != ""){
            (isPositive(percent)) ? 
                resultPercent = colors.green(percent)
            :
                resultPercent = colors.red(percent)
        }else{
            resultPercent = " ----"
        }

        table.push([
            `   ${title}    `, `    ${resultPercent}  `, `    ${colors.cyanBright(value)}    `
        ]);
    })

    console.log(table.toString())
    console.log('\n', thisTime(), '\n')
}).catch((err) => {
    console.log(err)
});