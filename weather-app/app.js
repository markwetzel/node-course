const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const locationInput = process.argv[2];
const locationMatch = /--location=(?<location>[A-Z].*)/i;
const locationMatches = locationInput.match(locationMatch);

const location = locationMatches?.groups?.location;

if (!locationMatches) {
    return console.log("Please provide a location");
}

printForecast(location);

function printForecast(location) {
    geocode(location, (error, { latitude, longitude, location }) => {
        if (error) {
            return console.log('Error', error);
        }

        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return console.log('Error', error);
            }
            const {
                description, temperature, humidity, feels_like
            } = data;

            console.log(`The weather`);
            console.log(`It's currently ${description} in ${location}`);
            console.log(`The temperature is ${temperature} degrees, but it feels like ${feels_like} degrees`);
            console.log(`The humidity is ${humidity}%`);
        });
    });
}