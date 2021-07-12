const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

geocode('Tampa', (error, { latitude, longitude, location }) => {
    if (error) {
        console.log('Error', error);
        return;
    }

    forecast(latitude, longitude, (error, data) => {
        if (error) {
            console.log('Error', error);
            return;
        }
        // console.log('Data', data);

        const {
            description,
            temperature,
            humidity,
            feels_like
        } = data;

        console.log(`The weather`);
        console.log(`It's currently ${description} in ${}`);
        console.log(`The temperature is ${temperature} degrees, but it feels like ${feels_like} degrees`);
        console.log(`The humidity is ${humidity}%`);
    });
});

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

