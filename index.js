var crypto = require('crypto');
// npm install request
var request = require('request');

// Set these in your ENVironment, or enter them here with the actual string
var apiKey = '3myLCfjQvY6uIkRa';
var apiSecret = 'KMEt95pedLBoq6TmHhkRxQJ0yvF0dLm4';


//get unix time in seconds
var timestamp = Math.floor(Date.now() / 1000);

// set the parameter for the request message
var req = {
    method: 'GET',
    path: '/v2/accounts/a086d853-f21a-566b-b918-7d064240039a/addresses',
    body: ''
};

var message = timestamp + req.method + req.path + req.body;
console.log(message);

//create a hexedecimal encoded SHA256 signature of the message
var signature = crypto.createHmac("sha256", apiSecret).update(message).digest("hex");

//create the request options object
var options = {
    baseUrl: 'https://api.coinbase.com/',
    url: req.path,
    method: req.method,
    headers: {
        'CB-ACCESS-SIGN': signature,
        'CB-ACCESS-TIMESTAMP': timestamp,
        'CB-ACCESS-KEY': apiKey,
        'CB-VERSION': '2015-07-22'
    }
};

request(options,function(err, response){
    if (err) console.log(err);
    console.log(JSON.stringify(response.body));
});
