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
