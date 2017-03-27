var express = require('express')
var path = require('path')
var dateFormat = require('dateformat')
var app = express()

app.use(express.static(__dirname + '/public'))

/** 
 * INPUT: root path
 * OUTPUT: static file: 'index.html'
 */
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

/** 
 * INPUT: any path matching the given pattern
 * OUTPUT: static file: 'index.html'
 */
app.get('/*/*', function (req, res) {
    res.send('You can only use URLs with the following format: url/date, eg url/1234567890')
})


/**
 * Gets the date in both 'unix timestamp' and 'natural' format
 */
function getDateObject (rawDate) {
    var nativeJSDate, unixDate, naturalDate
    
    rawDate = unescape(rawDate)
    
    // Use isNaN to check if number: isNaN(123) and isNaN('123') are 'false'
    if (isNaN(rawDate)) {
        nativeJSDate = new Date(rawDate)
    } else {
        nativeJSDate = new Date(parseInt(rawDate))
    }
    
    if (!nativeJSDate || nativeJSDate == 'Invalid Date') {
        return {
            unix: null,
            natural: null
        }
    }
    
    naturalDate = dateFormat(nativeJSDate, "mmmm dd, yyyy") || null
    unixDate = nativeJSDate.getTime() || null
    
    return {
        unix: unixDate,
        natural: naturalDate
    }
}


/** 
 * INPUT: date 
 *    - valid date formats: a) unix (eg: 12345678)
 *                          b) natural language (eg: "December 15, 2015") 
 * OUTPUT: object (eg: { "unix": 1450137600, "natural": "December 15, 2015" })
 *    - if date is valid: { "unix": 1450137600, "natural": "December 15, 2015" })
 *    - if date is invalid: { "unix": null, "natural": null })
 */
app.get('/:date', function (req, res) {
    var date = req.params.date,
        answer = getDateObject(date)
    
    res.send(answer)
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})
