const sunCalc = require('suncalc');
const http = require('http');

const address = '127.0.0.1';
const port = 10001;

const server = http.createServer();

server.on('request', (req, res) => {
    let body = [];

    console.log('Request received');

    req
    .on('error', (err) => {
        console.warn(err);
    })
    .on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {

        body = Buffer.concat(body).toString();
        body = JSON.parse(body);

        const { latitude, longitude } = body;
        const sunriseSunset = getSunriseSunset(latitude, longitude);

        // Response
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end(JSON.stringify(sunriseSunset));
    });
});

function getSunriseSunset(lat, lng) {
    const date = new Date();

    const { sunrise, sunset } = sunCalc.getTimes(date, lat, lng);

    const sunriseTime = `${sunrise.getHours()}:${sunrise.getMinutes()}`;
    const sunsetTime = `${sunset.getHours()}:${sunset.getMinutes()}`;

    return {sunrise: sunriseTime, sunset: sunsetTime}
}

server.listen(port, address, () => {
    console.log(`Server listening at ${address}:${port}`)
});


