const address = '127.0.0.1';
const port = 10001;

function reqCallback(response) {
    let str = '';

    response.on('data', (chunk) => {
        str += chunk;
    }).on('end', () => {
        console.log(str);
    });
}

function sendRequest(position) {
    const { latitude, longitude } = position.coords;
    const latlng = {latitude, longitude};

    const options = {
        method: 'POST',
        body: JSON.stringify(latlng)
    }

    fetch(`http://${address}:${port}`, options).then((response) => {
        return response.json();
    }).then((data) => {
        displayTimes(data);
    });
}

function getLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(sendRequest);
    }
    else {
        console.error('Geolocation unavailable');
    }
}

function displayTimes(times) {
    const { sunrise, sunset } = times;

    document.getElementById('sunrise').innerText = sunrise;
    document.getElementById('sunset').innerText = sunset;
}