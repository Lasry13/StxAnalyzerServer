const request = require('request');

getRequestOptions = (method, uri, body) => {
    return {
        method: method,
        uri: uri,
        body: body
    }
}

doRequest = (options) => {
    return new Promise((resolve, reject) => {
        request(options, (error, response) =>{
            error ? reject(error) : resolve(response)
        });
    })
}

let options = getRequestOptions("GET", 'https://pkgstore.datahub.io/core/nasdaq-listings/nasdaq-listed_json/data/a5bc7580d6176d60ac0b2142ca8d7df6/nasdaq-listed_json.json')
let a = 0
Promise.all([doRequest(options), doRequest(options), doRequest(options)]).then((values) => {
    //values.map(value => fun(value))
    for(let i = 0; i < values.length ; i++)
        a = values[i]
        console.log(a)
});

fun = value => console.log(value.statusCode)
