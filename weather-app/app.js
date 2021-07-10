const request = require('request');

const mapBoxQuery = "Orlando";
const apiToken = 'pk.eyJ1IjoiYW50aWVmZm9ydCIsImEiOiJja3F5OXJicXQwdHNuMm5udm1rdzI0bTJ5In0.9tg3W_AASkRmJlpRh3YeIg';
const mapBoxApi = `https://api.mapbox.com/geocoding/v5/mapbox.places/${mapBoxQuery}.json?access_token=${apiToken}&limit=1`

try {

    request({ url: mapBoxApi, json: true }, (error, response) => {
        if (error) {
            console.error(error);
            return;
        } else if (response.body.features.length === 0) {
            console.log('Error!');
            return;
        }



        const [longitude, latitude] = response.body.features[0].center;
        const accessKey = '47e4c40ec67cc4d210193ef117c5ff07';

        const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${latitude},${longitude}&units=f`;


        request({ url, json: true }, (error, response) => {
            if (error) {
                console.error(error);
                return;
            } else if (response.body.error) {
                console.error('Unable to find location');
                return;
            }

            const { temperature, precip, weather_descriptions } = response.body.current;
            console.log(response.body.current);
            console.log(response.body);
            console.log(`${weather_descriptions[0]} in ${response.body.location.name}`);
            console.log(`Is is currently ${temperature} degrees out. There is a ${precip}% chance of rain.`);
        });
    });
} catch (error) {
    console.error(error);
}