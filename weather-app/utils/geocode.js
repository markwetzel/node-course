const request = require('request');

const geocode = (address, callback) => {
    const encodedQuery = encodeURIComponent(address);
    const apiToken = 'pk.eyJ1IjoiYW50aWVmZm9ydCIsImEiOiJja3F5OXJicXQwdHNuMm5udm1rdzI0bTJ5In0.9tg3W_AASkRmJlpRh3YeIg';
    const mapBoxApi = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedQuery}.json?access_token=${apiToken}&limit=1`;

    request({ url: mapBoxApi, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services.', undefined);
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            const result = response.body.features[0];
            const { place_name: location } = result;
            const [longitude, latitude] = result.center;
            callback(undefined, {
                latitude,
                longitude,
                location
            });
        }
    });
};

module.exports = geocode;