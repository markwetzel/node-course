const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const accessKey = '47e4c40ec67cc4d210193ef117c5ff07';

    const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${latitude},${longitude}&units=f`;

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to forecast services.', undefined);
        } else if (response.body.error) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            const { current } = response.body;

            const { temperature, humidity, feelslike: feels_like } = current;
            callback(undefined, {
                description: current.weather_descriptions[0],
                temperature,
                humidity,
                feels_like
            });
        }
    });
};

module.exports = forecast;