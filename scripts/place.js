// Static values for now
const temperature = 5; // °C
const windSpeed = 10;      // km/h

function calculateWindChill(tempC, speedKmh) {
    // Wind chill formula (Environment Canada, Celsius + km/h)
    return (
        13.12 +
        0.6215 * tempC -
        11.37 * Math.pow(speedKmh, 0.16) +
        0.3965 * tempC * Math.pow(speedKmh, 0.16)
    ).toFixed(1);
}

function displayWindChill() {
    const windchillElement = document.getElementById("windchill");

    if (!windchillElement) {
        console.error("Windchill element not found in DOM!");
        return;
    }

    // Only calculate if conditions are met
    if (temperature <= 10 && windSpeed > 4.8) {
        windchillElement.textContent = calculateWindChill(temperature, windSpeed) + " °C";
    } else {
        windchillElement.textContent = "N/A";
    }
}

displayWindChill();

// this is for the weather icon - chatgpt helped me out here
const weatherEmoji = "⛅";
const weatherEmojiElement = document.getElementById("weatherEmoji");

function updateWeatherIcon() {

    if (window.matchMedia("(min-width: 1000px)").matches) {
        //for large screen use the emoji from the cont
        weatherEmojiElement.textContent = weatherEmoji;

    } else {
        //for smaller screens and using a svg file
        weatherEmojiElement.innerHTML = '<img src="images/weather.svg" alt="Weather Icon" width="35" height="35">';
    }
}

updateWeatherIcon();

window.addEventListener("resize", updateWeatherIcon);